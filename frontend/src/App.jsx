import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import NavBar from "./components/NavBar.jsx";
import Wardrobe from "./components/Wardrobe.jsx";
import Login from "./components/Login.jsx";
//import Outfit from "./components/Outfit.jsx";
import "./App.css";

function App() {
    return (
        <BrowserRouter className="flex flex-col h-screen w-screen justify-center items-center">
            <NavBarOrNot />
            <Routes>
                {/*<Route path="/outfit" element={<Outfit />} />*/}
                <Route path="/login" element={<Login />} />
                <Route path="/wardrobe" element={<Wardrobe />} />
            </Routes>
        </BrowserRouter>
    );
}

function NavBarOrNot() {
    const location = useLocation();
    return (
        location.pathname === "/wardrobe" && <NavBar className="nav-bar" />
    );
}

export default App;
