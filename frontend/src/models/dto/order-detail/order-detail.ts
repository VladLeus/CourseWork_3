import {Detail} from "../../Detail.ts";

export interface OrderDetail {
    id: string;
    partsBought: Detail[];
    totalPrice: number;
    orderDate: Date;
}
