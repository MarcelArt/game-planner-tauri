use serde::{Deserialize, Serialize};
use sqlx::prelude::FromRow;

use super::{item::Item, recipe::Recipe, recipe_detail::RecipeDetail};

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

pub struct GameExport {
    pub game: Game,
    pub items: Vec<Item>,
    pub recipes: Vec<Recipe>,
    pub recipe_details: Vec<RecipeDetail>,
}
