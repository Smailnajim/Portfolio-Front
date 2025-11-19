import { Link } from "react-router-dom";
import iCan from "../middleware/iCan";
import { useContext } from "react";
import AuthContext from "../context/authContext";

export default function Navbar(){
    const {user, logout} = useContext(AuthContext);

    return(
        <nav className="bg-gray-800 text-white p-4">
            <div className="flex gap-6">
                <Link to="/profiles" className="hover:text-gray-300">Profiles</Link>
                { user ?  (<button onClick={logout}>Logout</button> ):( <Link to="/profiles/auth" className="hover:text-gray-300">Auth</Link>)}
                { iCan() && <Link to="/admin" className="hover:text-gray-300">Admin</Link>}
            </div>
        </nav>
    );
} 
