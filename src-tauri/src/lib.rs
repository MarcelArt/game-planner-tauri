mod db;
mod handlers;
mod models;
mod repositories;

// Learn more about Tauri commands at https://tauri.app/develop/calling-rust/
// #[tauri::command]
// fn greet(name: &str) -> String {
//     format!("Hello, {}! You've been greeted from Rust!", name)
// }

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub async fn run() {
    db::sqlite::setup_sqlite().await.unwrap();

    tauri::Builder::default()
        .plugin(tauri_plugin_fs::init())
        .plugin(tauri_plugin_dialog::init())
        .plugin(tauri_plugin_opener::init())
        .invoke_handler(tauri::generate_handler![
            // game handler commands
            handlers::game_handler::create_game,
            handlers::game_handler::read_game,
            handlers::game_handler::get_game_by_id,
            handlers::game_handler::update_game,
            // item handler commands
            handlers::item_handler::create_item,
            handlers::item_handler::read_items,
            handlers::item_handler::get_item_by_id,
            handlers::item_handler::update_item,
            handlers::item_handler::get_items_by_game_id,
            handlers::item_handler::get_all_items_by_game_id,
            // recipe handler commands
            handlers::recipe_handler::create_recipe,
            handlers::recipe_handler::read_recipes,
            handlers::recipe_handler::get_recipe_by_id,
            handlers::recipe_handler::update_recipe,
            handlers::recipe_handler::create_recipe_with_details,
            handlers::recipe_handler::get_recipes_by_item_id_with_details,
            handlers::recipe_handler::update_recipe_with_details,
            // recipe detail handler commands
            handlers::recipe_detail_handler::create_recipe_detail,
            handlers::recipe_detail_handler::read_recipe_details,
            handlers::recipe_detail_handler::get_recipe_detail_by_id,
            handlers::recipe_detail_handler::update_recipe_detail,
            // inventory handler commands
            handlers::inventory_handler::get_inventories_by_game_id,
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
