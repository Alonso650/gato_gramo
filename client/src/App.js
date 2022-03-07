import React from 'react';
import { Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Login from "./components/Login/Login";
import UserForm from "./components/UserForm/UserForm";
import Profile from "./components/Profile/Profile";
import UsersList from "./components/UsersList/UsersList";
import IndexPage from './components/IndexPage/IndexPage';
import CreateGram from './components/CreateGram/CreateGram';


const App = () =>{

        return (
            <div>
                <div>
                    <Routes>
                        <Route exact path="/" element={<Login />}/>
                        <Route exact path={"/allUsers"} element={<UsersList />}/>
                        <Route exact path="/user/signup" element={<UserForm/>} />
                        <Route path="/profile" element={<Profile/>} />
                        <Route path="/indexPage" element={<IndexPage />} />
                        <Route path="/createGram" element={<CreateGram />}/>
                    </Routes>
                </div>
            </div>
        );
};

export default App;