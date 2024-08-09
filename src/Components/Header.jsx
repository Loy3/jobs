import { FormattedDate } from "../Services/Functions";
import { Title } from "./Components";

export const Header = (props) => {
    const formattedDate = FormattedDate();
    return (
        <div className="header">
            <div className="header-wrap">
                <div className="head-loc">
                    <Title title={props.title} text={props.text} />
                </div>
                <div className="head-left">
                    <h3>Welcome, Admin</h3>
                    <p>{formattedDate}</p>
                </div>

                <div className="head-right">
                    <h1>A</h1>
                </div>
            </div>
        </div>
    );
}