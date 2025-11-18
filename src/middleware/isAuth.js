
export default function isAuth(){
    const access = localStorage.getItem('accessToken');
    return access ? true:false;
}