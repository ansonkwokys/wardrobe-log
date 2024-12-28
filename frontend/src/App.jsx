import NavBar from "./components/NavBar.jsx";
import Wardrobe from "./components/Wardrobe.jsx";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import "./App.css";
function App() {
    let location = useLocation();
    return (
        <BrowserRouter className="app-container">
            {location.pathname !== "/" && <NavBar className="nav-bar"/>}
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/wardrobe" element={<Wardrobe />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
