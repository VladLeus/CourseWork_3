import {useAppSelector} from "../../../hooks/useAppSelector.ts";
import {useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import {useDeleteOrderMutation, useLazyGetAllOrdersQuery} from "../../../store/backendAPI/backend.api.ts";
import {Order} from "../../../models/dto/order/order.ts";
import {Header} from "../../general/Header.tsx";
import OrderCardAdmin from "./OrderCardAdmin.tsx";
import {useActions} from "../../../hooks/useActions.ts";

export function Orders() {
    const { user, ordersAdmin } = useAppSelector(state => state.backend);
    const {removeOrder, setOrder} = useActions();
    const navigate = useNavigate();
    const [error, setError] = useState<string>();
    const [getAllOrders, {isLoading: isOrdersLoading, isError: isOrderError}] = useLazyGetAllOrdersQuery();
    const [removeOrderReq, {isLoading, isError}] = useDeleteOrderMutation();

    useEffect(() => {
        if (!user) {
            navigate('/');
        }
    }, [user, navigate]);

    const handleGettingOrders = async () => {
        const res = await getAllOrders('');
        if ('data' in res) {
            setOrder(res.data!);
        } else {
            // @ts-ignore
            setError(res.error?.message);
        }
    }

    useEffect(() => {
        handleGettingOrders();
    }, [ordersAdmin]);

    const handleRemoveOrder = async (id: string) => {
        const res = await removeOrderReq(id);
        if ('data' in res) {
            removeOrder({orderID: id});
            ordersAdmin?.filter((item: Order) => item.id !== id);
        } else {
            // @ts-ignore
            setError(res.error.message);
        }
    }
    return (
        <>
            <Header />
            <main
                className="w-full max-w-screen-xl h-svh bg-madder flex flex-col justify-center items-center overflow-y-hidden">
                <div className="mt-10 mx-auto grid grid-cols-4">
                    {
                        ordersAdmin?.map((item: Order) => (
                                <OrderCardAdmin key={item.id} order={item} handleRemoveOrder={handleRemoveOrder}/>
                            )
                        )
                    }
                </div>
                {ordersAdmin.length === 0 && <p className="text-white font-custom text-2xl mx-auto mt-10">No orders added yet</p>}
                {isLoading || isOrdersLoading && <p className="text-white font-custom text-2xl mx-auto mt-10">Loading...</p>}
                {isError || isOrderError && <p className="text-white font-custom text-2xl mx-auto mt-10">{error}</p>}
            </main>
        </>
    );
}
