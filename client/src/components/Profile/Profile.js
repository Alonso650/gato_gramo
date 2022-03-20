import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from 'react-router-dom';



const Profile = () => {
    let { id } = useParams();

    let navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [listOfGrams, setListOfGrams] = useState([]);

    useEffect(() => {
        axios.get(`http://localhost:8080/user/${id}`).then((response) => {
            setUsername(response.data.username);
        });

        axios.get(`http://localhost:8080/grams/byuserId/${id}`).then((response) => {
            setListOfGrams(response.data);
        });
    }, []);
    

    return(
        <div className="profilePageContainer">
            <div className="basicInfo">
                <h1>Username: {username}</h1>
            </div>
            <div className="listOfGrams">
                {listOfGrams.map((value, key) => {
                    return(
                        <div key={key} className="gram">
                            <div classname="title">{value.title}</div>
                        <div
                           className="body"
                           onClick={() => {
                               navigate(`/gram/${value.id}`);
                           }}
                        >
                            {value.description}
                        </div>
                    <div className="footer">
                        <div className="username">{value.username}</div>
                    </div>
                </div>
                    );
                })}
            </div>
        </div>
    );
};

export default Profile;