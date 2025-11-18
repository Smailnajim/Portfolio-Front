import { Link } from "react-router-dom";
import useICan from "../hooks/useICan";
import useIsAuth from "../hooks/useIsAuth";

export default function Navbar(){
    return(
        <nav className="bg-gray-800 text-white p-4">
            <div className="flex gap-6">
                <Link to="/profiles" className="hover:text-gray-300">Profiles</Link>
                { useIsAuth() ?  <Link to="/logout">Logout</Link>: <Link to="/profiles/auth" className="hover:text-gray-300">Auth</Link>}
                { useICan() && <Link to="/admin" className="hover:text-gray-300">Admin</Link>}
            </div>
        </nav>
    );
} 
