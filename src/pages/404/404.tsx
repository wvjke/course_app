import Error from "../../components/error/Error";
import { useNavigate } from "react-router-dom";
import "./404.scss";

const PageNotFound = () => {
    const navigate = useNavigate();
    return (
        <div className="page-not-found">
            <Error />
            <h1>Error</h1>
            <button onClick={() => navigate(-1)}>Go back</button>
        </div>
    );
};

export default PageNotFound;
