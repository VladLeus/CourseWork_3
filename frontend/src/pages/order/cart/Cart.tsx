import {useAppSelector} from "../../../hooks/useAppSelector.ts";
import {Header} from "../../general/Header.tsx";
import {CarPart} from "../../../models/car-part.ts";
import CartElemCard from "./CartElemCard.tsx";
import {useActions} from "../../../hooks/useActions.ts";
import {useCreateOrderDetailsMutation, useCreateOrderMutation} from "../../../store/backendAPI/backend.api.ts";
import {useEffect, useState} from "react";
import {OrderDetailDto} from "../../../models/dto/order-detail/order-detail.dto.ts";
import {CreateOrderDto} from "../../../models/dto/order/create-order.dto.ts";


export function Cart() {
    const {cart, details, user} = useAppSelector(state => state.backend);
    const [createOrderDetail, {isLoading, isError}] = useCreateOrderDetailsMutation();
    const [createOrder, {isLoading: isOrderLoading, isError: isOrderError}] = useCreateOrderMutation();
    const [totalPrice, setTotalPrice] = useState<number>(0);
    const { clearCart, clearDetails} = useActions();

    const placeOrder = async () => {
        const orderDetailsDto: OrderDetailDto = {
            dto_partsBought: details,
            dto_totalPrice: totalPrice
        };

        const response = await createOrderDetail(orderDetailsDto);

        if ('data' in response) {
            const orderDto: CreateOrderDto = {
                dto_user_id: user?.id!,
                dto_order_details_id: response.data.id
            };

            console.log(orderDto);
            const res = await createOrder(orderDto);

            if ('data' in res) {
                clearCart();
                clearDetails();
            } else {
                console.log(res.error);
            }
        } else {
            console.log(response.error);
        }
    };


    useEffect(() => {
        let tempTotal: number = 0;
        for (const item of cart) {
            for (const itemD of details) {
                if (itemD.car_part_id === item.id) {
                    tempTotal += item.pricePerOne * itemD.quantity;
                }
            }
        }
        setTotalPrice(tempTotal);
    }, [details, cart]);
    return (
        <>
            <Header/>
            <main
                className="w-full max-w-screen-xl h-svh bg-madder flex flex-col justify-start items-start overflow-y-hidden">
                {cart.length === 0 && <p className="text-white font-custom text-2xl mx-auto mt-10">Cart is currently empty</p>}
                {cart.length > 0 &&
                    <>
                        <div className="mt-10 mx-auto grid grid-cols-4">
                            {cart.map((carPart: CarPart) => (
                                <CartElemCard key={carPart.id} carPart={carPart}/>
                            ))}
                        </div>
                        <p className="text-white text-2xl mt-4 ml-10"><span className="text-black font-custom">Total Price:</span> {totalPrice + '$'}
                        </p>
                        <p onClick={async (e) => {
                            e.preventDefault()
                            await placeOrder();
                        }} className="text-white font-custom bg-black py-2 px-4 text-lg rounded-2xl ml-10 mt-1.5 cursor-pointer hover:text-black hover:bg-white transition-colors duration-300">Place Order</p>
                    </>
                }
                { isLoading || isOrderLoading && <p>Loading...</p> }
                { isError || isOrderError && <p>Some error occurred</p> }
            </main>
        </>
    );
}
