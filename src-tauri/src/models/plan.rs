use serde::{Deserialize, Serialize};
use sqlx::prelude::FromRow;

#[derive(Debug, Deserialize, FromRow, Serialize, Clone)]
pub struct Plan {
    pub id: String,
    pub goal: i64,
    pub item_id: String,
}

#[derive(Debug, Deserialize, FromRow, Serialize, Clone)]
pub struct PlanDto {
    pub goal: i64,
    pub item_id: String,
}

#[derive(Debug, Deserialize, FromRow, Serialize, Clone)]
pub struct PlanDetailView {
    pub id: String,
    pub goal: i64,
    pub input_item_id: Option<String>,
    pub input_item_name: Option<String>,
    pub input_item_picture: Option<String>,
    pub required_amount: Option<i64>,
    pub output_item_id: Option<String>,
    pub output_item_name: Option<String>,
    pub output_item_picture: Option<String>,
    pub input_amount_owned: Option<i64>,
    pub input_need_amount: Option<i64>,
    pub recipe_id: Option<String>,
    pub input_inventory_id: Option<String>,
}

#[derive(Debug, Deserialize, Serialize, Clone)]
pub struct PlanResponse {
    pub id: String,
    pub goal: i64,
    pub output_item_id: Option<String>,
    pub output_item_name: Option<String>,
    pub output_item_picture: Option<String>,
    pub recipes: Vec<PlanRecipeResponse>,
}

#[derive(Debug, Deserialize, Serialize, Clone)]
pub struct PlanRecipeResponse {
    pub input_item_id: Option<String>,
    pub input_item_name: Option<String>,
    pub input_item_picture: Option<String>,
    pub required_amount: Option<i64>,
    pub input_amount_owned: Option<i64>,
    pub input_need_amount: Option<i64>,
    pub input_inventory_id: Option<String>,
}
