use crate::{db, models::{inventory::{Inventory, InventoryDto, InventoryWithItem}, page::Page}, repositories};

#[tauri::command]
pub async fn get_inventories_by_game_id(game_id: String, limit: i32, page: i32) -> Result<Page<InventoryWithItem>, String> {
    let db = db::sqlite::connect().await.map_err(|e| e.to_string())?;
    let repo = repositories::inventory_repo::InventoryRepo::new(db);

    repo.get_by_game_id(game_id, limit, page).await.map_err(|e| e.to_string())
}

#[tauri::command]
pub async fn upsert_inventory(input: InventoryDto) -> Result<Inventory, String> {
    let db = db::sqlite::connect().await.map_err(|e| e.to_string())?;
    let repo = repositories::inventory_repo::InventoryRepo::new(db);

    repo.upsert(input).await.map_err(|e| e.to_string())   
}