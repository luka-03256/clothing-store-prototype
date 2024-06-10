import { User } from "./user.model";

export interface Review {
    id: number;
    title: string;
    content: string;
    rating: number;
    createdAt: string;
    clothesId: number;
    user: User;
}