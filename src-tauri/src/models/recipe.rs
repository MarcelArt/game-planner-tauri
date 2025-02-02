use serde::{Deserialize, Serialize};
use sqlx::prelude::FromRow;

use super::recipe_detail::RecipeDetailForRecipe;

#[derive(Debug, Deserialize, FromRow, Serialize, Clone)]
pub struct Recipe {
    pub id: String,
    pub output_amount: f64,
    pub item_id: String,
}

#[derive(Debug, Deserialize, FromRow, Serialize, Clone)]
pub struct RecipeDto {
    pub output_amount: f64,
    pub item_id: String,
}

#[derive(Debug, Deserialize, FromRow, Serialize, Clone)]
pub struct RecipeWithDetail {
    pub id: String,
    pub output_amount: f64,
    pub item_id: String,
    pub item_picture: String,
    pub recipe_details: Vec<RecipeDetailForRecipe>
}

#[derive(Debug, Deserialize, FromRow, Serialize, Clone)]
pub struct JoinRecipeWithDetail {
    pub id: String,
    pub output_amount: f64,
    pub output_item_id: String,
    pub output_item_picture: Option<String>,
    pub recipe_detail_id: Option<String>,
    pub input_amount: Option<f64>,
    pub input_item_id: Option<String>,
    pub recipe_id: Option<String>,
    pub input_item_picture: Option<String>,
}