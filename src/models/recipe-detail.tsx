interface RecipeDetail {
    id: string;
    input_amount: number;
    item_id: string;
    recipe_id: string;
}

interface RecipeDetailDto {
    input_amount: number;
    item_id: string;
    recipe_id?: string;
}

interface RecipeDetailForRecipe {
    id: string;
    input_amount: number;
    item_id: string;
    recipe_id: string;
    item_picture: string;
    item_picture_b64: string;
}

// pub struct RecipeDetailForRecipe {
//     pub id: String,
//     pub input_amount: f64,
//     pub item_id: String,
//     pub recipe_id: String,
//     pub item_picture: String,
// }