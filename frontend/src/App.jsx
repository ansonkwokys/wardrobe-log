import NavBar from "./components/NavBar.jsx";
import Wardrobe from "./components/Wardrobe.jsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
function App() {
    return (
        <BrowserRouter className="app-container">
            <NavBar className="nav-bar"/>
            <Routes>
                <Route path="/wardrobe" element={<Wardrobe />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
