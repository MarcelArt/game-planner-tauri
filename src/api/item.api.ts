import { readFileAsBase64 } from "@/utils/fs";
import { invoke } from "@tauri-apps/api/core";

async function create(input: ItemDto): Promise<void> {
    await invoke('create_item', { input });
}

async function read(page: number, limit: number): Promise<Page<Item>> {
    const items = await invoke('read_item', { page, limit });
    return items as Page<Item>;
}

async function update(id: string, input: ItemDto): Promise<void> {
    await invoke('update_item', { id, input });
}

async function getById(id: string): Promise<Item> {
    const item = await invoke('get_item_by_id', { id });
    return item as Item;
}

async function getByGameId(gameId: string, page: number, limit: number): Promise<Page<Item>> {
    const items = await invoke('get_items_by_game_id', { gameId, page, limit }) as Page<Item>;
    for (let item of items.items) {
        const [protocol, ] = item.picture.split('://');
        const isHttp = ['http', 'https'].includes(protocol);
        try {
            item.picture_b64 = isHttp ? item.picture : await readFileAsBase64(item.picture);
        }
        catch {
            item.picture_b64 = item.picture
        }
    }

    return items;
}

async function getAllByGameId(gameId: string): Promise<Array<Item>> {
    const items = await invoke('get_all_items_by_game_id', { gameId }) as Array<Item>;
    for (let item of items) {
        const [protocol, ] = item.picture.split('://');
        const isHttp = ['http', 'https'].includes(protocol);
        try {
            item.picture_b64 = isHttp ? item.picture : await readFileAsBase64(item.picture);
        }
        catch {
            item.picture_b64 = item.picture
        }
    }

    return items;
}

const itemApi = {
    create,
    read,
    update,
    getById,
    getByGameId,
    getAllByGameId,
}

export default itemApi;