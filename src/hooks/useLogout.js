export default function useLogout(){
    console.log('accessToken in use Logout', localStorage.getItem('accessToken'));
    if(localStorage.getItem('accessToken')) return false;
    localStorage.removeItem('accessToken');
    return true;
}