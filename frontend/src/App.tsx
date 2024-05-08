import {Route, Routes} from "react-router-dom";
import {Home} from "./pages/Home.tsx";
import {Registration} from "./pages/register/Registration.tsx";
import {Login} from "./pages/login/Login.tsx";
import {Profile} from "./pages/profile/Profile.tsx";
import {UserOrders} from "./pages/order/UserOrders.tsx";
import {Cart} from "./pages/order/cart/Cart.tsx";
import "./App.css";

function App() {

    return (
        <Routes>
            <Route path="/" element={<Registration />}/>
            <Route path="/login" element={<Login />} />
            <Route path="/home" element={<Home/>}/>
            <Route path="/profile" element={<Profile />} />
            <Route path="/my-orders" element={<UserOrders />} />
            <Route path="/cart" element={<Cart />} />
        </Routes>
    )
}

export default App
