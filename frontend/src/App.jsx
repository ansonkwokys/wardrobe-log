import NavBar from "./components/NavBar.jsx";
import Wardrobe from "./components/Wardrobe.jsx";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Login from "./components/Login.jsx";
import "./App.css";

function App() {
    return (
        <BrowserRouter className="app-container">
            <NavBarOrNot />
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/wardrobe" element={<Wardrobe />} />
            </Routes>
        </BrowserRouter>
    );
}

function NavBarOrNot() {
    const location = useLocation();
    return location.pathname !== "/" && <NavBar className="nav-bar" />;
}

export default App;
