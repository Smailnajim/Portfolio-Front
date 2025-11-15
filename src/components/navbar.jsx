import { Link } from "react-router-dom";

export default function Navbar(){
    return(
        <nav className="bg-gray-800 text-white p-4">
            <div className="flex gap-6">
                <Link to="/profiles" className="hover:text-gray-300">Profiles</Link>
                <Link to="/users/auth" className="hover:text-gray-300">auth</Link>
            </div>
        </nav>
    );
} 