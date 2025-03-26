use crate::{
    db,
    models::{
        game::{Game, GameDto, GameExport},
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

#[tauri::command]
pub async fn export_game(id: String) -> Result<GameExport, String> {
    let db = db::sqlite::connect().await.map_err(|e| e.to_string())?;
    let game_repo = repositories::game_repo::GameRepo::new(db);
    let item_repo = repositories::item_repo::ItemRepo::new(db);
    let recipe_repo = repositories::recipe_repo::RecipeRepo::new(db);
    let rd_repo = repositories::recipe_detail_repo::RecipeDetailRepo::new(&db);

    let game = game_repo.get_by_id(id).await.map_err(|e| e.to_string())?;
    let items = item_repo
        .get_all_by_game_id(id)
        .await
        .map_err(|e| e.to_string())?;
    let recipes = recipe_repo
        .get_by_game_id(id)
        .await
        .map_err(|e| e.to_string())?;
    let recipe_details = rd_repo
        .get_by_game_id(id)
        .await
        .map_err(|e| e.to_string())?;

    let game_export = GameExport {
        game,
        items,
        recipes,
        recipe_details,
    };
    Ok(game_export)
}
