import { Link, useNavigate } from 'react-router-dom';
import React, { useState, useRef } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
// checkButton is used to verify if the form validation is successfull or not
import CheckButton from "react-validation/build/button";
import authService from '../../services/auth.service';


const required = (value) => {
    if(!value){
        return(
            <div className="alert alert-danger" role="alert">
                This field is required!
            </div>
        );
    }
};


const Login = (props) => {
    // useRef = built in hook that accepts one argument as
    // initial value and returns a reference
    // since its empty it will set the obects current property to
    // undefined (using it to access DOM elements)
    let navigate = useNavigate();
    const form = useRef();
    const checkBtn = useRef();

    const[username, setUsername] = useState("");
    const[password, setPassword] = useState("");
    const[loading, setLoading] = useState(false);
    const[message, setMessage] = useState("");

    
    const onChangeUsername = (e) => {
        const username = e.target.value;
        setUsername(username);
    };

    const onChangePassword = (e) => {
        const password = e.target.value;
        setPassword(password);
    }

    const handleLogic = (e) => {
        e.preventDefault();
        setMessage("");
        setLoading(true);
        // validateAll: validates all controls by marking all controls
        // as isUsed and isChanged
        form.current.validateAll();
        // access the authService.login when theres no errors found
        if(checkBtn.current.context._errors.length === 0){
            authService.login(username, password).then(
                ()=> {
                    navigate("/profile");

                    window.location.reload();
                },
                (error) => {
                    const resMessage =
                        (error.response &&
                         error.response.data &&
                         error.response.data.message) ||
                        error.message ||
                        error.toString();
                        setLoading(false);
                        setMessage(resMessage);
                }
            );
        } else {
            setLoading(false);
        }
    };
    return(
        <div>
            <div>
                <Form onSubmit={handleLogic} ref={form}>
                    <div className="form-group">
                        <label htmlFor = "username">Username</label>
                        <Input 
                          type="text"
                          className="form-control"
                          name="username"
                          value={username}
                          onChange={onChangeUsername}
                          validations={[required]}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <Input
                          type="password"
                          className="form-control"
                          name="password"
                          value={password}
                          onChange={onChangePassword}
                          validations={[required]}
                        />
                    </div>
                    <div className="form-group">
                        <button disabled={loading}>
                            {loading && (
                                <span className="spinner-border spinner-border-sm"></span>
                            )}
                            <span>Login</span>
                        </button>
                    </div>
                    {message && (
                        <div className="form-group">
                            <div className="alert alert-danger" role="alert">
                                {message}
                            </div>
                        </div>
                    )}
                    <CheckButton style={{ display: "none" }} ref={checkBtn} />
                </Form>
            </div>
            <div>
                <Link to={"/user/signup"}>Create User</Link>
            </div>
            <div>
                <Link to={"/indexPage"}>View some of our grams!</Link>
            </div>
        </div>
    );
};

export default Login;
