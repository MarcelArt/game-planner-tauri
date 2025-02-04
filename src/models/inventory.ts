interface InventoryWithItem {
    id?: string;
    item_name: string;
    item_picture?: string;
    item_picture_b64: string;
    item_id: string;
    amount?: number;
    game_id: string;
}

interface InventoryDto {
    id?: string;
    amount: number;
    item_id: string;
}

interface Inventory {
    id: string;
    amount: number;
    item_id: string;
}