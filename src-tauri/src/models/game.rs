use serde::{Deserialize, Serialize};
use sqlx::prelude::FromRow;

#[derive(Debug, Deserialize, FromRow, Serialize, Clone)]
pub struct Game {
    pub id: String,
    pub name: String,
    pub description: String,
    pub picture: Option<String>,
}

#[derive(Debug, Deserialize, FromRow, Serialize, Clone)]
pub struct GameDto {
    pub name: String,
    pub description: String,
    pub picture: Option<String>,
}
