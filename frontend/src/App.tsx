import {Route, Routes} from "react-router-dom";
import {Home} from "./pages/Home.tsx";
import {Login} from "./pages/login/Login.tsx";

function App() {

    return (
        <Routes>
            <Route path="/" element={<Login/>}/>
            <Route path="/home" element={<Home/>}/>
        </Routes>
    )
}

export default App
