export default function useLogout(){
    console.log('accessToken in use Logout', localStorage.getItem('accessToken'));
    localStorage.removeItem('accessToken');
    return true;
}