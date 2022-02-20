// the authenticate service will use axios
// for http requests and local storage for user info
// and jwt.

import http from "../http-common.js";

const register = (username, email, password) => {
    return http.post("/create", {
       username,
       email,
       password,
    });
};


const login = (username, password) => {
    return http.post("/signin", {
        username,
        password,
    })
    .then((response) => {
        if (response.data.accessToken){
            localStorage.setItem("user", JSON.stringify(response.data));
        }

        return response.data;
    });
};

const logout = () => {
    localStorage.removeItem("user");
};

const getCurrentUser = () => {
    return JSON.parse(localStorage.getItem("user"));
};

export default{
    register,
    login,
    logout,
    getCurrentUser,
};
