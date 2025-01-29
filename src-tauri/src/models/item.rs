use serde::{Deserialize, Serialize};
use sqlx::prelude::FromRow;

#[derive(Debug, Deserialize, FromRow, Serialize, Clone)]
pub struct Item {
    pub id: String,
    pub name: String,
    pub picture: Option<String>,
    pub game_id: String,
}

#[derive(Debug, Deserialize, FromRow, Serialize, Clone)]
pub struct ItemDto {
    pub name: String,
    pub picture: Option<String>,
    pub game_id: String,
}
