use sqlx::Pool;
use uuid::Uuid;

use crate::models::game::{Game, GameDto};

pub struct GameRepo {
    db: Pool<sqlx::Sqlite>
}

impl GameRepo {
    pub fn new(db: Pool<sqlx::Sqlite>) -> Self {
        Self { db }
    }

    pub async fn create(&self, input: GameDto) -> Result<Game, sqlx::Error> {
        let name = input.name;
        let description = input.description;
        let id = Uuid::new_v4().to_string();

        let game = sqlx::query_as!(
            Game,
            "INSERT INTO games (name, description, id) VALUES ($1, $2, $3) RETURNING id, name, description",
            name,
            description,
            id,
        )
            .fetch_one(&self.db)
            .await?;

        Ok(game)
    }

    pub async fn read(&self) -> Result<Vec<Game>, sqlx::Error> {
        let games = sqlx::query_as!(
            Game,
            "SELECT id, name, description FROM games"
        )
            .fetch_all(&self.db)
            .await?;

        Ok(games)
    }
}