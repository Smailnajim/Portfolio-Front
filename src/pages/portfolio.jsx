import { useParams } from "react-router-dom";


export default function Portfolio(){
    const {id} = useParams();
    return(
        <div>
            <h1>Portfolio Page {id}</h1>
        </div>
    )
}