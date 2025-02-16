use sqlx::Pool;
use uuid::Uuid;

use crate::models::{
    page::Page,
    recipe_detail::{RecipeDetail, RecipeDetailDto},
};

pub struct RecipeDetailRepo {
    db: Pool<sqlx::Sqlite>,
}

impl RecipeDetailRepo {
    pub fn new(db: Pool<sqlx::Sqlite>) -> Self {
        Self { db }
    }

    pub async fn create(&self, input: RecipeDetailDto) -> Result<RecipeDetail, sqlx::Error> {
        let id = Uuid::new_v4().to_string();

        sqlx::query_as!(
            RecipeDetail,
            "insert into recipe_details (id, input_amount, item_id, recipe_id) values ($1, $2, $3, $4) returning id, input_amount, item_id, recipe_id",
            id, input.input_amount, input.item_id, input.recipe_id
        ).fetch_one(&self.db).await
    }

    pub async fn read(&self, limit: i32, page: i32) -> Result<Page<RecipeDetail>, sqlx::Error> {
        let offset = limit * page;
        let recipe_details = sqlx::query_as!(
            RecipeDetail,
            "select * from recipe_details limit $1 offset $2",
            limit,
            offset,
        )
        .fetch_all(&self.db)
        .await?;

        let total = sqlx::query_scalar!("SELECT COUNT(*) as count from recipe_details",)
            .fetch_one(&self.db)
            .await?;

        let page = Page::<RecipeDetail> {
            items: recipe_details,
            total,
        };

        Ok(page)
    }

    pub async fn update(&self, id: String, input: RecipeDetailDto) -> Result<(), sqlx::Error> {
        _ = sqlx::query!(
            "
                update recipe_details
                set input_amount = $1, item_id = $2, recipe_id = $3
                where id = $4
            ",
            input.input_amount,
            input.item_id,
            input.recipe_id,
            id,
        )
        .execute(&self.db)
        .await?;

        Ok(())
    }

    pub async fn get_by_id(&self, id: String) -> Result<RecipeDetail, sqlx::Error> {
        sqlx::query_as!(
            RecipeDetail,
            "select * from recipe_details where id = $1",
            id,
        )
        .fetch_one(&self.db)
        .await
    }
}
