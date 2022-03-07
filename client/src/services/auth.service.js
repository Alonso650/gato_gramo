// import http from "../http-common";
import axios from "axios";
const API_URL = "http://localhost:8080";

class AuthService{
    create(username, firstName, lastName, email, password){
        return axios.post(API_URL + "/user/signup", {
            username,
            firstName,
            lastName,
            email,
            password,
        });
    };

    login(username, password){
        return axios
            .post(API_URL + "/user/login",{
                username,
                password,
            })
            .then((response) => {
                if(response.data.accessToken){
                    localStorage.setItem("user", JSON.stringify(response.data));
                }
                return response.data;
            });
    };
    
    logout(){
        localStorage.removeItem("user");
    };
    
    getCurrentUser(){
        return JSON.parse(localStorage.getItem("user"));
    };
}


export default new AuthService();
// class AuthService {
//     login(username, password){
//         return http.post("/user/login", {
//             username, 
//             password,
//         })
//         // .then((response) => {
//         //     if(response.data.accessToken){
//         //         // storing the form input data in the browser storage
//         //         localStorage.setItem("user", JSON.stringify(response.data));
//         //     }

//         //     return response.data;
//         // });
//     }

//     logout(){
//         /*
//          localStorage is one of the two mechanisms of a browsers
//          web storage allowing users to save data as key-value pairs in the browser
//          for later us
//         */
//         localStorage.removeItem("user");
//     }

//     create(username, firstName, lastName, email, password){
//         return http.post("/user/signup", {username, firstName, lastName, email, password});
//     }

// }

// export default new AuthService();