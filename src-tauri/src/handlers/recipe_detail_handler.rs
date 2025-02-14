use crate::{
    db,
    models::{
        page::Page,
        recipe_detail::{RecipeDetail, RecipeDetailDto},
    },
    repositories,
};

#[tauri::command]
pub async fn create_recipe_detail(input: RecipeDetailDto) -> Result<RecipeDetail, String> {
    let db = db::sqlite::connect().await.map_err(|e| e.to_string())?;
    let repo = repositories::recipe_detail_repo::RecipeDetailRepo::new(db);

    repo.create(input).await.map_err(|e| e.to_string())
}

#[tauri::command]
pub async fn read_recipe_details(limit: i32, page: i32) -> Result<Page<RecipeDetail>, String> {
    let db = db::sqlite::connect().await.map_err(|e| e.to_string())?;
    let repo = repositories::recipe_detail_repo::RecipeDetailRepo::new(db);

    repo.read(limit, page).await.map_err(|e| e.to_string())
}

#[tauri::command]
pub async fn update_recipe_detail(id: String, input: RecipeDetailDto) -> Result<(), String> {
    let db = db::sqlite::connect().await.map_err(|e| e.to_string())?;
    let repo = repositories::recipe_detail_repo::RecipeDetailRepo::new(db);

    repo.update(id, input).await.map_err(|e| e.to_string())
}

#[tauri::command]
pub async fn get_recipe_detail_by_id(id: String) -> Result<RecipeDetail, String> {
    let db = db::sqlite::connect().await.map_err(|e| e.to_string())?;
    let repo = repositories::recipe_detail_repo::RecipeDetailRepo::new(db);

    repo.get_by_id(id).await.map_err(|e| e.to_string())
}
