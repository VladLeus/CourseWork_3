import React from "react";
import {CarPart} from "../../models/car-part.ts";
import {useActions} from "../../hooks/useActions.ts";

interface CarPartCardProps {
    carPart: CarPart,
}

const CarPartCard: React.FC<CarPartCardProps> = ({ carPart}) => {
    const {addToCart} = useActions();

    const handleAddToCart = () => {
        addToCart(carPart);
    };

    return (
        <div className="flex flex-col items-start justify-center w-[250px] rounded-2xl bg-white text-black font-normal">
            <p className="ml-1.5"><span className="font-custom">Category:</span> { carPart.category.name } </p>
            <p className="w-[235px] h-6 overflow-hidden ml-1.5"><span className="font-custom">Name:</span> { carPart.name }</p>
            <p className="w-[235px] h-6 overflow-hidden ml-1.5"><span className="font-custom">Description:</span> {carPart.description} </p>
            <p className="ml-1.5"><span className="font-custom">Price:</span> { carPart.pricePerOne + " $"}</p>
            <p onClick={handleAddToCart} className="bg-black text-white font-thin py-1 px-2 rounded-lg ml-1.5 mb-0.5 cursor-pointer hover:bg-rojo">Add <i className="fi fi-rr-shopping-cart-add"></i></p>
        </div>
    )
}

export default CarPartCard;
