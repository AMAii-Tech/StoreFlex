import { useState } from "react";
import "./Login.css";
import { apiList, makeRequest, setBearerToken } from "../../services/api.js";
import swal from "sweetalert";
import { useDispatch } from "react-redux";
import { setUser } from "../../utils/slices/authSlice.js";
const Login = () => {
    const [isSignUp, setIsSignUp] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const dispatch = useDispatch();
    const handleSwitchButton = () => {
        setIsSignUp(!isSignUp);
    };
    const handleLoginFormSubmit = (e) => {
        e.preventDefault();
        makeRequest({
            controller: apiList.loginAPI,
            body: { email: email, password: password },
            method: "POST",
        }).then((response) => {
            if (response.status === 200) {
                const data = response.data;
                setBearerToken(data.accessToken);
                dispatch(setUser(data));
            }
        });
    };

    const handleSignUpFormSubmit = (e) => {
        e.preventDefault();
        makeRequest({
            controller: apiList.registerAPI,
            body: { email, password, name },
            method: "POST",
        }).then((response) => {
            if (response.status === 201) {
                swal({
                    title: "Welcome to StoreFlex!",
                    text: "Your account has been created.",
                    icon: "success",
                    button: {
                        text: "Lets SignIn",
                        className: "button",
                    },
                }).then(() => setIsSignUp(false));
            }
        });
    };

    return (
        <div className={`container ${isSignUp ? "right-panel-active" : ""}`}>
            <div className="form-container sign-up-container">
                <form onSubmit={handleSignUpFormSubmit}>
                    <h1>Create Account</h1>
                    <span>or use your email for registration</span>
                    <input
                        type="text"
                        placeholder="Name"
                        onChange={(e) => setName(e.target.value)}
                    />
                    <input
                        type="email"
                        placeholder="Email"
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <button>Sign Up</button>
                </form>
            </div>
            <div className="form-container sign-in-container">
                <form onSubmit={handleLoginFormSubmit}>
                    <h1>Sign in</h1>
                    <span>or use your account</span>
                    <input
                        type="text"
                        placeholder="Email"
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <button>Sign In</button>
                </form>
            </div>
            <div className="overlay-container">
                <div className="overlay">
                    <div className="overlay-panel overlay-left">
                        <h1>Welcome Back!</h1>
                        <p>
                            To keep connected with us please login with your
                            personal info
                        </p>
                        <button
                            className="ghost"
                            id="signIn"
                            onClick={handleSwitchButton}
                        >
                            Sign In
                        </button>
                    </div>
                    <div className="overlay-panel overlay-right">
                        <h1>Hello, Friend!</h1>
                        <p>
                            Enter your personal details and start journey with
                            us
                        </p>
                        <button
                            className="ghost"
                            id="signUp"
                            onClick={handleSwitchButton}
                        >
                            Sign Up
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
