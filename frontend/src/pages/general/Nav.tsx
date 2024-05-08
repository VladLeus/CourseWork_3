import {Link} from "react-router-dom";
import {useAppSelector} from "../../hooks/useAppSelector.ts";

export function Nav() {
    const navStyles: string = 'flex justify-center items-center font-custom h-full text-white text-xl hover:text-madder transition-colors duration-200'
    const {user} = useAppSelector(state => state.backend)
    return (
        <nav className="grid grid-cols-4 grid-rows-1 w-full h-full max-w-3xl">
            <p className={navStyles}>
                <i className="fi fi-rr-home mr-2"></i>
                <Link to="/home">
                    Home
                </Link>
            </p>
            {user?.dto_user_role === 'CLIENT' && <>
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
            </>}
            {user?.dto_user_role === 'ADMIN' && <>
                <p className={navStyles}>
                    <i className="fi fi-rr-apps-sort mr-2"></i>
                    <Link to="/orders">
                        Orders
                    </Link>
                </p>
                <p className={navStyles}>
                    <i className="fi fi-rr-user mr-2"></i>
                    <Link to="/users">
                        Users
                    </Link>
                </p>
            </>
            }
        </nav>
    );
}
