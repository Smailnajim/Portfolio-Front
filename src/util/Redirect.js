import { useNavigate } from "react-router-dom";

export default function Redirect(where){
    console.log('where', where);

    const navigate = useNavigate();
    navigate(where);
    // navigate(`${where}`);
}