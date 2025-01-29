use dotenv_codegen::dotenv;
use sqlx::Pool;

pub async fn setup_sqlite() -> Result<Pool<sqlx::Sqlite>, sqlx::Error> {
    let pool = sqlx::sqlite::SqlitePoolOptions::new()
        .max_connections(1)
        .connect(dotenv!("DATABASE_URL"))
        .await?;
    sqlx::migrate!("./migrations").run(&pool).await?;

    println!("Connection to database success");
    Ok(pool)
}

pub async fn connect() -> Result<Pool<sqlx::Sqlite>, sqlx::Error> {
    let pool = sqlx::sqlite::SqlitePoolOptions::new()
        .max_connections(1)
        .connect(dotenv!("DATABASE_URL"))
        .await?;

    Ok(pool)
}
