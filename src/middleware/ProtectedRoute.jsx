import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function ProtectedRoute({children, middlewares = []}){
    const NavigateFunction = useNavigate();
    console.log("middlewares", middlewares);

    const resulta = middlewares.map((middleware)=>middleware());

    console.log(resulta);
    console.log(resulta.includes(false));

    useEffect(()=>{
        if(resulta.includes(false)) NavigateFunction('/profiles', {replace: true});
    }, [resulta, NavigateFunction])

    return children;
}