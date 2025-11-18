import useICan from "../hooks/useICan";
import { useNavigate } from "react-router-dom";

export default function useRedirect(){
    const navigate = useNavigate();
    if(!useICan()) {
        navigate('/not-exist');
    }
}