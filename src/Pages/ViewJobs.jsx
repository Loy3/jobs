import { Header } from "../Components/Header";
import SideNav from "../Components/SideNav";

import locationIcn from "../Assets/Icons/location.png";
import calenderIcn from "../Assets/Icons/calendar.png";
import moneyIcn from "../Assets/Icons/money.png";

import closeIcn from "../Assets/Icons/close.png";
import { useState } from "react";

function ViewJobs() {

    const [popupStatus, setPopupStatus] = useState(false);
    // const fetchData = (async () => {

    //     // let documents = [];
    //     const collectionRef = collection(db, 'imageDetails');
    //     onSnapshot(collectionRef, (snapshot) => {
    //         // let allItems = [];
    //         let count = 0;
    //         snapshot.forEach((doc) => {
    //             count++
    //         });

    //         setItems(count);
    //     });

    // })

    // useEffect(() => {
    //     fetchData();
    // }, [])
    function handlePopup(content) {
        console.log(content);

        setPopupStatus(true);
    }

    return (
        <div className="view-jobs">
            <div className="add-jobs-wrap">
                <SideNav />

                <div className="add-right">
                    <Header title={"View Jobs"} text={"See all the jobs added."} />
                    <div className="right-wrap">
                        <div className="jobs-cards">

                            <div className="job-card">
                                <div className="card-wrap">
                                    <div className="title-wrap">
                                        <h3>Junior Front-End Developer</h3>
                                        <p>Remote</p>
                                    </div>
                                    <div className="location">
                                        <img src={locationIcn} alt="" />
                                        <h4>Location</h4>
                                    </div>

                                    <div className="location">
                                        <img src={calenderIcn} alt="" />
                                        <h4>Closing Date:</h4>
                                    </div>
                                    <div className="location">
                                        <img src={moneyIcn} alt="" />
                                        <h4>R000.<span>00</span></h4>
                                    </div>
                                    <button onClick={() => handlePopup("hello")}>View Job</button>

                                    {/* 
                                    
                                    <h4>Remote</h4> */}
                                </div>
                            </div>
                            <div className="job-card">
                                <div className="card-wrap">
                                    <div className="title-wrap">
                                        <h3>Junior Front-End Developer</h3>
                                        <p>Remote</p>
                                    </div>
                                    <div className="location">
                                        <img src={locationIcn} alt="" />
                                        <h4>Location</h4>
                                    </div>

                                    <div className="location">
                                        <img src={calenderIcn} alt="" />
                                        <h4>Closing Date:</h4>
                                    </div>
                                    <div className="location">
                                        <img src={moneyIcn} alt="" />
                                        <h4>R000.<span>00</span></h4>
                                    </div>
                                    <button onClick={() => handlePopup("hello")}>View Job</button>

                                    {/* 
                                    
                                    <h4>Remote</h4> */}
                                </div>
                            </div>
                            <div className="job-card">
                                <div className="card-wrap">
                                    <div className="title-wrap">
                                        <h3>Junior Front-End Developer</h3>
                                        <p>Remote</p>
                                    </div>
                                    <div className="location">
                                        <img src={locationIcn} alt="" />
                                        <h4>Location</h4>
                                    </div>

                                    <div className="location">
                                        <img src={calenderIcn} alt="" />
                                        <h4>Closing Date:</h4>
                                    </div>
                                    <div className="location">
                                        <img src={moneyIcn} alt="" />
                                        <h4>R000.<span>00</span></h4>
                                    </div>
                                    <button onClick={() => handlePopup("hello")}>View Job</button>

                                    {/* 
                                    
                                    <h4>Remote</h4> */}
                                </div>
                            </div>
                            <div className="job-card">
                                <div className="card-wrap">
                                    <div className="title-wrap">
                                        <h3>Junior Front-End Developer</h3>
                                        <p>Remote</p>
                                    </div>
                                    <div className="location">
                                        <img src={locationIcn} alt="" />
                                        <h4>Location</h4>
                                    </div>

                                    <div className="location">
                                        <img src={calenderIcn} alt="" />
                                        <h4>Closing Date:</h4>
                                    </div>
                                    <div className="location">
                                        <img src={moneyIcn} alt="" />
                                        <h4>R000.<span>00</span></h4>
                                    </div>
                                    <button onClick={() => handlePopup("hello")}>View Job</button>

                                    {/* 
                                    
                                    <h4>Remote</h4> */}
                                </div>
                            </div>
                            {popupStatus ?
                                <div className="pop-up">
                                    <div className="pop-up-box">
                                        <button className="closeBtn" onClick={() => setPopupStatus(false)}><img src={closeIcn} alt="" /></button>
                                        <div className="popup-wrap">
                                            <div className="title-wrap">
                                                <h3>Junior Front-End Developer</h3>
                                                <p>Remote</p>
                                            </div>

                                            <div className="location">
                                                <img src={locationIcn} alt="" />
                                                <h4>Location</h4>
                                            </div>


                                            <div className="content-wrap">
                                                <div className="location">
                                                    <img src={calenderIcn} alt="" />
                                                    <h4>Closing Date:</h4>
                                                </div>
                                                <div className="location">
                                                    <img src={calenderIcn} alt="" />
                                                    <h4>Full Time</h4>
                                                </div>
                                            </div>

                                            <div className="content-wrap">
                                                <div className="location">
                                                    <img src={moneyIcn} alt="" />
                                                    <h4>Salary</h4>
                                                </div>
                                            </div>
                                            <button>Apply</button>

                                            <div className="job-descrip">
                                                <h4>Job Description</h4>
                                                <p>gsdasdasd dsfsdfdsf sdvfdsfdsfsd sdfsdfsdf</p>

                                                <button>Apply</button>
                                            </div>

                                        </div>
                                    </div>
                                </div>
                                : null
                            }
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
}

export default ViewJobs;