use crate::{db, models::game::{Game, GameDto}, repositories};

#[tauri::command]
pub async fn create_game(input: GameDto) -> Result<Game, String> {
    let db = db::sqlite::connect().await.map_err(|e| e.to_string())?;
    let game_repo = repositories::game_repo::GameRepo::new(db);

    println!("Creating game: {:?}", input);

    game_repo.create(input).await.map_err(|e| e.to_string())
}