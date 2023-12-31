import "./Success.css";
import "../../assets/success.svg";
const Success = () => {
    return (
        <div id="card" className="animated fadeIn">
            <div id="upper-side">
                <h3 id="status">Success</h3>
            </div>
            <div id="lower-side">
                <p id="message">
                    Congratulations, your account has been successfully created.
                </p>
                <a href="#" id="contBtn">
                    Continue
                </a>
            </div>
        </div>
    );
};

export default Success;
