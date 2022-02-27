import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import UserService from "../../services/user.service";

const NavBar = () => {
    const [currentUser, setCurrentUser] = useState(undefined);
    
    const {id} = useParams();
    const getUser = (id) => {
        UserService.get(id)
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

    const logout = () =>{
        UserService.logout();
    };

    return(
        <div>
            <nav className="navbar navbar-expand navbar-dark bg-dark">
                <div>
                    <li className="nav-item">
                    <Link to={"/indexPage"} className="nav-link">
                        Cat Grams
                    </Link>
                    </li>
                </div>
                {currentUser ? (
                    <div className="navbar-nav ml-auto">
                        <li className="nav-item">
                            <Link to={"/profile"} className="nav-link">
                                {currentUser.username}
                            </Link>
                        </li>
                        <li className="nav-item">
                            <a href="/" className="nav-link" onClick={logout}>
                                Log Out
                            </a>
                        </li>
                    </div>
                ) : (
                    <div className="navbar-nav ml-auto">
                        <li className="nav-item">
                            <Link to={"/"} className="nav-link">
                                Login
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to={"/user/signup"} className="nav-link">
                                Sign Up
                            </Link>
                        </li>
                    </div>
                )}
            </nav>
        </div>
    );
};

export default NavBar;