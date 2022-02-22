import http from "../http-common";
import authHeader from "./auth-header";

class UserDataService{
    getAll(){
        return http.get("/user");
    }

    get(id){
        return http.get(`/user/${id}`, { headers: authHeader() });
    }

    create(username, firstName, lastName, email, password){
        return http.post("/user/createuser", {username, firstName, lastName, email, password});
    }

    update(id, data){
        return http.put(`/user/edit/${id}`, data);
    }

    delete(id){
        return http.delete(`/user/delete/${id}`);
    }

    deleteAll(){
        return http.delete(`/user`)
    }

    findByUsername(username){
        return http.get(`/users/?username=${username}`);
    }

    login(username, password){
        return http.post("/", {
            username, 
            password,
        })
        .then((response) => {
            if(response.data.accessToken){
                localStorage.setItem("user", JSON.stringify(response.data));
            }

            return response.data;
        });
    }

    logout(){
        localStorage.removeItem("user");
    }


}

export default new UserDataService();