use std::collections::HashMap;

use sqlx::Pool;
use uuid::Uuid;

use crate::models::{
    page::Page,
    plan::{Plan, PlanDetailView, PlanDto, PlanRecipeResponse, PlanResponse},
};

pub struct PlanRepo {
    db: Pool<sqlx::Sqlite>,
}

impl PlanRepo {
    pub fn new(db: Pool<sqlx::Sqlite>) -> Self {
        Self { db }
    }

    pub async fn get_by_game_id(
        &self,
        game_id: String,
        limit: i32,
        page: i32,
    ) -> Result<Page<PlanResponse>, sqlx::Error> {
        let offset = limit * page;
        let plans = sqlx::query_as::<_, PlanDetailView>(
            "
            SELECT * from v_plan_details vpd 
            where vpd.game_id = $1
            order by vpd.created_at asc
            limit $2 offset $3
        ",
        )
        .bind(&game_id)
        .bind(limit)
        .bind(offset)
        .fetch_all(&self.db)
        .await?;

        let total = sqlx::query_scalar!(
            "
                with cte_plan_count as (
                    SELECT 
                        vpd.recipe_id
                    from v_plan_details vpd 
                    where vpd.game_id = $1
                    GROUP by vpd.recipe_id
                )
                select count(*) from cte_plan_count
            ",
            game_id
        )
        .fetch_one(&self.db)
        .await?;

        let mut grouped_plans: HashMap<String, PlanResponse> = HashMap::new();

        for row in plans {
            match row.recipe_id {
                Some(recipe_id) if !recipe_id.is_empty() => {
                    let entry =
                        grouped_plans
                            .entry(recipe_id.clone())
                            .or_insert_with(|| PlanResponse {
                                id: row.id,
                                goal: row.goal,
                                output_item_id: row.output_item_id,
                                output_item_name: row.output_item_name,
                                output_item_picture: row.output_item_picture,
                                recipes: Vec::new(),
                            });

                    entry.recipes.push(PlanRecipeResponse {
                        input_amount_owned: row.input_amount_owned,
                        input_item_id: row.input_item_id,
                        input_item_name: row.input_item_name,
                        input_item_picture: row.input_item_picture,
                        input_need_amount: row.input_need_amount,
                        required_amount: row.required_amount,
                        input_inventory_id: row.input_inventory_id,
                    });
                }
                _ => continue,
            }
        }

        let page = Page::<PlanResponse> {
            items: grouped_plans.into_values().collect(),
            total,
        };

        println!("{:#?}", page.items);

        Ok(page)
    }

    pub async fn create(&self, input: PlanDto) -> Result<Plan, sqlx::Error> {
        let id = Uuid::new_v4().to_string();

        sqlx::query_as!(
            Plan,
            "INSERT INTO plans (id, goal, item_id, created_at, updated_at) VALUES ($1, $2, $3, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP) RETURNING id, goal, item_id",
            id, input.goal, input.item_id,
        ).fetch_one(&self.db).await
    }
}
