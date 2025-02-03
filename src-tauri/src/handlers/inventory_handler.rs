use crate::{db, models::{inventory::InventoryWithItem, page::Page}, repositories};

#[tauri::command]
pub async fn get_inventories_by_game_id(game_id: String, limit: i32, page: i32) -> Result<Page<InventoryWithItem>, String> {
    let db = db::sqlite::connect().await.map_err(|e| e.to_string())?;
    let repo = repositories::inventory_repo::InventoryRepo::new(db);

    repo.get_by_game_id(game_id, limit, page).await.map_err(|e| e.to_string())
}