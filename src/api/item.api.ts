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
    const items = await invoke('get_items_by_game_id', { gameId, page, limit });
    console.log('items :>> ', items);
    return items as Page<Item>;
}

const itemApi = {
    create,
    read,
    update,
    getById,
    getByGameId,
}

export default itemApi;