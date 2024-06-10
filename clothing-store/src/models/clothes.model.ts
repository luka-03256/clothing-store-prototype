import { Category } from "./category.model";
import { Producer } from "./producer.model";

export interface Clothes {
    id: number;
    title: string;
    size: string;
    description: string;
    category: Category;
    producer: Producer;
    productionDate: string;
    featured: boolean;
    viewsCount: number;
    purchaseCount: number;
    image: string;
    price: number;
    currency: 'EUR';
}