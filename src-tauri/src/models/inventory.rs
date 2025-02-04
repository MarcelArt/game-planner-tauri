use serde::{Deserialize, Serialize};
use sqlx::prelude::FromRow;

#[derive(Debug, Deserialize, FromRow, Serialize, Clone)]
pub struct Inventory {
    pub id: String,
    pub amount: i64,
    pub item_id: String,
}

#[derive(Debug, Deserialize, FromRow, Serialize, Clone)]
pub struct InventoryWithItem {
    pub id: Option<String>,
    pub item_name: String,
    pub item_picture: Option<String>,
    pub item_id: String,
    pub amount: Option<i64>,
    pub game_id: String
}


#[derive(Debug, Deserialize, FromRow, Serialize, Clone)]
pub struct InventoryDto {
    pub id: Option<String>,
    pub amount: i64,
    pub item_id: String,
}