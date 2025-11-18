import { useNavigate } from "react-router-dom";

export default function useLogout(){
    localStorage.removeItem('accessToken');
    const NavigateFunction = useNavigate()
    NavigateFunction('/profiles');
}