import dashIcn from "../Assets/Icons/dashboard.png";
import addIcn from "../Assets/Icons/add.png";
import jobsIcn from "../Assets/Icons/briefcase.png";
import usersIcn from "../Assets/Icons/users.png";
import applyIcn from "../Assets/Icons/job-apply.png";
import signOutIcn from "../Assets/Icons/sign-out.png";
import menuIcn from "../Assets/Icons/menu.png";
import closeIcn from "../Assets/Icons/close.png";

import { useNavigate } from 'react-router-dom';
import { auth } from "../Services/Firebase/firebaseConfig";
import { signOut } from "firebase/auth";

function SideNav() {
    const navigate = useNavigate();

    function handleNavigation(type) {
        switch (type) {
            case "dash":
                navigate("/dashboard");
                break;
            case "add":
                navigate("/add");
                break;
            case "jobs":
                navigate("/jobs");
                break;
            case "users":
                navigate("/users");
                break;
            case "applied":
                navigate("/applied");
                break;
            case "signOut":
                signOut(auth);
                navigate("/");
                break;
            default:
                break;
        }
    }
    function handleMenu(type) {
        const menu = document.getElementById("sideNav");

        switch (type) {
            case "open":
                menu.style.display = "flex";
                break;

            default:
                menu.style.display = "none";
                break;
        }
    }


    return (
        <>
            <div className="side-nav-menu">
                <button onClick={() => handleMenu("open")}><img src={menuIcn} alt="menu" /></button>
            </div>
            <div className="side-nav" id="sideNav">
                <div className="side-nav-close">
                    <button onClick={() => handleMenu("close")}><img src={closeIcn} alt="menu" /></button>
                </div>
                <div className="nav-logo">
                    <h1>StheJobs.</h1>
                </div>

                <div className="nav-routes">
                    <h4>Menu:</h4>
                    <button onClick={() => handleNavigation("dash")}><div className="btn-img"><img src={dashIcn} alt="dashboard" /></div> Dashboard</button>
                    <button onClick={() => handleNavigation("add")}><div className="btn-img"><img src={addIcn} alt="dashboard" /></div> Add Job</button>
                    <button onClick={() => handleNavigation("jobs")}><div className="btn-img"><img src={jobsIcn} alt="dashboard" /></div> View Jobs</button>
                    <button onClick={() => handleNavigation("users")}><div className="btn-img"><img src={usersIcn} alt="dashboard" /></div> View Users</button>
                    <button onClick={() => handleNavigation("applied")}><div className="btn-img"><img src={applyIcn} alt="dashboard" /></div> Applied Jobs</button>
                </div>

                <div className="nav-sign-out">
                    <button onClick={() => handleNavigation("signOut")}><img src={signOutIcn} alt="signOut" />Sign Out</button>
                </div>
            </div>
        </>
    );
}

export default SideNav;