interface Recipe {
    id: string;
    output_amount: number;
    item_id: string;
}

interface RecipeDto {
    output_amount: number;
    item_id: string;
}

interface RecipeWithDetail {
    id: string;
    output_amount: number;
    item_id: string;
    item_picture: string,
    item_picture_b64: string,
    recipe_details: Array<RecipeDetailForRecipe>,
}