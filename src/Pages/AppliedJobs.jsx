import { Title } from "../Components/Components";
import SideNav from "../Components/SideNav";
import { Header } from "../Components/Header";

function AppliedJobs() {
    

    return (
        <div className="dashboard">
            <div className="dashboard-wrap">
                <SideNav />

                <div className="add-right">
                    <Header title={"Applied Jobs"} text={"Job applications from users."} />
                    <div id="title">
                        <Title title={"Applied Jobs"} text={"Job applications from users."} />
                    </div>

                    <div className="right-wrap">
                        
                    </div>

                </div>

            </div>
        </div>
    );
}

export default AppliedJobs;