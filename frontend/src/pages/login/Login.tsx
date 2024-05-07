import {LoginHeader} from "./components/LoginHeader.tsx";
import {LoginForm} from "./components/LoginForm.tsx";

export function Login() {
    return (
        <>
            <LoginHeader/>
            <main className="w-full max-w-screen-xl h-svh bg-madder flex flex-col justify-center items-center">
                <p className="text-white font-custom text-4xl mt-8">Welcome back!</p>
                <p className="text-white font-semibold text-xl">To start using our app u need to login</p>
                <LoginForm />
            </main>
        </>
    );
}
