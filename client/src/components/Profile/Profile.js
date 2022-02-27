import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import UserDataService from "../../services/user.service";
import NavBar from "../NavBar/NavBar";


const Profile = (props) => {
    const initialUserState = {
        id: null,
        username: "",
        firstName: "",
        email: "",
        password: "",
    };

    const [currentUser, setCurrentUser] = useState(initialUserState);
    //const [message, setMessage] = useState("");
    const {id} = useParams();
    const getUser = (id) => {
        UserDataService.get(id)
          .then(response => {
              setCurrentUser(response.data);
              console.log(response.data);
          })
          .catch(e => {
              console.log(e);
          });
    };

    useEffect(() => {
        getUser(id);
    }, [id]);
    

    return(
        <div className="container">
            {currentUser ?  ( 
                <div>
            <NavBar />
            <header>
                <h3>
                    <strong>{currentUser.username}</strong> Profile
                </h3>
            </header>
            {/* <p>
                <strong>Token:</strong> {currentUser.accessToken.substring(0,20)} ...{" "}
                {currentUser.accessToken.substr(currentUser.accessToken.length - 20)}
            </p> */}
            <p>
                <strong>Id:</strong> {currentUser.id}
            </p>
            <p>
                <strong>Email:</strong> {currentUser.email}
            </p>
            <p>
                <strong>First Name:</strong> {currentUser.firstName}
                <strong>Last Name: </strong> {currentUser.lastName}
            </p>
            </div>
            ) : (
                <div>

                </div>
            )} 
        </div>
    );
};

export default Profile;