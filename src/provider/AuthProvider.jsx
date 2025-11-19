import { useState } from "react";
import AuthContext from "../context/authContext";


export default function AuthProvider({children}) {
    const [userAuth, setUser] = useState(null);

    return (
        <AuthContext.Provider value={{userAuth, setUser}}>
            {children}
        </AuthContext.Provider>
    );
} 