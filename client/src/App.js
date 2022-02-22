import React, { Component, useState, useEffect } from 'react';
import { Routes, Route } from "react-router-dom";

import Login from "./components/Login/Login";
import UserForm from "./components/UserForm/UserForm";
import User from "./components/User/User";
import UsersList from "./components/UsersList/UsersList";

class App extends Component{
    
    render(){
        return (
            <div>

                <div>
                    <Routes>
                        <Route exact path="/" element={<Login />}/>
                        <Route exact path={"/user"} element={<UsersList />}/>
                        <Route exact path="/user/createuser" element={<UserForm/>} />
                        <Route path="/user/:id" element={<User/>} />
                    </Routes>
                </div>
            </div>
        );
    }
}

export default App;