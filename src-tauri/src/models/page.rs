use serde::{Deserialize, Serialize};

#[derive(Serialize, Deserialize)]
pub struct Page<T> {
    pub items: Vec<T>,
    pub total: i64,
    // pub total_page: i64,
    // pub max_page: i64,
}