import { Header } from "../Components/Header";
import SideNav from "../Components/SideNav";

import locationIcn from "../Assets/Icons/location.png";
import calenderIcn from "../Assets/Icons/calendar.png";
import moneyIcn from "../Assets/Icons/money.png";

import closeIcn from "../Assets/Icons/close.png";
import { useEffect, useState } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../Services/Firebase/firebaseConfig";
import { ReturnFormattedDate, HandleColor } from "../Services/Functions";

function ViewJobs() {

    const [jobs, setJobs] = useState([]);
    const [job, setJob] = useState(null);
    const [popupStatus, setPopupStatus] = useState(false);

    const fetchData = (async () => {

        // let documents = [];
        const collectionRef = collection(db, 'jobs');
        onSnapshot(collectionRef, (snapshot) => {
            // console.log(snapshot.data());
            if (snapshot) {
                // console.log(snapshot);
                const jbs = [];
                snapshot.forEach((doc) => {
                    jbs.push({ id: doc.id, ...doc.data() });
                });
                console.log(jbs);
                setJobs(jbs);
                setJob(jbs[0]);
            } else {
                // setNewAddItem(null);
            }
        });

    })

    useEffect(() => {
        fetchData();
    }, [])
    function handlePopup(jb) {
        setJob(jb);
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

                            {jobs.map((job, index) => (
                                <div key={index} className="job-card">
                                    <div className="card-wrap">
                                        <div className="title-wrap">
                                            <h3>{job.jobTitle}</h3>
                                            <p style={{backgroundColor: `${HandleColor(job.jobLocation)}`}}>{job.jobLocation}</p>
                                        </div>
                                        <div className="location">
                                            <img src={locationIcn} alt="" />
                                            <h4>{job.jobAddress}</h4>
                                        </div>

                                        <div className="location">
                                            <img src={calenderIcn} alt="" />
                                            <h4>{ReturnFormattedDate(job.jobClosingDate)}</h4>
                                        </div>
                                        <div className="location">
                                            <img src={moneyIcn} alt="" />
                                            <h4>R{job.jobSalary}.<span>00</span></h4>
                                        </div>
                                        <button onClick={() => handlePopup(job)}>View Job</button>

                                        {/* 
                                    
                                    <h4>Remote</h4> */}
                                    </div>
                                </div>
                            ))}
                            {popupStatus ?
                                <div className="pop-up">
                                    {/* jobTitle && jobAddress && jobSalary && jobType && jobTiming && jobPeriod && jobLocation && jobClosingDate && jobDescription */}
                                    <div className="pop-up-box">
                                        <button className="closeBtn" onClick={() => setPopupStatus(false)}><img src={closeIcn} alt="" /></button>
                                        <div className="popup-wrap">
                                            <div className="title-wrap">
                                                <h3>{job.jobTitle}</h3>
                                                <p style={{backgroundColor: `${HandleColor(job.jobLocation)}`}}>{job.jobLocation}</p>
                                            </div>

                                            <div className="location">
                                                <img src={locationIcn} alt="" />
                                                <h4>{job.jobAddress}</h4>
                                            </div>


                                            <div className="content-wrap">
                                                <div className="location">
                                                    <img src={calenderIcn} alt="" />
                                                    <h4>{ReturnFormattedDate(job.jobClosingDate)}</h4>
                                                </div>
                                                <div className="location">
                                                    <img src={calenderIcn} alt="" />
                                                    <h4>{job.jobTiming}</h4>
                                                </div>
                                            </div>

                                            <div className="content-wrap">
                                                <div className="location">
                                                    <img src={moneyIcn} alt="" />
                                                    <h4>R{job.jobSalary}.<span>00</span></h4>
                                                </div>
                                            </div>
                                            {/* <button>Apply</button> */}

                                            <div className="job-descrip">
                                                <h4>Job Description</h4>
                                                <p>{job.jobDescription}</p>

                                                {/* <button>Apply</button> */}
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