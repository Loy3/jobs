import { Header } from "../Components/Header";
import SideNav from "../Components/SideNav";

import locationIcn from "../Assets/Icons/location.png";
import calenderIcn from "../Assets/Icons/calendar.png";
import moneyIcn from "../Assets/Icons/money.png";
import timeIcn from "../Assets/Icons/clock.png";

import menuIcn from "../Assets/Icons/dots.png";
import closeIcn from "../Assets/Icons/close.png";
import { useEffect, useState } from "react";
import { collection, deleteDoc, doc, onSnapshot } from "firebase/firestore";
import { db } from "../Services/Firebase/firebaseConfig";
import { ReturnFormattedDate, HandleColor } from "../Services/Functions";
import { Title } from "../Components/Components";
import { UpdatePopUp } from "../Components/PopUp";

function ViewJobs() {

    const [jobs, setJobs] = useState([]);
    const [job, setJob] = useState(null);
    const [popupStatus, setPopupStatus] = useState(false);
    const [menuStatus, setMenuStatus] = useState(false);
    const [updateJobStatus, setUpdateJobStatus] = useState(false);

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
                // console.log(jbs);
                const sortedData = jbs.sort((a, b) => new Date(b.jobCreated) - new Date(a.jobCreated));
                setJobs(sortedData);
                setJob(sortedData[0]);
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

    function handleMenu(type) {
        const menu = document.getElementById("menuOpt");
        switch (type) {
            case "open":
                setMenuStatus(true);
                menu.style.display = "flex";
                break;
            default:
                setMenuStatus(false);
                menu.style.display = "none";
                break;
        }

    }

    async function handleJob(type, id) {
        const menu = document.getElementById("menuOpt");

        switch (type) {
            case "update":
                console.log("update");
                setMenuStatus(false);
                menu.style.display = "none";
                setUpdateJobStatus(true);
                break;

            case "delete":
                await deleteDoc(doc(db, "jobs", id)).then(() => {
                    setMenuStatus(false);
                    menu.style.display = "none";
                    setPopupStatus(false)
                })
                break;
            default:
                setMenuStatus(false);
                menu.style.display = "none";
                setPopupStatus(false)
                break;
        }
    }

    return (
        <div className="view-jobs">
            <div className="add-jobs-wrap">
                <SideNav />

                <div className="add-right">
                    <Header title={"View Jobs"} text={"See all the jobs added."} />
                    <div id="title">
                        <Title title={"View Jobs"} text={"See all the jobs added."} />
                    </div>
                    <div className="right-wrap">

                        <div className="jobs-cards">

                            {jobs.map((job, index) => (
                                <div key={index} className="job-card">
                                    <div className="card-wrap">
                                        <div className="title-wrap">
                                            <h3>{job.jobTitle}</h3>
                                            <p style={{ backgroundColor: `${HandleColor(job.jobLocation)}` }}>{job.jobLocation}</p>
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
                                    {updateJobStatus
                                        ?
                                        <div className="up-pop-up-box">
                                            <button className="closeBtn" onClick={() => setUpdateJobStatus(false)}><img id="menuIcon" src={closeIcn} alt="" /></button>
                                            <UpdatePopUp job={job} setUpdateJobStatus={setUpdateJobStatus} setMenuStatus={setMenuStatus} setPopupStatus={setPopupStatus} />
                                        </div>
                                        :
                                        <div className="pop-up-box">


                                            <>
                                                {!menuStatus ?
                                                    <button className="menuBTN" onClick={() => handleMenu("open")}><img id="menuIcon" src={menuIcn} alt="" /></button>
                                                    :
                                                    <button className="closeBtn" onClick={() => handleMenu("close")}><img id="menuIcon" src={closeIcn} alt="" /></button>
                                                }
                                            </>

                                            <div className="menu-option" id="menuOpt">
                                                <button onClick={() => handleJob("update", job.id)}>Edit</button>
                                                <button onClick={() => handleJob("delete", job.id)}>Delete</button>
                                                <button onClick={() => handleJob("close", "")}>Close</button>
                                            </div>

                                            <div className="popup-wrap">



                                                <>
                                                    <div className="title-wrap">
                                                        <h3>{job.jobTitle}</h3>
                                                        <p style={{ backgroundColor: `${HandleColor(job.jobLocation)}` }}>{job.jobLocation}</p>
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
                                                            <img src={timeIcn} alt="" />
                                                            <h4>{job.jobTiming}</h4>
                                                        </div>
                                                    </div>

                                                    <div className="content-wrap">
                                                        <div className="location">
                                                            <img src={moneyIcn} alt="" />
                                                            <h4>R{job.jobSalary}.<span>00</span></h4>
                                                        </div>
                                                    </div>

                                                    <div className="job-descrip">
                                                        <h4>Job Description</h4>
                                                        <p>{job.jobDescription}</p>
                                                    </div>
                                                </>

                                            </div>
                                        </div>
                                    }
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