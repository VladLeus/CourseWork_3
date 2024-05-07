import {RegisterHeader} from "./components/RegisterHeader.tsx";
import {RegistrationForm} from "./components/RegistrationForm.tsx";
import {useAppSelector} from "../../hooks/useAppSelector.ts";
import {useNavigate} from "react-router-dom";
import {useEffect} from "react";

export function Registration() {
    const { user } = useAppSelector(state => state.backend);
    const navigate = useNavigate();

    useEffect(() => {
        if (Object.entries(user).length !== 0) {
            navigate('/home');
        }
    }, [user, navigate]);

    return (
        <>
            <RegisterHeader />
            {Object.entries(user).length === 0 && (
                <main className="w-full max-w-screen-xl h-svh bg-madder flex flex-col justify-center items-center">
                    <div className="flex flex-col justify-center items-center mt-5">
                        <p className="text-white font-custom text-6xl">Welcome!</p>
                        <p className="text-white font-custom text-4xl">We are selling <span className="text-black">premium parts</span> for all Audi RS series
                            cars</p>
                        <p className="text-white font-semibold text-2xl">To start using our app u need to login or
                            register!</p>
                    </div>
                    <RegistrationForm />
                </main>
            )}
        </>
    );
}

