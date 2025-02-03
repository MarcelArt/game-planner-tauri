use serde::{Deserialize, Serialize};
use sqlx::prelude::FromRow;

#[derive(Debug, Deserialize, FromRow, Serialize, Clone)]
pub struct Inventory {
    pub id: String,
    pub amount: f64,
    pub item_id: String,
}