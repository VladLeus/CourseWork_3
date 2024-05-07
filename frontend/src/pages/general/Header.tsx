import {Link} from "react-router-dom";
import {Nav} from "./Nav.tsx";

export function Header() {
    return (
        <header className="flex items-center justify-between w-full max-w-screen-xl bg-raisin-black h-24">
            <Link to="/home" className="cursor-pointer flex items-center justify-center">
                <img
                    src="/../src/assets/logo.jpeg"
                    alt="logo"
                    className="h-14 w-14 ml-8 rounded-full"
                />
                <p className="font-custom text-white text-5xl mx-5">Prime <span className="text-rojo">Drive</span></p>
            </Link>
            <Nav />
        </header>
    );
}
