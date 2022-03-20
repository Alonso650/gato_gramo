import React from 'react';
import { BrowserRouter as Router, Routes, Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Login from "./components/Login/Login";
import UserForm from "./components/UserForm/UserForm";
import Profile from "./components/Profile/Profile";
import IndexPage from './components/IndexPage/IndexPage';
import CreateGram from './components/CreateGram/CreateGram';
import Gram from './components/Gram/Gram';

import {AuthContext} from "./helpers/AuthContext";
import { useState, useEffect } from "react";
import axios from "axios";

const App = () =>{
    const [authState, setAuthState] = useState({
        username: "",
        id: 0,
        status: false,
    });

    useEffect(() => {
        axios
          .get("http://localhost:8080/user/auth", {
            headers: {
              accessToken: localStorage.getItem("accessToken"),
            },
          })
          .then((response) => {
            if (response.data.error) {
              setAuthState({ ...authState, status: false });
            } else {
              setAuthState({
                username: response.data.username,
                id: response.data.id,
                status: true,
              });
            }
          });
      }, []);

    const logout = () => {
        localStorage.removeItem("accessToken");
        setAuthState({ username: "", id: 0, status: false });
    };

    return (
        <div className="App">
          <AuthContext.Provider value={{ authState, setAuthState }}>
            {/* <Router> */}
              <div className="navbar">
                <div className="links">
                  {!authState.status ? (
                    <>
                      <Link to="/login"> Login</Link>
                      <Link to="/registration"> Registration</Link>
                    </>
                  ) : (
                    <>
                      <Link to="/"> Home Page</Link>
                      <Link to="/creategram"> Create A Post</Link>
                    </>
                  )}
                </div>
                <div className="loggedInContainer">
                  <h1>{authState.username} </h1>
                  {authState.status && <button onClick={logout}> Logout</button>}
                </div>
              </div>
              <Routes>
                            <Route path="/" element={<IndexPage/>} />
                             <Route path="/creategram" element={<CreateGram/>} />
                             <Route path="/gram/:id" element={<Gram />}/>
                             <Route path="/registration" element={<UserForm/>}/>
                             <Route path="/login" element={<Login/>}/>
                             <Route path="/profile/:id" elment={<Profile/>}/>
                         </Routes>
            {/* </Router> */}
          </AuthContext.Provider>
        </div>
      );
    }

//         return (
//             <div className='App'>
//                 <AuthContext.Provider value={{ authState, setAuthState }}>
//                     {/* <Router> */}
//                         <div className="navbar">
//                             <div className="links">
//                                 {!authState.status ? (
//                                     <>
//                                         <Link to="/login">Login</Link>
//                                         <Link to="/registration"></Link>
//                                     </>
//                                 ) : (
//                                     <>
//                                         <Link to ="/">Home Page</Link>
//                                         <Link to ="/creategram">Create a Gram</Link>
//                                     </>
//                                 )}
//                             </div>
//                             <div classname="loggedInContainer">
//                                 <h1>{authState.username}</h1>
//                                 {authState.status && <button onClick={logout}> Logout</button>}
//                             </div>
//                         </div>
                        
//                         <Routes>
//                             <Route path="/" element={<IndexPage/>} />
//                             <Route path="/creategram" element={<CreateGram/>} />
//                             <Route path="/gram/:id" element={<Gram />}/>
//                             <Route path="/registration" element={<UserForm/>}/>
//                             <Route path="/login" element={<Login/>}/>
//                             <Route path="/profile/:id" elment={<Profile/>}/>
//                         </Routes>
//                     {/* </Router> */}
//                 </AuthContext.Provider>
//             </div>
//         );
// };

export default App;