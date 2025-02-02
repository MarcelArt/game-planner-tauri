import { readFileAsBase64 } from "@/utils/fs";
import { invoke } from "@tauri-apps/api/core";

async function createWithDetails(recipe: RecipeDto, recipeDetails: Array<RecipeDetailDto>): Promise<Recipe> {
    return await invoke('create_recipe_with_details', { recipe, recipeDetails });
}

async function getByItemIdWithDetails(itemId: string): Promise<Array<RecipeWithDetail>> {
    let recipes = await invoke('get_recipes_by_item_id_with_details', { itemId }) as Array<RecipeWithDetail>;

    for (let recipe of recipes) {
        for (let detail of recipe.recipe_details) {
            const [protocol, ] = detail.item_picture.split('://');
            const isHttp = ['http', 'https'].includes(protocol);

            detail.item_picture_b64 = isHttp ? detail.item_picture : await readFileAsBase64(detail.item_picture);
        }

        const [protocol, ] = recipe.item_picture.split('://');
        const isHttp = ['http', 'https'].includes(protocol);

        recipe.item_picture_b64 = isHttp ? recipe.item_picture : await readFileAsBase64(recipe.item_picture);
    }

    return recipes;
}

const recipeApi = {
    createWithDetails,
    getByItemIdWithDetails,
}

export default recipeApi;