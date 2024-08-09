import { Header } from "../Components/Header";
import SideNav from "../Components/SideNav";

function ViewUsers() {
    return (
        <div className="users">
            <div className="add-jobs-wrap">
                <SideNav />

                <div className="add-right">
                    <Header title={"View Users"} text={"See all users who signed up."} />
                    <div className="right-wrap">
                        <div className="user-cards">
                            <div className="user-card">
                                <div className="user-num">
                                    <h2>01</h2>
                                </div>
                                <div className="user-wrap">
                                    <h4>Full Name:</h4>
                                    <p>First & Last Name</p>
                                </div>
                                <div className="user-wrap">
                                    <h4>Email Address:</h4>
                                    <p>email@yahoo.com</p>
                                </div>
                                <div className="user-wrap">
                                    <h4>Phone Number:</h4>
                                    <p>0852741963</p>
                                </div>
                                <div className="user-doc">
                                    <button>Download CV</button>
                                </div>
                                {/* <h3>Full Name</h3> */}
                                {/* <h4>Email</h4>
                                <h4>Phone Number</h4>
                                */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ViewUsers;