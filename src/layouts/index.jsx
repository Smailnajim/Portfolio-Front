import { Outlet } from "react-router-dom";
import Navbar from "../components/navbar";

export default function Index(){
    return (
        <nav className="">
            <Navbar />
            <main className="">
                <Outlet />
            </main>
        </nav>
    );
}