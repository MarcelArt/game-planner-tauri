use sqlx::Pool;

use crate::models::{page::Page, plan::PlanDetail};

pub struct PlanRepo {
    db: Pool<sqlx::Sqlite>,
}

impl PlanRepo {
    pub fn new(db: Pool<sqlx::Sqlite>) -> Self {
        Self { db }
    }

    pub async fn get_by_game_id(&self, game_id: String, limit: i32, page: i32) -> Result<Page<PlanDetail>, sqlx::Error> {
        let offset = limit * page;
        let plans = sqlx::query_as::<_, PlanDetail>("
            SELECT * from v_plan_details vpd 
            where vpd.game_id = $1
            limit $2 offset $3
        ")
            .bind(game_id)
            .bind(limit)
            .bind(offset)
            .fetch_all(&self.db)
            .await?;

        let page = Page::<PlanDetail> {
            items: plans,
            total: 10,
        };

        Ok(page)
    }
}