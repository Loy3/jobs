import { useEffect, useState } from "react";
import { FormattedDate } from "../Services/Functions";
import SideNav from "../Components/SideNav";
import { Header } from "../Components/Header";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../Services/Firebase/firebaseConfig";
// import { useNavigate } from "react-router-dom";

function AddJob() {
    // const navigate = useNavigate();
    const formattedDate = FormattedDate();
    const [minDate, setMinDate] = useState("");

    const [jobTitle, setJobTitle] = useState("");
    const [jobAddress, setJobAddress] = useState("");
    const [jobSalary, setJobSalary] = useState("");
    const [jobType, setJobType] = useState("");
    const [jobTiming, setJobTiming] = useState("");
    const [jobPeriod, setJobPeriod] = useState("");
    const [jobLocation, setJobLocation] = useState("");
    const [jobClosingDate, setJobClosingDate] = useState("");
    const [jobDescription, setJobDescription] = useState("");

    const [jobTitleErr, setJobTitleErr] = useState("");
    const [jobAddressErr, setJobAddressErr] = useState("");
    const [jobSalaryErr, setJobSalaryErr] = useState("");
    const [jobTypeErr, setJobTypeErr] = useState("");
    const [jobTimingErr, setJobTimingErr] = useState("");
    const [jobPeriodErr, setJobPeriodErr] = useState("");
    const [jobLocationErr, setJobLocationErr] = useState("");
    const [jobClosingDateErr, setJobClosingDateErr] = useState("");
    const [jobDescriptionErr, setJobDescriptionErr] = useState("");

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

    function handleSubmition() {
        setJobTitleErr("");
        setJobAddressErr("");
        setJobSalaryErr("");
        setJobClosingDateErr("");
        setJobTypeErr("");
        setJobPeriodErr("");
        setJobTimingErr("");
        setJobLocationErr("");
        setJobDescriptionErr("");


        if (jobTitle && jobAddress && jobSalary && jobType && jobTiming && jobPeriod && jobLocation && jobClosingDate && jobDescription) {
          
            addDoc(collection(db, 'jobs'), {
                jobTitle: jobTitle,
                jobAddress: jobAddress,
                jobSalary: jobSalary,
                jobType: jobType,
                jobTiming: jobTiming,
                jobPeriod: jobPeriod,
                jobLocation: jobLocation,
                jobClosingDate: jobClosingDate,
                jobDescription: jobDescription,
                jobCreated: formattedDate

            })
                // navigate("/jobs");
                alert("Job Added.")
        } else {
            if (!jobTitle) {
                setJobTitleErr("Job title required.");
                return;
            }

            if (!jobAddress) {
                setJobAddressErr("Job physical address required.");
                return;
            }

            if (!jobSalary) {
                setJobSalaryErr("Salary expectation required, if there's none add '0'.");
                return;
            }

            if (!jobClosingDate) {
                setJobClosingDateErr("Job closing date required.");
                return;
            }

            if (!jobType) {
                setJobTypeErr("Job field required.");
                return;
            }

            if (!jobPeriod) {
                setJobPeriodErr("Job period required.");
                return;
            }

            if (!jobTiming) {
                setJobTimingErr("Job working hours required.");
                return;
            }


            if (!jobLocation) {
                setJobLocationErr("Job work setup required.");
                return;
            }

            if (!jobDescription) {
                setJobDescriptionErr("Job description required.");
                return;
            }
        }


    }

    return (
        <div className="add-job">
            <div className="add-jobs-wrap">
                <SideNav />

                <div className="add-right">
                    <Header title={"Add Job"} text={"Complete the form below."} />

                    <div className="right-wrap">
                        <div className="form">
                            <div className="form-head">
                                <h2>Job Description:</h2>
                                <p>Provide the job details below.</p>
                            </div>
                            <div className="form-short-wrap">
                                <div className="form-short">
                                    <h4>Job Title:</h4>
                                    <input type="text" placeholder="Enter job title:" onChange={(e) => setJobTitle(e.target.value)} />
                                    <p>{jobTitleErr}</p>
                                </div>
                                <div className="form-short">
                                    <h4>Job Physical Address:</h4>
                                    <input type="text" placeholder="Enter job physical address:" onChange={(e) => setJobAddress(e.target.value)} />
                                    <p>{jobAddressErr}</p>
                                </div>
                            </div>
                            <br />

                            <div className="form-short-wrap">
                                <div className="form-short">
                                    <h4>Salary Expectation:</h4>
                                    <input type="number" placeholder="Enter salary per month:" onChange={(e) => setJobSalary(e.target.value)} />
                                    <p>{jobSalaryErr}</p>
                                </div>
                                <div className="form-short">
                                    <h4>Closing Date:</h4>
                                    <input type="date" min={`${minDate}`} max="2030-12-31" placeholder="Closing Date" onChange={(e) => setJobClosingDate(e.target.value)} />
                                    <p>{jobClosingDateErr}</p>
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
                                    <p>{jobTypeErr}</p>
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
                                    <p>{jobPeriodErr}</p>
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
                                    <p>{jobTimingErr}</p>
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
                                    <p>{jobLocationErr}</p>
                                </div>
                            </div>
                            <br />

                            <div className="form-long">
                                <h4>Job Description:</h4>
                                <textarea name="" id="" placeholder="Enter job description" onChange={(e) => setJobDescription(e.target.value)} />
                                <p>{jobDescriptionErr}</p>
                            </div>
                            <br />
                            <button onClick={handleSubmition}>Add</button>
                        </div>

                        <div className="form-content">
                            <div className="form-wrap">
                                <h3>
                                    <span>Title:</span>
                                    <br />
                                    {`${jobTitle}`}
                                </h3>
                                <br />
                                <p>
                                    <span>Physical Address: </span>
                                    <br />
                                    {`${jobAddress}`}
                                </p>
                                <p>
                                    <span>Salary: </span>
                                    <br />
                                    {`${jobSalary}`}
                                </p>
                                <p>
                                    <span>Closing Date: </span>
                                    <br />
                                    {`${jobClosingDate}`}
                                </p>
                                <p>
                                    <span>Field: </span>
                                    <br />
                                    {`${jobType}`}
                                </p>
                                <p>
                                    <span>Period: </span>
                                    <br />
                                    {`${jobPeriod}`}
                                </p>
                                <p>
                                    <span>Hours: </span>
                                    <br />
                                    {`${jobTiming}`}
                                </p>
                                <p>
                                    <span>Work Setup: </span>
                                    <br />
                                    {`${jobLocation}`}
                                </p>
                                <br />
                                <p>
                                    <span>Description:</span>
                                    <br />
                                    {jobDescription}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


        </div>
    );
}

export default AddJob;