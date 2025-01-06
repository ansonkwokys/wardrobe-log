import "./Login.css";

export default function Login() {
    return (
        <div className="login-container">
            <h1>Wardrobe-Log</h1>
            <button className="login-link" onClick={() => {
                window.location.href = "http://localhost:3000/auth/google";
            }}>
                Sign in with Google
            </button>
        </div>
    );
}
