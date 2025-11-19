import { useCallback, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import AuthContext from "../context/authContext";


export default function AuthProvider({children}) {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem("accessToken");
        if(!token) return;
        setUser(jwtDecode(token));
    }, []);

    const logout = useCallback(() => {
        localStorage.removeItem("accessToken");
        setUser(null);
    }, []);


    return (
        <AuthContext.Provider value={{user, setUser, logout}}>
            {children}
        </AuthContext.Provider>
    );
} 
