
export default function useIsAuth(){
    const access = localStorage.getItem('accessToken');
    return access ? true:false;
}