import { useContext } from "react";
import Profiles from "../components/Profiles";
import AuthContext from "../context/authContext";

export default function ProfilesPage(){
    const {user} = useContext(AuthContext);
    //console.log(user);
    return(
        <div className="flex items-center justify-center h-full">
            <Profiles />
        </div>
    )
}