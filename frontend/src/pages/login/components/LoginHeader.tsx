import {Link} from "react-router-dom";

export function LoginHeader() {
    return (
        <header className="flex items-center justify-center w-full max-w-screen-xl bg-raisin-black h-24">
            <Link to="/" className="cursor-pointer flex items-center justify-center text-xl">
                <img
                    src="/../src/assets/logo.jpeg"
                    alt="logo"
                    className="h-14 w-14 ml-8 rounded-full"
                />
                <p className="font-custom text-white text-6xl mx-5">Prime <span className="text-rojo">Drive</span></p>
            </Link>
        </header>
    );
}
