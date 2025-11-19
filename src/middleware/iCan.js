import { jwtDecode } from "jwt-decode";

export default function iCan(){
    const access = localStorage.getItem('accessToken');
    if(!access) return false;

    const user = jwtDecode(access);
    //console.log('decoded\n', user.email);
    return user.role === "admin" ? true: false;
}