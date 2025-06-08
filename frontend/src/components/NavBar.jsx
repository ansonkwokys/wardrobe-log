import "./NavBar.css";

const NavBar = () => {
    return (
        <nav className="w-full h-12 bg-cyan-700 flex flex-wrap justify-between items-center font-bold text-white p-3">
            <div className="flex grow-1 basis-0 items-center">
                <a href="/wardrobe">WARDROBE-LOG</a>
            </div>
            <ul className="flex grow-3 basis-0 items-center justify-around">
                <li>
                    <a href="/wardrobe">WARDROBE</a>
                </li>
                <li>
                    <a href="/outfit">OUTFIT</a>
                </li>
            </ul>
            <ul className="flex grow-1 basis-0 items-center justify-around">
                <li>
                    <a href="#">Settings</a>
                </li>
                <li>
                    <form action="/logout" method="POST">
                        <button type="submit">Logout</button>
                    </form>
                </li>
            </ul>
        </nav>
    );
};

export default NavBar;
