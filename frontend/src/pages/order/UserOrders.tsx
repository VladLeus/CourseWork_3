import {Header} from "../general/Header.tsx";
import {useAppSelector} from "../../hooks/useAppSelector.ts";
import {useEffect, useState} from "react";
import {Order} from "../../models/dto/order/order.ts";
import {useLazyGetUserOrdersQuery} from "../../store/backendAPI/backend.api.ts";
import {useNavigate} from "react-router-dom";
import OrderCard from "./OrderCard.tsx";

export function UserOrders() {
    const {user} = useAppSelector(state => state.backend);
    const [userOrders, setUserOrders] = useState<Order[]>();
    const [error, setError] = useState<string>();
    const [getUserOrder, {isLoading, isError}] = useLazyGetUserOrdersQuery();
    const navigate = useNavigate();

    useEffect(() => {
        if (!user) {
            navigate('/');
        }
    }, [user, navigate]);

    const getUserOrders = async () => {
        const res = await getUserOrder(user?.id!);
        if('data' in res) {
            setUserOrders(res.data);
        } else {
            // @ts-ignore
            setError(res.error?.message);
        }
    }

    useEffect( () => {
        getUserOrders();
    }, [user]);


    return (
        <>
            <Header />
            <main className="w-full max-w-screen-xl h-svh bg-madder flex flex-col justify-start items-start overflow-y-hidden">
                <div className="mt-10 mx-auto grid grid-cols-4">
                    {
                        userOrders?.map((item: Order) => (
                                <OrderCard key={item.id} order={item}/>
                            )
                        )
                    }
                </div>
            </main>
            {!userOrders && <p className="text-white font-custom text-2xl mx-auto mt-10">No orders added yet</p>}
            {isLoading && <p className="text-white font-custom text-2xl mx-auto mt-10">Loading...</p>}
            {isError && <p className="text-white font-custom text-2xl mx-auto mt-10">{error}</p>}
        </>
    );
}
