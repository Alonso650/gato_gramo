import axios from "axios";
const API_URL = "http://localhost:8080";

class GramDataService{
    // createGram(title, description){
    //     return axios.post(API_URL + "/grams/createGram", {
    //         title,
    //         description,
    //     });
    // };
    createGram(data){
        return axios.post(API_URL + "/grams/createGram",{
            data
        });
    };

    getGram(id){
        return axios.get(API_URL + `/grams/${id}`);
    }


}

export default new GramDataService();