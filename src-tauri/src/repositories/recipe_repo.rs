use sqlx::Pool;
use uuid::Uuid;

use crate::models::{page::Page, recipe::{Recipe, RecipeDto}};

pub struct RecipeRepo {
    db: Pool<sqlx::Sqlite>,
}

impl RecipeRepo {
    pub fn new(db: Pool<sqlx::Sqlite>) -> Self {
        Self { db }
    }

    pub async fn create(&self, input: RecipeDto) -> Result<Recipe, sqlx::Error> {
        let id = Uuid::new_v4().to_string();

        let recipe = sqlx::query_as!(
            Recipe,
            "insert into recipes (id, output_amount, item_id) values ($1, $2, $3) returning id, output_amount, item_id",
            id, input.output_amount, input.item_id,
        ).fetch_one(&self.db).await?;

        Ok(recipe)
    }

    pub async fn read(&self, limit: i32, page: i32) -> Result<Page<Recipe>, sqlx::Error> {
        let offset = limit * page;
        let recipes = sqlx::query_as!(
            Recipe,
            "select * from recipes limit $1 offset $2",
            limit, offset,
        ).fetch_all(&self.db).await?;

        let total = sqlx::query_scalar!("SELECT COUNT(*) as count from recipes",)
            .fetch_one(&self.db)
            .await?;

        let page = Page::<Recipe> { items: recipes, total };

        Ok(page)
    }

    pub async fn update(&self, id: String, input: RecipeDto) -> Result<(), sqlx::Error> {
        _ = sqlx::query!(
            "
                update recipes
                set output_amount = $1, item_id = $2
                where id = $3
            ",
            input.output_amount, input.item_id, id
        ).execute(&self.db).await?;

        Ok(())
    }

    pub async fn get_by_id(&self, id: String) -> Result<Recipe, sqlx::Error> {
        sqlx::query_as!(
            Recipe,
            "select * from recipes where id = $1",
            id,
        ).fetch_one(&self.db).await
    }
}