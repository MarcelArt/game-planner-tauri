use crate::{db, models::{page::Page, recipe::{Recipe, RecipeDto, RecipeWithDetail}, recipe_detail::RecipeDetailDto}, repositories};

#[tauri::command]
pub async fn create_recipe(input: RecipeDto) -> Result<Recipe, String> {
    let db = db::sqlite::connect().await.map_err(|e| e.to_string())?;
    let repo = repositories::recipe_repo::RecipeRepo::new(db);

    repo.create(input).await.map_err(|e| e.to_string())
}

#[tauri::command]
pub async fn read_recipes(limit: i32, page: i32) -> Result<Page<Recipe>, String> {
    let db = db::sqlite::connect().await.map_err(|e| e.to_string())?;
    let repo = repositories::recipe_repo::RecipeRepo::new(db);

    repo.read(limit, page).await.map_err(|e| e.to_string())
}

#[tauri::command]
pub async fn update_recipe(id: String, input: RecipeDto) -> Result<(), String> {
    let db = db::sqlite::connect().await.map_err(|e| e.to_string())?;
    let repo = repositories::recipe_repo::RecipeRepo::new(db);

    repo.update(id, input).await.map_err(|e| e.to_string())
}

#[tauri::command]
pub async fn get_recipe_by_id(id: String) -> Result<Recipe, String> {
    let db = db::sqlite::connect().await.map_err(|e| e.to_string())?;
    let repo = repositories::recipe_repo::RecipeRepo::new(db);

    repo.get_by_id(id).await.map_err(|e| e.to_string())
}

#[tauri::command]
pub async fn create_recipe_with_details(recipe: RecipeDto, recipe_details: Vec<RecipeDetailDto>) -> Result<Recipe, String> {
    let db = db::sqlite::connect().await.map_err(|e| e.to_string())?;
    let repo = repositories::recipe_repo::RecipeRepo::new(db);
    
    repo.create_with_details(recipe, recipe_details).await.map_err(|e| e.to_string())
}

#[tauri::command]
pub async fn get_recipes_by_item_id_with_details(item_id: String) -> Result<Vec<RecipeWithDetail>, String> {
    let db = db::sqlite::connect().await.map_err(|e| e.to_string())?;
    let repo = repositories::recipe_repo::RecipeRepo::new(db);

    repo.get_by_item_id_with_details(item_id).await.map_err(|e| e.to_string())
}