import { invoke } from "@tauri-apps/api/core";

async function create(input: GameDto): Promise<void> {
    await invoke('create_game', { input });
}

async function read(page: number, limit: number): Promise<Page<Game>> {
    const games = await invoke('read_game', { page, limit });
    return games as Page<Game>;
}

async function update(id: string, input: GameDto): Promise<void> {
    await invoke('update_game', { id, input });
}

async function getById(id: string): Promise<Game> {
    const game = await invoke('get_game_by_id', { id });
    return game as Game;
}

const gameApi = {
    create,
    read,
    update,
    getById,
}

export default gameApi;