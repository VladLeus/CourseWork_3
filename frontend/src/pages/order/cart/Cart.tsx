import {useAppSelector} from "../../../hooks/useAppSelector.ts";
import {Header} from "../../general/Header.tsx";
import {CarPart} from "../../../models/car-part.ts";
import CartElemCard from "./CartElemCard.tsx";

export function Cart() {
    const {cart} = useAppSelector(state => state.backend);
    return (
        <>
            <Header/>
            <main
                className="w-full max-w-screen-xl h-svh bg-madder flex flex-col justify-start items-start overflow-y-hidden">
                {cart.length === 0 && <p>Cart is currently empty</p>}
                {cart.length > 0 &&
                    <div className="mt-10 ml-10">
                        {cart.map((carPart: CarPart) => (
                            <CartElemCard key={carPart.id} carPart={carPart}/>
                        ))}
                    </div>
                }
            </main>
        </>
    );
}
