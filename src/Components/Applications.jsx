
import { FormatPhoneNumber, HandleColor, ReturnFormattedDate } from "../Services/Functions";

import locationIcn from "../Assets/Icons/location.png";
import calenderIcn from "../Assets/Icons/calendar.png";
import moneyIcn from "../Assets/Icons/money.png";
import timeIcn from "../Assets/Icons/clock.png";
import { useCallback, useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../Services/Firebase/firebaseConfig";
import { ShortTitle } from "./Components";

export const Applicants = (props) => {
    const job = props.job;

    const [users, setUsers] = useState([]);

    const fetchUsers = useCallback(async () => {
        let usrs = [];

        for (const doc of job.docs) {
            const usr = await getUser(doc.userId, doc.applyDate);
            if (usr !== null) {
                usrs.push(usr);
            }
        }
        const sortedData = usrs.sort((a, b) => new Date(a.date) - new Date(b.date));
        setUsers(sortedData);
    }, [job])

    async function getUser(id, date) {
        let userDoc = null;
        const docRef = doc(db, "users", id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            userDoc = { id: docSnap.id, ...docSnap.data(), date: date };
        }

        return userDoc;
    }

    useEffect(() => {
        fetchUsers();
    }, [fetchUsers])

    return (
        <div className="pop-up-box">

            <button className="close-pop" onClick={() => props.setJob(null)}>Close</button>

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

                    <div className="app-users">
                        <ShortTitle title={"Applied Users"} text={"All Users that applied for this job"} />

                        <div className="user-cards">
                            {users.map((user, index) => (
                                <div className="user-card" key={index}>
                                    <div className="user-num">
                                        <h2>{index + 1 < 10 ? `0${index + 1}` : `${index + 1}`}</h2>
                                    </div>
                                    <div className="user-wrap">
                                        <h4>Full Name:</h4>
                                        <p>{`${user.firstName} ${user.lastName}`}</p>
                                    </div>
                                    <div className="user-wrap">
                                        <h4>Email Address:</h4>
                                        <p>{user.emailAddress}</p>
                                    </div>
                                    <div className="user-wrap">
                                        <h4>Phone Number:</h4>
                                        <p>{FormatPhoneNumber(user.phoneNum)}</p>
                                    </div>
                                    <div className="user-doc">
                                        {/* <button>Download CV</button> */}
                                        <button><a href={user.doc.docUrl} download target="__blank">View CV</a></button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                </>

            </div>
        </div>
    );
}