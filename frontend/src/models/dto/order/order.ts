import {OrderDetail} from "../order-detail/order-detail.ts";
import {UserProfile} from "../../user-profile.ts";

export interface Order {
    id: string;
    user?: UserProfile;
    orderDetail: OrderDetail;
}
