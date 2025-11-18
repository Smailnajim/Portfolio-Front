import Redirect from "../util/Redirect";

export default function ProtectedRoute({children, middlewares = []}){
    console.log("middlewares", middlewares);

    // middlewares.forEach((middleware)=>{
    //     middleware();
    // })
    const resulta = middlewares.map((middleware)=>middleware());
    console.log(resulta);
    console.log(resulta.includes(false));
    if(resulta.includes(false)) return Redirect('/profiles');
    return children;
}