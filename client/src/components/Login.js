import React, { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import { AuthContext } from '../helpers/AuthContext'
import styles from './Login.module.css';

function Login() {
 
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const {setAuthState} = useContext(AuthContext);
  let navigate = useNavigate();
  const login = () => {
    const data = {username: username, password: password};
    axios.post("http://localhost:3001/auth/login", data).then((response) => {
        if(response.data.error) {
          alert(response.data.error);
        } else{
          localStorage.setItem("accessToken", response.data.token);
          setAuthState({ 
            username: response.data.username, 
            id: response.data.id,
            status: true,
          });
          navigate("/");
        }
    })
  }

  return (
    <div className={styles.loginContainer}>
      <div>
        <h1 className={styles.loginTitle}> Gato-Gramo</h1>
      </div>
        <input type="text"
          placeholder='Username' 
          onChange={(event) => 
            (setUsername(event.target.value)
          )}
        />
        <input type="password" 
          placeholder='Password'
          onChange={(event) => 
            (setPassword(event.target.value)
          )}
        />
        <button onClick={login}>Login</button>
    </div>
  )
}

export default Login