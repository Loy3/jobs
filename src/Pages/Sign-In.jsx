import { useState } from "react";
import hideIcn from "../Assets/Icons/hide.png";
import showIcn from "../Assets/Icons/view.png";
import { useNavigate } from "react-router-dom";
import { auth } from "../Services/Firebase/firebaseConfig";
import { signInWithEmailAndPassword } from "firebase/auth";

function SignIn(props) {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showHidePassword, setShowHidePassword] = useState(false);
    const [emailErr, setEmailErr] = useState("");

    const [passwordErr, setPasswordErr] = useState("");

    function handleSignIn() {
        setEmailErr("");
        setPasswordErr("");

        if (email && password) {
            signInWithEmailAndPassword(auth, email, password).then(() => {
                props.setIsSignedin(true);
                navigate("/dashboard");
            }).catch((error) => {
                
                if (error.code === 'auth/user-not-found') {
                    alert("Incorrect email address or user not found.");
                } else {
                    alert("Incorrect password.");
                }

            })

        } else {
            if (!email) {
                setEmailErr("Email Required");
                return;
            }

            if (!password) {
                setPasswordErr("Password Required");
                return;
            }
        }
    }

    return (
        <div className="sign-in">
            <div className="sign-in-wrap">
                <div className="signIn-title">
                    <h1>Sign In</h1>
                    <p>Welcome Admin, complete the form below.</p>
                </div>

                <div className="form">
                    <div className="input-wrap">
                        <input type="email" placeholder="Email Address" onChange={(e) => setEmail(e.target.value)} />
                        <p>{emailErr}</p>
                    </div>
                    <div className="input-wrap">
                        <input type={showHidePassword ? "text" : "password"} placeholder="Password:" onChange={(event) => setPassword(event.target.value)} />
                        <img
                            title={showHidePassword ? "Hide password" : "Show password"}
                            src={showHidePassword ? showIcn : hideIcn}
                            onClick={() => setShowHidePassword(prevState => !prevState)}
                            className="showPassword"
                            alt="Hide"
                        />
                        <p>{passwordErr}</p>
                    </div>

                    <button onClick={handleSignIn}>Sign In</button>

                </div>
            </div>
        </div>
    );
}

export default SignIn;