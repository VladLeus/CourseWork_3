import {Link} from "react-router-dom";

export function Nav() {
    const navStyles: string = 'flex justify-center items-center font-custom h-full text-white text-xl hover:text-madder transition-colors duration-200'

    return (
        <nav className="grid grid-cols-5 grid-rows-1 w-full h-full max-w-3xl">
            <p className={navStyles}>
                <i className="fi fi-rr-home mr-2"></i>
                <Link to="/home">
                    Home
                </Link>
            </p>
            <p className={navStyles}>
                <i className="fi fi-rr-shopping-cart mr-2"></i>
                <Link to="/cart">
                    Cart
                </Link>
            </p>
            <p className={navStyles}>
                <i className="fi fi-rr-apps-sort mr-2"></i>
                <Link to="/my-orders">
                    My orders
                </Link>
            </p>
            <p className={navStyles}>
                <i className="fi fi-rr-user mr-2"></i>
                <Link to="/profile">
                    Profile
                </Link>
            </p>
            <p className={navStyles}>
                <i className="fi fi-rr-info mr-2"></i>
                <Link to="/about-us">
                    About Us
                </Link>
            </p>
        </nav>
    );
}
