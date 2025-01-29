use crate::{
    db,
    models::{
        game::{Game, GameDto},
        page::Page,
    },
    repositories,
};

#[tauri::command]
pub async fn create_game(input: GameDto) -> Result<Game, String> {
    let db = db::sqlite::connect().await.map_err(|e| e.to_string())?;
    let game_repo = repositories::game_repo::GameRepo::new(db);

    game_repo.create(input).await.map_err(|e| e.to_string())
}

#[tauri::command]
pub async fn read_game(limit: i32, page: i32) -> Result<Page<Game>, String> {
    let db = db::sqlite::connect().await.map_err(|e| e.to_string())?;
    let game_repo = repositories::game_repo::GameRepo::new(db);

    game_repo.read(limit, page).await.map_err(|e| e.to_string())
}

#[tauri::command]
pub async fn get_game_by_id(id: String) -> Result<Game, String> {
    let db = db::sqlite::connect().await.map_err(|e| e.to_string())?;
    let game_repo = repositories::game_repo::GameRepo::new(db);

    game_repo.get_by_id(id).await.map_err(|e| e.to_string())
}

#[tauri::command]
pub async fn update_game(id: String, input: GameDto) -> Result<(), String> {
    let db = db::sqlite::connect().await.map_err(|e| e.to_string())?;
    let game_repo = repositories::game_repo::GameRepo::new(db);

    game_repo.update(id, input).await.map_err(|e| e.to_string())
}
