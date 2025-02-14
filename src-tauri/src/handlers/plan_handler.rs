use crate::{
    db,
    models::{page::Page, plan::PlanResponse},
    repositories,
};

#[tauri::command]
pub async fn get_plans_by_game_id(
    game_id: String,
    limit: i32,
    page: i32,
) -> Result<Page<PlanResponse>, String> {
    let db = db::sqlite::connect().await.map_err(|e| e.to_string())?;
    let repo = repositories::plan_repo::PlanRepo::new(db);

    repo.get_by_game_id(game_id, limit, page)
        .await
        .map_err(|e| e.to_string())
}
