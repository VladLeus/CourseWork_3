import {Category} from "./category.ts";

export interface CarPart {
    id: string;
    category: Category;
    name: string;
    description: string;
    image?: null;
    pricePerOne: number;
}
