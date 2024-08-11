import { useEffect, useState } from "react";
import { db } from "../Services/Firebase/firebaseConfig";
import { doc, updateDoc } from "firebase/firestore";

export const UpdatePopUp = (props) => {
    const [jobTitle, setJobTitle] = useState("");
    const [jobAddress, setJobAddress] = useState("");
    const [jobSalary, setJobSalary] = useState("");
    const [jobType, setJobType] = useState("");
    const [jobTiming, setJobTiming] = useState("");
    const [jobPeriod, setJobPeriod] = useState("");
    const [jobLocation, setJobLocation] = useState("");
    const [jobClosingDate, setJobClosingDate] = useState("");
    const [jobDescription, setJobDescription] = useState("");

    const [minDate, setMinDate] = useState("");

    useEffect(() => {
        const today = new Date();
        const year = today.getFullYear();
        let month = today.getMonth() + 1;
        if (month < 10) {
            month = '0' + month;
        }
        let day = today.getDate();
        if (day < 10) {
            day = '0' + day;
        }
        const formattedDate = year + '-' + month + '-' + day;
        setMinDate(formattedDate);
    }, [])

    async function handleUpdate() {
        const docId = props.job.id;
        const menu = document.getElementById("menuOpt");

        let newJbTitle = jobTitle;
        let newjobAddress = jobAddress;
        let newjobSalary = jobSalary;
        let newjobType = jobType;
        let newjobTiming = jobTiming;
        let newjobPeriod = jobPeriod;
        let newjobLocation = jobLocation;
        let newjobClosingDate = jobClosingDate;
        let newjobDescription = jobDescription;


        if (!newJbTitle) {
            newJbTitle = props.job.jobTitle;
        }

        if (!newjobAddress) {
            newjobAddress = props.job.jobAddress;
        }
        if (!newjobSalary) {
            newjobSalary = props.job.jobSalary;
        }
        if (!newjobType) {
            newjobType = props.job.jobType;
        }
        if (!newjobTiming) {
            newjobTiming = props.job.jobTiming;
        }
        if (!newjobPeriod) {
            newjobPeriod = props.job.jobPeriod;
        }
        if (!newjobLocation) {
            newjobLocation = props.job.jobLocation;
        }
        if (!newjobClosingDate) {
            newjobClosingDate = props.job.jobClosingDate;
        }
        if (!newjobDescription) {
            newjobDescription = props.job.jobDescription;
        }

        const updateJob = {
            jobTitle: newJbTitle,
            jobAddress: newjobAddress,
            jobSalary: newjobSalary,
            jobType: newjobType,
            jobTiming: newjobTiming,
            jobPeriod: newjobPeriod,
            jobLocation: newjobLocation,
            jobClosingDate: newjobClosingDate,
            jobDescription: newjobDescription

        }
        // console.log(newJbTitle, "-", newjobAddress, "-", newjobSalary, "-", newjobType, "-", 
        //     newjobTiming, "-", newjobPeriod, "-", newjobLocation, "-", newjobClosingDate, "-", newjobDescription);

        const docRef = doc(db, "jobs", docId);

        try {
            await updateDoc(docRef, updateJob).then(() => {
                props.setUpdateJobStatus(false);
                props.setMenuStatus(false);                
                props.setPopupStatus(false)
                menu.style.display = "none";
            })


        } catch (error) {
            console.log('bad');
        }

    }
    return (
        <div className="update-wrap">
            <div className="form">
                <div className="form-head">
                    <h2>Update Job</h2>
                    <p>Update for job: {props.job.jobTitle}.</p>
                </div>
                <div className="form-short-wrap">
                    <div className="form-short">
                        <h4>Job Title:</h4>
                        <input type="text" placeholder={props.job.jobTitle} onChange={(e) => setJobTitle(e.target.value)} />
                    </div>
                    <div className="form-short">
                        <h4>Job Physical Address:</h4>
                        <input type="text" placeholder={props.job.jobAddress} onChange={(e) => setJobAddress(e.target.value)} />
                    </div>
                </div>
                <br />

                <div className="form-short-wrap">
                    <div className="form-short">
                        <h4>Salary Expectation:</h4>
                        <input type="number" placeholder={`Salary: R${props.job.jobSalary}.00`} onChange={(e) => setJobSalary(e.target.value)} />
                    </div>
                    <div className="form-short">
                        <h4>Closing Date:</h4>
                        <input type="date" min={`${minDate}`} max="2030-12-31" placeholder="Closing Date" onChange={(e) => setJobClosingDate(e.target.value)} />
                    </div>
                </div>
                <br />

                <div className="form-short-wrap">
                    <div className="form-short">
                        <h4>Field:</h4>
                        <select onChange={(e) => setJobType(e.target.value)}>
                            <option hidden={true} >
                                Select Type
                            </option>
                            <option value={"Accounting"}>Accounting</option>
                            <option value={"Business"}>Business</option>
                            <option value={"Design"}>Design</option>
                            <option value={"Education"}>Education</option>
                            <option value={"Engineering"}>Engineering</option>
                            <option value={"Healt & Safety"}>Healt & Safety</option>
                            <option value={"Hospitality"}>Hospitality</option>
                            <option value={"Information Technology"}>Information Technology</option>
                            <option value={"Law"}>Law</option>
                            <option value={"Military"}>Military</option>
                            <option value={"Retail"}>Retail</option>
                            <option value={"Sport"}>Sport</option>
                        </select>
                    </div>
                    <div className="form-short">
                        <h4>Period:</h4>
                        <select onChange={(e) => setJobPeriod(e.target.value)}>
                            <option hidden={true} >
                                Select term
                            </option>
                            <option value={"Internship"}>Internship</option>
                            <option value={"Fixed term"}>Fixed term</option>
                            <option value={"Permanent"}>Permanent</option>

                        </select>
                    </div>
                </div>

                <div className="form-short-wrap">
                    <div className="form-short">
                        <h4>Working Hours:</h4>
                        <select onChange={(e) => setJobTiming(e.target.value)}>
                            <option hidden={true} >
                                Select Hours
                            </option>
                            <option value={"Full Time"}>Full Time</option>
                            <option value={"Part Time"}>Part Time</option>
                        </select>
                    </div>
                    <div className="form-short">
                        <h4> Work Setup</h4>
                        <select onChange={(e) => setJobLocation(e.target.value)}>
                            <option hidden={true} >
                                Select Work Setup
                            </option>
                            <option value={"Hybrid"}>Hybrid</option>
                            <option value={"Onsite"}>Onsite</option>
                            <option value={"Remote"}>Remote</option>

                        </select>
                    </div>
                </div>
                <br />

                <div className="form-long">
                    <h4>Job Description:</h4>
                    <textarea name="" id="" placeholder={props.job.jobDescription} onChange={(e) => setJobDescription(e.target.value)} />
                </div>
                <br />
                <button onClick={handleUpdate}>Update</button>
            </div>
        </div>
    );
}