import { Link } from "react-router-dom";

export default function Navbar(){
    return(
        <nav>
            <Link to="/profiles">profiles</Link>
            <Link to="/test">test</Link>
        </nav>
    );
} 