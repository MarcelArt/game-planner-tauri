use sqlx::Pool;
use uuid::Uuid;

use crate::models::{
    inventory::{Inventory, InventoryDto, InventoryWithItem},
    page::Page,
};

pub struct InventoryRepo {
    db: Pool<sqlx::Sqlite>,
}

impl InventoryRepo {
    pub fn new(db: Pool<sqlx::Sqlite>) -> Self {
        Self { db }
    }

    pub async fn get_by_game_id(
        &self,
        game_id: String,
        limit: i32,
        page: i32,
    ) -> Result<Page<InventoryWithItem>, sqlx::Error> {
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
            game_id,
            limit,
            offset,
        )
        .fetch_all(&self.db)
        .await?;

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

    pub async fn upsert(&self, input: InventoryDto) -> Result<Inventory, sqlx::Error> {
        println!("{:#?}", input);
        let inventory = match input.id {
            Some(id) if !id.is_empty() => {
                sqlx::query_as!(
                    Inventory,
                    "
                        UPDATE inventories
                        SET amount = $1, item_id = $2
                        WHERE id = $3
                        RETURNING id, amount, item_id
                    ",
                    input.amount,
                    input.item_id,
                    id,
                )
                .fetch_one(&self.db)
                .await?
            }
            _ => {
                let id = Uuid::new_v4().to_string();

                sqlx::query_as!(
                    Inventory,
                    "INSERT INTO inventories (id, amount, item_id) VALUES ($1, $2, $3) RETURNING id, amount, item_id",
                    id, input.amount, input.item_id,
                ).fetch_one(&self.db).await?
            }
        };

        Ok(inventory)
    }
}
