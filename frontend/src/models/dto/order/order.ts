import {OrderDetail} from "../order-detail/order-detail.ts";

export interface Order {
    id: string;
    orderDetail: OrderDetail;
}
