use sqlx::Pool;
use uuid::Uuid;

use crate::models::recipe::{Recipe, RecipeDto};

pub struct RecipeRepo {
    db: Pool<sqlx::Sqlite>,
}

impl RecipeRepo {
    pub fn new(db: Pool<sqlx::Sqlite>) -> Self {
        Self { db }
    }

    // pub async fn create(&self, input: RecipeDto) -> Result<Recipe, sqlx::Error> {
    //     let id = Uuid::new_v4().to_string();

    //     let recipe = sqlx::query_as!(
    //         Recipe,
    //         ""
    //     )
    // }
}