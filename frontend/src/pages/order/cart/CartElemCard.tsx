import React, {useEffect, useState} from "react";
import {CarPart} from "../../../models/car-part.ts";
import {useActions} from "../../../hooks/useActions.ts";

interface CartElemCardProps {
    carPart: CarPart,
}

const CartElemCard: React.FC<CartElemCardProps> = ({carPart}) => {
    const {removeFromCart, addDetail, removeDetail} = useActions();
    const [quantity, setQuantity] = useState<number>(1);
    const thisDetails = {
        car_part_id: carPart.id,
        quantity: quantity,
    }

    const setLocalDetails = () => {
        addDetail(thisDetails);
    }

    const incrementQuantity = () => {
        setQuantity(quantity + 1);
    }

    const decrementQuantity = () => {
        if (quantity > 1)
            setQuantity(quantity - 1);
    }

    const handleRemoveFromCart = () => {
        removeDetail(thisDetails);
        removeFromCart(carPart);
    };

    useEffect(() => {
        setLocalDetails();
    }, [quantity]);

    return (
        <div
            className="flex flex-col items-start justify-center w-[250px] rounded-2xl bg-white text-black font-normal m-2">
            <p className="w-[235px] h-6 overflow-hidden ml-1.5"><span
                className="font-custom">Name:</span> {carPart.name}</p>
            <p className="ml-1.5"><span className="font-custom">Price:</span> {carPart.pricePerOne + " $"}</p>
            <p className="ml-1.5"><span className="font-custom">Quantity:</span> <span
                className="font-bold cursor-pointer" onClick={incrementQuantity}>+</span> {quantity} <span
                className="font-bold cursor-pointer" onClick={decrementQuantity}>-</span></p>
            <p onClick={handleRemoveFromCart}
               className="bg-black text-white font-thin py-1 px-2 rounded-lg ml-1.5 my-0.5 cursor-pointer hover:bg-rojo">Remove</p>
        </div>
    )
}

export default CartElemCard;
