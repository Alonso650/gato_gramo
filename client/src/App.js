import React, { Component } from 'react';
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
                        <Route exact path={"/users"} element={<UsersList />}/>
                        <Route exact path="/add" element={<UserForm/>} />
                        <Route path="/users/:id" element={<User/>} />
                    </Routes>
                </div>
            </div>
        );
    }
}

export default App;