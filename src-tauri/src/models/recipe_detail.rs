use serde::{Deserialize, Serialize};
use sqlx::prelude::FromRow;

#[derive(Debug, Deserialize, FromRow, Serialize, Clone)]
pub struct RecipeDetail {
    pub id: String,
    pub input_amount: f64,
    pub item_id: String,
    pub recipe_id: String,
}

#[derive(Debug, Deserialize, FromRow, Serialize, Clone)]
pub struct RecipeDetailDto {
    pub input_amount: f64,
    pub item_id: String,
    pub recipe_id: Option<String>,
}

#[derive(Debug, Deserialize, FromRow, Serialize, Clone)]
pub struct RecipeDetailForRecipe {
    pub id: String,
    pub input_amount: f64,
    pub item_id: String,
    pub recipe_id: String,
    pub item_picture: String,
}