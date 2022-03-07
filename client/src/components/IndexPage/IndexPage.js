import React from "react";
import NavBar from "../NavBar/NavBar";

import { useState, useEffect } from "react";
import UserDataService from "../../services/user.service";
import { useParams } from "react-router-dom";


const IndexPage = () => {
    const [content, setContent] = useState("");
    useEffect(() => {
        UserDataService.getPublicContent().then(
            (response) =>{
                setContent(response.data);
            },
            (error) =>{
                const _content =
                  (error.response && error.response.data) ||
                  error.message ||
                  error.toString();
                setContent(_content);
            }
        );
    }, []);
    
    return(
       <div className="container">
           <header className="jumbotron">
               <NavBar/>
               <h3>{content}</h3>
           </header>
       </div>
    );
};

export default IndexPage;