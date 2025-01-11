use sqlx::Pool;

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

        let game = sqlx::query_as!(
            Game,
            "INSERT INTO games (name, description) VALUES ($1, $2) RETURNING id, name, description",
            name,
            description,
        )
            .fetch_one(&self.db)
            .await?;

        Ok(game)
    }
}