import { useContext, useEffect, useState } from "react";
import useLogin from "../hooks/useLogin";
import AuthContext from "../context/authContext";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isloading, changeLaoding] = useState("Login");
    const [isError, setError] = useState("");

    const {user, setUser} = useContext(AuthContext);
    const navigate = useNavigate()

    const {Login, loading, error, data} = useLogin();
    //console.log('*-*-*-*-*-*-:', {Login, loading, error, data});
    const HandleSubmit = async (e) => {
        e.preventDefault();
        console.log("HandleSubmit ---------------");
        console.log({ email, password });
        try {
            changeLaoding("wait...");
            if(error) throw new Error('you are alredy loged in!');
            await Login({
                variables:{
                    input:{
                        email: email,
                        password: password
                    }
                }
            });
        } catch (error) {
            changeLaoding("Login");
            setError(error.message);
        }

        // if (loading) changeLaoding("wait...");
        // if(error) setError(error.message);
    };

    useEffect(()=>{
        console.log('*data*******', data);
        if(data?.login?.accessToken){
            localStorage.setItem('accessToken', data.login.accessToken);
            
            console.log("1eeeeeeeeeeeeeee",data.login.accessToken);
            setUser(jwtDecode(data.login.accessToken));
            console.log('uuuuuuuuuuuuuuuu')



            navigate("/profiles")
        }
    }, [data, setUser, navigate]);

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-md">
                <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Login</h2>
                
                <form onSubmit={HandleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-gray-700 text-sm font-medium mb-2">
                            Email
                        </label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>
                    
                    <div>
                        <label className="block text-gray-700 text-sm font-medium mb-2">
                            Password
                        </label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>
                    
                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        {isloading}
                    </button>
                    <div>{isError}</div>
                </form>
            </div>
        </div>
    );
}