import React, {useContext} from "react";
import NavBar from "../NavBar/NavBar";
import axios from "axios";
import { useState, useEffect } from "react";
import {useNavigate} from "react-router"
import { Link } from "react-router-dom";
import { AuthContext } from "../../helpers/AuthContext";



const IndexPage = () => {
    const [listOfGrams, setListOfGrams] = useState([]);
    let navigate = useNavigate();
    const {authState} = useContext(AuthContext);

    useEffect(() => {
        if(!localStorage.getItem("accessToken")){
            navigate("/login");
        }else{
            axios.get("http://localhost:8080/grams",{
                headers: { accessToken: localStorage.getItem("accessToken") },
            })
            .then((response) => {
                setListOfGrams(response.data.listOfGrams);
            })
        };
     }, []);
    return(
        <div>
            {/* {listOfGrams.map((value, key) => {
                // return(
                //     <div className="gram" onClick={() => navigate(`/gram/${value.id}`)}>
                //         <div className="title">{value.title} </div>
                //         <div className="description">{value.description}</div>
                //         <div className="footer">{value.username}</div>
                //     </div>
                // ) 
                return(
                    <div key={key} className="gram">
                        <div className="title">{value.title}</div>
                        <div
                           className="body"
                           onClick={() => {navigate(`/gram/${value.id}`);
                        }}
                        >
                            {value.description}
                        </div>
                        <div className="footer">
                            <div className="username">
                                <Link to={`/profile/${value.userId}`}>{value.username}</Link>
                            </div>
                        </div>
                    </div>
                );
            })} */}
            <h1>list of grams</h1>
        </div>
    );
};

export default IndexPage;