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