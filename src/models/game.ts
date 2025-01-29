interface Game {
    id: string;
    name: string;
    description: string;
    picture: string;
    picture_b64: string;
}

interface GameDto {
    name: string;
    description: string;
    picture: string;
}

// export { Game, GameDto };