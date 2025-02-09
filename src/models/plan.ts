interface PlanResponse {
    id: string;
    goal: number;
    output_item_id?: string;
    output_item_name?: string;
    output_item_picture?: string;
    output_item_picture_b64?: string;
    recipes: Array<PlanRecipeResponse>;
}

interface PlanRecipeResponse {
    input_item_id: string;
    input_item_name: string;
    input_item_picture: string;
    input_item_picture_b64: string;
    required_amount: number;
    input_amount_owned: number;
    input_need_amount: number;
    input_inventory_id?: string;
}