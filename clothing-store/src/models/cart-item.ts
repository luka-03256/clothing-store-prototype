import { Clothes } from "./clothes.model";

export interface CartItem {
    clothingItem: Clothes;
    quantity: number;
}