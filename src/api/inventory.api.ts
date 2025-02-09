import { readFileAsBase64 } from "@/utils/fs";
import { invoke } from "@tauri-apps/api/core";

async function getByGameId(gameId: string, limit: number, page: number): Promise<Page<InventoryWithItem>> {
    let inventories = await invoke('get_inventories_by_game_id', { gameId, limit, page }) as Page<InventoryWithItem>;
    for (let inventory of inventories.items) {
        const picture = inventory.item_picture ?? '';
        const [protocol, ] = picture.split('://');
        const isHttp = ['http', 'https'].includes(protocol);

        inventory.item_picture_b64 = isHttp ? picture : await readFileAsBase64(picture);
    }

    return inventories;
}

async function upsert(input: InventoryDto): Promise<Inventory> {
    console.log('inventoryId :>> ', input.id);
    return await invoke('upsert_inventory', { input });
}

const inventoryApi = {
    getByGameId,
    upsert,
}

export default inventoryApi;