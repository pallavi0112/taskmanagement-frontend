import jwtDecode from 'jwt-decode';

const IsTokenExpired = (token) => {
    if (!token) return true;
    const decodedToken = jwtDecode(token);
    const currentTime = Date.now() / 1000;
    if(decodedToken.exp < currentTime){
        localStorage.setItem('isloggedIn' , false)
        return true ;
    }
    // return decodedToken.exp < currentTime;
};

export default IsTokenExpired;