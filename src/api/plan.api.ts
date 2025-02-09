import { readFileAsBase64 } from "@/utils/fs";
import { invoke } from "@tauri-apps/api/core";

async function getByGameId(gameId: string, limit: number, page: number): Promise<Page<PlanResponse>> {
    let plans = await invoke('get_plans_by_game_id', { gameId, limit, page }) as Page<PlanResponse>;
    for (let plan of plans.items) {
        const picture = plan.output_item_picture ?? '';
        const [protocol, ] = picture.split('://');
        const isHttp = ['http', 'https'].includes(protocol);

        plan.output_item_picture_b64 = isHttp ? picture : await readFileAsBase64(picture);

        for (let recipe of plan.recipes) {
            const picture = recipe.input_item_picture ?? '';
            const [protocol, ] = picture.split('://');
            const isHttp = ['http', 'https'].includes(protocol);

            recipe.input_item_picture_b64 = isHttp ? picture : await readFileAsBase64(picture);
            console.log({ recipe });
        }
    }

    return plans;
}

const planApi = {
    getByGameId,
}

export default planApi;