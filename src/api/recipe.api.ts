import { invoke } from "@tauri-apps/api/core";

async function createWithDetails(recipe: RecipeDto, recipeDetails: Array<RecipeDetailDto>): Promise<Recipe> {
    return await invoke('create_recipe_with_details', { recipe, recipeDetails });
}

const recipeApi = {
    createWithDetails,
}

export default recipeApi;