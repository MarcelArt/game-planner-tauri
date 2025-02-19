use sqlx::Pool;
use uuid::Uuid;

use crate::models::{
    item::{Item, ItemDto},
    page::Page,
};

pub struct ItemRepo {
    db: Pool<sqlx::Sqlite>,
}

impl ItemRepo {
    pub fn new(db: Pool<sqlx::Sqlite>) -> Self {
        Self { db }
    }

    pub async fn create(&self, input: ItemDto) -> Result<Item, sqlx::Error> {
        let id = Uuid::new_v4().to_string();

        let item = sqlx::query_as!(
            Item,
            "INSERT INTO items (id, name, picture, game_id) VALUES ($1, $2, $3, $4) RETURNING id, name, picture, game_id",
            id,
            input.name,
            input.picture,
            input.game_id
        ).fetch_one(&self.db).await?;

        Ok(item)
    }

    pub async fn read(&self, limit: i32, page: i32) -> Result<Page<Item>, sqlx::Error> {
        let offset = limit * page;
        let items = sqlx::query_as!(
            Item,
            "
                select * from items
                limit $1 offset $2
            ",
            limit,
            offset,
        )
        .fetch_all(&self.db)
        .await?;

        let total = sqlx::query_scalar!("select count(*) from items")
            .fetch_one(&self.db)
            .await?;

        let page = Page::<Item> { items, total };

        Ok(page)
    }

    pub async fn update(&self, id: String, input: ItemDto) -> Result<(), sqlx::Error> {
        _ = sqlx::query!(
            "
                update items
                set name = $1, picture = $2, game_id = $3
                where id = $4
            ",
            input.name,
            input.picture,
            input.game_id,
            id
        )
        .execute(&self.db)
        .await?;

        Ok(())
    }

    pub async fn get_by_id(&self, id: String) -> Result<Item, sqlx::Error> {
        let item = sqlx::query_as!(Item, "select * from items where id = $1", id,)
            .fetch_one(&self.db)
            .await?;

        Ok(item)
    }

    pub async fn get_by_game_id(
        &self,
        game_id: String,
        limit: i32,
        page: i32,
    ) -> Result<Page<Item>, sqlx::Error> {
        let items = sqlx::query_as!(
            Item,
            "select * from items where game_id = $1 limit $2 offset $3",
            game_id,
            limit,
            page,
        )
        .fetch_all(&self.db)
        .await?;

        let total = sqlx::query_scalar!("select count(*) from items where game_id = $1", game_id)
            .fetch_one(&self.db)
            .await?;

        let page = Page::<Item> { items, total };

        Ok(page)
    }

    pub async fn get_all_by_game_id(&self, game_id: String) -> Result<Vec<Item>, sqlx::Error> {
        sqlx::query_as!(Item, "select * from items where game_id = $1", game_id,)
            .fetch_all(&self.db)
            .await
    }
}
