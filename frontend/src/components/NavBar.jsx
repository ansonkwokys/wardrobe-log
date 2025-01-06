import "./NavBar.css";

const NavBar = () => {
    return (
        <nav className="nav-bar">
            <div className="nav-container">
                <div className="nav-logo">
                    <a href="/wardrobe">WARDROBE-LOG</a>
                </div>
                <ul className="nav-links">
                    <li>
                        <a href="/wardrobe">WARDROBE</a>
                    </li>
                    <li>
                        <a href="/outfit">OUTFIT</a>
                    </li>
                    <li>
                        <a href="#">THREAD</a>
                    </li>
                </ul>
                <ul className="nav-auth">
                    <li>
                        <a href="#">Settings</a>
                    </li>
                    <li>
                        <form action="/logout" method="POST">
                            <button type="submit">Logout</button>
                        </form>
                    </li>
                </ul>
            </div>
        </nav>
    );
};

export default NavBar;
