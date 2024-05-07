import {Detail} from "../../Detail.ts";

export interface OrderDetailDto {
    dto_partsBought: Detail[];
    dto_totalPrice: number;
}
