use std::collections::HashMap;

use sqlx::Pool;
use uuid::Uuid;

use crate::models::{page::Page, recipe::{JoinRecipeWithDetail, Recipe, RecipeDto, RecipeWithDetail}, recipe_detail::{RecipeDetail, RecipeDetailDto, RecipeDetailForRecipe}};

pub struct RecipeRepo {
    db: Pool<sqlx::Sqlite>,
}

impl RecipeRepo {
    pub fn new(db: Pool<sqlx::Sqlite>) -> Self {
        Self { db }
    }

    pub async fn create(&self, input: RecipeDto) -> Result<Recipe, sqlx::Error> {
        let id = Uuid::new_v4().to_string();

        let recipe = sqlx::query_as!(
            Recipe,
            "insert into recipes (id, output_amount, item_id) values ($1, $2, $3) returning id, output_amount, item_id",
            id, input.output_amount, input.item_id,
        ).fetch_one(&self.db).await?;

        Ok(recipe)
    }

    pub async fn read(&self, limit: i32, page: i32) -> Result<Page<Recipe>, sqlx::Error> {
        let offset = limit * page;
        let recipes = sqlx::query_as!(
            Recipe,
            "select * from recipes limit $1 offset $2",
            limit, offset,
        ).fetch_all(&self.db).await?;

        let total = sqlx::query_scalar!("SELECT COUNT(*) as count from recipes",)
            .fetch_one(&self.db)
            .await?;

        let page = Page::<Recipe> { items: recipes, total };

        Ok(page)
    }

    pub async fn update(&self, id: String, input: RecipeDto) -> Result<(), sqlx::Error> {
        _ = sqlx::query!(
            "
                update recipes
                set output_amount = $1, item_id = $2
                where id = $3
            ",
            input.output_amount, input.item_id, id
        ).execute(&self.db).await?;

        Ok(())
    }

    pub async fn get_by_id(&self, id: String) -> Result<Recipe, sqlx::Error> {
        sqlx::query_as!(
            Recipe,
            "select * from recipes where id = $1",
            id,
        ).fetch_one(&self.db).await
    }

    pub async fn create_with_details(&self, input: RecipeDto, details: Vec<RecipeDetailDto>) -> Result<Recipe, sqlx::Error> {
        let id = Uuid::new_v4().to_string();

        let mut tx = self.db.begin().await?;

        let recipe = sqlx::query_as!(
            Recipe,
            "insert into recipes (id, output_amount, item_id) values ($1, $2, $3) returning id, output_amount, item_id",
            id, input.output_amount, input.item_id,
        ).fetch_one(&mut *tx).await?;

        for detail in details {
            let detail_id = Uuid::new_v4().to_string();

            sqlx::query_as!(
                RecipeDetail,
                "insert into recipe_details (id, input_amount, item_id, recipe_id) values ($1, $2, $3, $4) returning id, input_amount, item_id, recipe_id",
                detail_id, detail.input_amount, detail.item_id, recipe.id
            ).fetch_one(&mut *tx).await?;
        }

        tx.commit().await?;
        Ok(recipe)
    }

    pub async fn get_by_item_id_with_details(&self, item_id: String)  -> Result<Vec<RecipeWithDetail>, sqlx::Error> {
        let recipes = sqlx::query_as!(
            JoinRecipeWithDetail,
            "
                select 
                    r.id id,
                    r.output_amount output_amount,
                    r.item_id output_item_id,
                    i.picture output_item_picture,
                    rd.id recipe_detail_id,
                    rd.input_amount input_amount,
                    rd.item_id input_item_id,
                    rd.recipe_id recipe_id,
                    i2.picture input_item_picture
                from recipes r
                left join items i ON r.item_id = i.id
                left join recipe_details rd ON r.id = rd.recipe_id 
                left join items i2 on rd.item_id = i2.id 
                where r.item_id = $1
            ",
            item_id,
        ).fetch_all(&self.db).await?;

        let mut grouped_recipes: HashMap<String, RecipeWithDetail> = HashMap::new();

        for row in recipes {
            let entry = grouped_recipes.entry(row.id.clone()).or_insert_with(|| RecipeWithDetail { 
                id: row.id, 
                output_amount: row.output_amount, 
                item_id: row.output_item_id, 
                item_picture: row.output_item_picture.unwrap_or_default(), 
                recipe_details: Vec::new(), 
            });

            entry.recipe_details.push(RecipeDetailForRecipe {
                id: row.recipe_detail_id.unwrap_or_default(),
                input_amount: row.input_amount.unwrap_or_default(),
                item_id: row.input_item_id.unwrap_or_default(),
                item_picture: row.input_item_picture.unwrap_or_default(),
                recipe_id: row.recipe_id.unwrap_or_default(),
            });
        }

        Ok(grouped_recipes.into_values().collect())
    }
}