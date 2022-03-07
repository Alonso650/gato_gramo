import axios from "axios";
import authHeader from "./auth-header";
const API_URL = "http://localhost:8080";

class UserDataService{
    getPublicContent(){
        return axios.get(API_URL + "/user/test/all");
    };
    
    getUserBoard(){
        return axios.get(API_URL + "/user/test/user", { headers: authHeader() });
    };
    
    getAdminBoard(){
        return axios.get(API_URL + "/user/test/admin", { headers: authHeader() });
    };
}


export default new UserDataService();


// import http from "../http-common";
// import authHeader from "./auth-header";

// class UserDataService{
//     getAll(){
//         return http.get("/user/allUsers");
//     }
    
//     get(id){
//         return http.get(`/user/${id}`)
//     }
    
//     update(id, data){
//         return http.put(`/user/edit/${id}`, data);
//     }

//     delete(id){
//         return http.delete(`/user/delete/${id}`);
//     }

//     deleteAll(){
//         return http.delete(`/user`)
//     }

//     findByUsername(username){
//         return http.get(`/users/?username=${username}`);
//     }
// }

// export default new UserDataService();