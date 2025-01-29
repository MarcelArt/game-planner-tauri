use serde::{Deserialize, Serialize};
use sqlx::prelude::FromRow;

#[derive(Debug, Deserialize, FromRow, Serialize, Clone)]
pub struct Recipe {
    pub id: String,
    pub output_amount: f64,
    pub item_id: String,
}

#[derive(Debug, Deserialize, FromRow, Serialize, Clone)]
pub struct RecipeDto {
    pub id: String,
    pub output_amount: f64,
    pub item_id: String,
}