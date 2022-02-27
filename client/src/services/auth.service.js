import http from "../http-common";

class AuthService {
    login(username, password){
        return http.post("/user/login", {
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

    create(username, firstName, lastName, email, password){
        return http.post("/user/signup", {username, firstName, lastName, email, password});
    }

}

export default new AuthService();