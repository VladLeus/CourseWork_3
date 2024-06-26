import {Header} from "./general/Header.tsx";
import {useAppSelector} from "../hooks/useAppSelector.ts";
import CarPartCard from "./general/CarPartCard.tsx";
import {useNavigate} from "react-router-dom";
import {useEffect} from "react";

export function Home() {
    const {carParts, user} = useAppSelector(state => state.backend);
    const navigate = useNavigate();

    useEffect(() => {
        if (!user) {
            navigate('/');
        }
    }, [user, navigate]);

    return (
        <div className="flex flex-col items-center justify-between w-full max-w-screen-xl h-svh">
            <Header/>
            <main
                className="w-full max-w-screen-xl h-full bg-madder flex flex-col justify-center items-center overflow-y-hidden">
                <div
                    className="my-4 grid grid-cols-4 gap-2 overflow-y-scroll w-[90%]"
                >
                    {carParts.map((item) => (
                        <CarPartCard key={item.id} carPart={item}/>
                    ))}
                </div>
            </main>
        </div>
    );
}
