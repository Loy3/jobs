import { useEffect, useState } from "react";
import { Title } from "../Components/Components";
import { Header } from "../Components/Header";
import SideNav from "../Components/SideNav";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../Services/Firebase/firebaseConfig";
import { FormatPhoneNumber } from "../Services/Functions";

function ViewUsers() {
    const [users, setUsers] = useState([]);

    const fetchData = (async () => {

        // let documents = [];
        const collectionRef = collection(db, 'users');
        onSnapshot(collectionRef, (snapshot) => {
            // console.log(snapshot.data());
            if (snapshot) {
                // console.log(snapshot);
                const usrs = [];
                snapshot.forEach((doc) => {
                    usrs.push({ id: doc.id, ...doc.data() });
                });
                // console.log(usrs);
                const sortedData = usrs.sort((a, b) => new Date(b.jobCreated) - new Date(a.jobCreated));
                setUsers(sortedData);
                // setJob(sortedData[0]);
            } else {
                // setNewAddItem(null);
            }
        });

    })

    useEffect(() => {
        fetchData();
    }, [])
    return (
        <div className="users">
            <div className="add-jobs-wrap">
                <SideNav />

                <div className="add-right">
                    <Header title={"View Users"} text={"See all users who signed up."} />
                    <div id="title">
                        <Title title={"View Users"} text={"See all users who signed up."} />
                    </div>
                    <div className="right-wrap">
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
                </div>
            </div>
        </div>
    );
}

export default ViewUsers;