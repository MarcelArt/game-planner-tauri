use crate::{
    db,
    models::{
        item::{Item, ItemDto},
        page::Page,
    },
    repositories,
};

#[tauri::command]
pub async fn create_item(input: ItemDto) -> Result<Item, String> {
    let db = db::sqlite::connect().await.map_err(|e| e.to_string())?;
    let repo = repositories::item_repo::ItemRepo::new(db);

    repo.create(input).await.map_err(|e| e.to_string())
}

#[tauri::command]
pub async fn read_items(limit: i32, page: i32) -> Result<Page<Item>, String> {
    let db = db::sqlite::connect().await.map_err(|e| e.to_string())?;
    let repo = repositories::item_repo::ItemRepo::new(db);

    repo.read(limit, page).await.map_err(|e| e.to_string())
}

#[tauri::command]
pub async fn update_item(id: String, input: ItemDto) -> Result<(), String> {
    let db = db::sqlite::connect().await.map_err(|e| e.to_string())?;
    let repo = repositories::item_repo::ItemRepo::new(db);

    repo.update(id, input).await.map_err(|e| e.to_string())
}

#[tauri::command]
pub async fn get_item_by_id(id: String) -> Result<Item, String> {
    let db = db::sqlite::connect().await.map_err(|e| e.to_string())?;
    let repo = repositories::item_repo::ItemRepo::new(db);

    repo.get_by_id(id).await.map_err(|e| e.to_string())
}

#[tauri::command]
pub async fn get_items_by_game_id(
    game_id: String,
    limit: i32,
    page: i32,
) -> Result<Page<Item>, String> {
    let db = db::sqlite::connect().await.map_err(|e| e.to_string())?;
    let repo = repositories::item_repo::ItemRepo::new(db);

    repo.get_by_game_id(game_id, limit, page)
        .await
        .map_err(|e| e.to_string())
}

#[tauri::command]
pub async fn get_all_items_by_game_id(game_id: String) -> Result<Vec<Item>, String> {
    let db = db::sqlite::connect().await.map_err(|e| e.to_string())?;
    let repo = repositories::item_repo::ItemRepo::new(db);

    repo.get_all_by_game_id(game_id)
        .await
        .map_err(|e| e.to_string())
}