import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import AuthService from "../../services/auth.service";
import UserService from "../../services/user.service";

const NavBar = () => {
    const [currentUser, setCurrentUser] = useState(undefined);
    const [showAdminBoard, setShowAdminBoard] = useState(false);
    useEffect(() => {
        const user = AuthService.getCurrentUser();
        if(user){
            setCurrentUser(user);
            setShowAdminBoard(user.roles.includes("ROLE_ADMIN"));
        }
    }, [])

    const logOut = () =>{
        AuthService.logout();
    }

    return(
        <div>
            <nav className="navbar navbar-expand navbar-dark bg-dark">
                <div className="navbar-nav mr-auto">
                    <li className="nav-item">
                    <Link to={"/indexPage"} className="nav-link">
                        Cat Grams
                    </Link>
                    </li>
                    {showAdminBoard &&(
                        <li className="nav-item">
                            <Link to={"/user/test/admin"} className="nav-link">
                                Admin Board
                            </Link>
                        </li>
                    )}
                    {currentUser && (
                        <li className="nav-item">
                            <Link to={"/user/test/user"} className="nav-link">
                                User
                            </Link>
                        </li>
                    )}
                </div>
                {currentUser ? (
                    <div className="navbar-nav ml-auto">
                        <li className="nav-item">
                            <Link to={"/profile"} className="nav-link">
                                {currentUser.username}
                            </Link>
                        </li>
                        <li className="nav-item">
                            <a href="/" className="nav-link" onClick={logOut}>
                                Log Out
                            </a>
                        </li>
                        {/* LINK TO CREATE GRAM BELOW MIGHT EDIT IT  */}
                        <li className="nav-item">
                            <Link to={"/createGram"} className="nav-link">
                                Post a Gram
                            </Link>
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