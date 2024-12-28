import "./Login.css";

export default function Login() {
    return (
        <div className="login-container">
            <h1>Wardrobe-Log</h1>
            <form action="/login" method="POST">
                <button type="submit">
                    Login with Google
                </button>
            </form>
        </div>
    );
}
