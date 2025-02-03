use sqlx::Pool;

use crate::models::{inventory::InventoryWithItem, page::Page};

pub struct InventoryRepo {
    db: Pool<sqlx::Sqlite>,
}

impl InventoryRepo {
    pub fn new(db: Pool<sqlx::Sqlite>) -> Self {
        Self { db }
    }

    pub async fn get_by_game_id(&self, game_id: String, limit: i32, page: i32) -> Result<Page<InventoryWithItem>, sqlx::Error> {
        let offset = limit * page;
        let inventories = sqlx::query_as!(
            InventoryWithItem,
            "
                select 
	                COALESCE(i2.id, '') id,
                    i.name item_name,
                    i.picture item_picture,
                    i.id item_id,
                    i2.amount amount,
                    i.game_id game_id
                from items i 
                left join inventories i2 on i.id = i2.item_id
                WHERE i.game_id = $1
                limit $2 offset $3
            ",
            game_id, limit, offset,
        ).fetch_all(&self.db).await?;

        let total = sqlx::query_scalar!(
            "
                select 
                    COUNT(*) as count
                from items i 
                left join inventories i2 on i.id = i2.item_id
                WHERE i.game_id = $1
            ",
            game_id,
        )
            .fetch_one(&self.db)
            .await?;

        let page = Page::<InventoryWithItem> {
            items: inventories,
            total,
        };

        Ok(page)
    }
}