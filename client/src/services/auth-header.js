// this method will check local storage for user
// item and if there is a logged in user with
// accessToken return the http authorization header
// else return an empty object

export default function authHeader(){
    const user = JSON.parse(localStorage.getItem('user'));
    if(user && user.accessToken){
        return { 'x-access-token': user.accessToken };
    } else {
        return {};
    }
}