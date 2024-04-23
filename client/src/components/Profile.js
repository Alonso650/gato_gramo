import React, { useEffect, useState, useContext } from 'react'
import { useParams } from 'react-router-dom';
import axios from "axios";
import {useNavigate} from "react-router-dom";
import { AuthContext } from "../helpers/AuthContext"
import PetsIcon from '@mui/icons-material/Pets';
import './Profile.css'


function Profile() {
    let  navigate  = useNavigate();
    let { id } = useParams();
    const [username, setUsername] = useState("");
    const [listOfGrams, setListOfGrams] = useState([]);
    const { authState } = useContext(AuthContext);

    useEffect(() => {
        axios.get(`http://localhost:3001/auth/basicinfo/${id}`).then((response) => {
            setUsername(response.data.username);
        });

        axios.get(`http://localhost:3001/grams/byuserId/${id}`).then((response) => {
            setListOfGrams(response.data);
        })
    }, []);
    

    return (
      <div className="profilePageContainer">
        <div className="basicInfo">
          <h1>{username}</h1>
          {authState.username === username && (
            <button onClick={() => {
              navigate('/changepassword')
            }}>
              Change my Password</button>
            )}
        </div>
        <div className="listOfGrams">
          <div>
            {listOfGrams.map((value, key) => {
              return (
                <div key={key} className="gram">
                  <div className="title">{value.title}</div>
                  <div className="body"
                    onClick={() => {
                    navigate(`/gram/${value.id}`)
                    }}
                  >
                    <img className="gramImage" src={value.image} alt="Gram Image"/>
                    {value.gramText}
                  </div>
                  <div className="footer">
                    <div className="username">{value.username}</div>
                    <div className="buttons">
                      <PetsIcon /><label>{value.Likes.length}</label>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>     
      </div>
    )
}

export default Profile