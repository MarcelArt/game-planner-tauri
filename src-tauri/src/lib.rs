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
        // .invoke_handler(tauri::generate_handler![greet])
        .invoke_handler(tauri::generate_handler![
            handlers::game_handler::create_game,
            handlers::game_handler::read_game,
            handlers::game_handler::get_game_by_id,
            handlers::game_handler::update_game,
            handlers::item_handler::create_item,
            handlers::item_handler::read_items,
            handlers::item_handler::get_item_by_id,
            handlers::item_handler::update_item,
            handlers::item_handler::get_items_by_game_id,
        ])
        // .invoke_handler(tauri::generate_handler![handlers::game_handler::read_game])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
