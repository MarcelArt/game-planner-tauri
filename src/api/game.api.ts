import { readFileAsBase64 } from "@/utils/fs";
import { invoke } from "@tauri-apps/api/core";

async function create(input: GameDto): Promise<void> {
    await invoke('create_game', { input });
}

async function read(page: number, limit: number): Promise<Page<Game>> {
    const games = await invoke('read_game', { page, limit }) as Page<Game>;

    for (let game of games.items) {
        const [protocol, ] = game.picture.split('://');
        const isHttp = ['http', 'https'].includes(protocol);
        game.picture_b64 = isHttp ? game.picture : await readFileAsBase64(game.picture);
    }

    return games;
}

async function update(id: string, input: GameDto): Promise<void> {
    await invoke('update_game', { id, input });
}

async function getById(id: string): Promise<Game> {
    const game = await invoke('get_game_by_id', { id }) as Game;
    const [protocol, ] = game.picture.split('://');
    const isHttp = ['http', 'https'].includes(protocol);
    game.picture_b64 = isHttp ? game.picture : await readFileAsBase64(game.picture);
    return game;
}

const gameApi = {
    create,
    read,
    update,
    getById,
}

export default gameApi;