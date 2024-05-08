import React, {useMemo, useState} from "react";
import {Order} from "../../models/dto/order/order.ts";
import {Detail} from "../../models/Detail.ts";

interface OrderCard {
    order: Order,
}

const OrderCard: React.FC<OrderCard> = ({ order}) => {

    const [quantity, setQuantity] = useState<number>(1);

    useMemo(() => {
        let temp: number = 0;
        order.orderDetail.partsBought.map((item: Detail) => {
            temp += item.quantity;
        })
        setQuantity(temp);
    }, []);

    return (
        <div
            className="flex flex-col items-start justify-center w-[250px] rounded-2xl bg-white text-black font-normal m-2">
            <p className="ml-10 text-black text-lg my-2"><span className="font-custom">Date: </span>
                { new Date(order.orderDetail.orderDate).toLocaleDateString()}
            </p>
            <p className="ml-10 text-black text-lg my-0.5"><span className="font-custom">Price: </span>
                { order.orderDetail.totalPrice + '$'}
            </p>
            <p className="ml-10 text-black text-lg mb-2">
                <span className="font-custom">Parts bought: </span>
                { quantity}
            </p>
        </div>
    )
}

export default OrderCard;
