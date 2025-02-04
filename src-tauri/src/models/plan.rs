use serde::{Deserialize, Serialize};
use sqlx::prelude::FromRow;

#[derive(Debug, Deserialize, FromRow, Serialize, Clone)]
pub struct Plan {
    pub id: String,
    pub goal: i64,
    pub item_id: String,
}

#[derive(Debug, Deserialize, FromRow, Serialize, Clone)]
pub struct PlanDetail {
    pub id: String,
    pub goal: i64,
    pub input_item_id: Option<String>,
    pub input_item_name: Option<String>,
    pub input_item_picture: Option<String>,
    pub required_amount: Option<f64>,
    pub output_item_id: Option<String>,
    pub output_item_name: Option<String>,
    pub output_item_picture: Option<String>,
    pub input_amount_owned: Option<i64>,
    pub input_need_amount: Option<f64>,
}