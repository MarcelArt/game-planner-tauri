// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use dotenv::dotenv;

#[async_std::main]
async fn main() {
    dotenv().ok();
    game_planner_tauri_lib::run().await;
}
