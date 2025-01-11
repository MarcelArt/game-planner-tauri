use sqlx::Pool;

pub async fn setup_sqlite() -> Result<Pool<sqlx::Sqlite>, sqlx::Error> {
    let pool = sqlx::sqlite::SqlitePoolOptions::new()
        .max_connections(1)
        .connect("sqlite:./db.sqlite")
        .await?;
    sqlx::migrate!("./migrations")
        .run(&pool)
        .await?;

    println!("Connection to database success");
    Ok(pool)
}