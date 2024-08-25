import { useEffect, useState } from "react";
import { Title } from "../Components/Components";
import SideNav from "../Components/SideNav";
import moment from "moment";

import defaultImg from "../Assets/Images/Day/0.jpg";
import morningImg from "../Assets/Images/Day/1.jpg";
import afternoonImg from "../Assets/Images/Day/2.jpg";
import nightImg from "../Assets/Images/Day/3.jpg";
import { FormattedDate } from "../Services/Functions";

function Dashboard(props) {
    const [cardImage, setCardImage] = useState(defaultImg);
    const formattedDate = FormattedDate();
    const [currentTime, setCurrentTime] = useState(new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false }));

    useEffect(() => {
        const interval = setInterval(() => {
            // setTime(moment().format('hh:mm'));
            let now = moment()

            const morning = new Date();
            morning.setHours(6, 0, 0); // 6am
            const afternoon = new Date();
            afternoon.setHours(12, 0, 0); // 12pm
            const night = new Date();
            night.setHours(18, 0, 0); // 7pm


            // Compare the current time to the night time range
            if (now > morning && now <= afternoon) {
                setCardImage(morningImg);
            } else if (now > afternoon && now <= night) {
                setCardImage(afternoonImg);
            } else {
                setCardImage(nightImg);
            }
        }, 1000);
        return () => clearInterval(interval);
    }, [])

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentTime(new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false }));
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="dashboard">
            <div className="dashboard-wrap">
                <SideNav />

                <div className="add-right">
                    <div className="dash-title">
                        <Title title={"Dashboard"} text={"Admin dashboard."} />
                    </div>
                    <div className="dash-head">
                        <div className="head-left">
                            <h3>Welcome, Admin</h3>
                            <p>{formattedDate}</p>
                        </div>

                        <div className="head-right">
                            <h1>A</h1>
                        </div>
                    </div>
                    <div className="dash-main">
                        <div className="dash-top">
                            <img src={cardImage} alt="" />
                            <div className="left-time">
                                <h2>{currentTime}</h2>
                            </div>
                        </div>
                        <div className="dash-btm">

                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}

export default Dashboard;