import {LoginHeader} from "./components/LoginHeader.tsx";
import {LoginForm} from "./components/LoginForm.tsx";
import {useAppSelector} from "../../hooks/useAppSelector.ts";
import {useNavigate} from "react-router-dom";
import {useEffect} from "react";

export function Login() {
    const {user} = useAppSelector(state => state.backend);
    const navigate = useNavigate();

    useEffect(() => {
        if (user) {
            navigate('/home');
        }
    }, [user, navigate]);

    return (
        <>
            <LoginHeader/>
            <main className="w-full max-w-screen-xl h-svh bg-madder flex flex-col justify-center items-center">
                <p className="text-white font-custom text-4xl mt-8">Welcome back!</p>
                <p className="text-white font-semibold text-xl">To start using our app u need to login</p>
                <LoginForm/>
            </main>
        </>
    );
}
