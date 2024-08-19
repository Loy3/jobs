import { Title } from "../Components/Components";
import SideNav from "../Components/SideNav";
import { Header } from "../Components/Header";
import { collection, doc, onSnapshot, getDocs } from "firebase/firestore";
import { db } from "../Services/Firebase/firebaseConfig";
import { useCallback, useEffect, useState } from "react";
import { Applicants } from "../Components/Applications";
import locationIcn from "../Assets/Icons/location.png";
import calenderIcn from "../Assets/Icons/calendar.png";
import moneyIcn from "../Assets/Icons/money.png";
import { HandleColor, ReturnFormattedDate } from "../Services/Functions";

function AppliedJobs() {
    const [jobs, setJobs] = useState([]);
    const [job, setJob] = useState(null);
    const fetchData = useCallback(() => {
        const collectionRef = collection(db, 'jobs');
        onSnapshot(collectionRef, async (snapshot) => {
            if (snapshot) {
                const jbs = [];

                for (const doc of snapshot.docs) {
                    const docs = await checkForCollection(doc.id);
                    if (docs.length > 0) {
                        // console.log("docs",docs);

                        jbs.push({ id: doc.id, ...doc.data(), docs: [...docs] });
                    }
                }
                const sortedData = jbs.sort((a, b) => new Date(b.jobCreated) - new Date(a.jobCreated));
                setJobs(sortedData);
                // setJob(sortedData[0])
                // console.log(sortedData[0].docs);
            } else {
            }
        });

    }, [])

    async function checkForCollection(docId) {
        const docRef = doc(db, "jobs", docId);
        const subcollectionRef = collection(docRef, "applications");
        // let status = false;
        let appDocs = []
        try {
            const querySnapshot = await getDocs(subcollectionRef);
            const subcollectionExists = !querySnapshot.empty;
            if (subcollectionExists) {
                // status = true;
                querySnapshot.docs.forEach(doc => {
                    appDocs.push({ id: doc.id, ...doc.data() });
                });
            } else {
                // status = false;
            }
        } catch (error) {
            console.error("Error checking subcollection:", error);
        }

        return appDocs;
    }

    useEffect(() => {
        fetchData();
    }, [fetchData])

    return (
        <div className="dashboard" id="apply">
            <div className="dashboard-wrap">
                <SideNav />

                <div className="add-right">
                    <Header title={"Applied Jobs"} text={"Job applications from users."} />
                    <div id="title">
                        <Title title={"Applied Jobs"} text={"Job applications from users."} />
                    </div>

                    <div className="right-wrap">
                        {job === null ?
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
                                            <button onClick={() => setJob(job)}>Applicants</button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            :
                            <>
                                <Applicants job={job} setJob={setJob} />
                            </>
                        }
                    </div>
                </div>

            </div>
        </div>
    );
}

export default AppliedJobs;