use serde::{Deserialize, Serialize};
use sqlx::prelude::FromRow;

#[derive(Debug, Deserialize, FromRow, Serialize, Clone)]
pub struct Plan {
    pub id: String,
    pub goal: i64,
    pub item_id: String,
}