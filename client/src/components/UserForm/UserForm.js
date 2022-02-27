import React, { useState, useRef } from "react";
import { Link } from 'react-router-dom';
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import { isEmail } from "validator";

import authService from "../../services/auth.service";


const required = (value) => {
    if(!value){
        return 'require';
    }
};

const validEmail = (value) => {
    if(!isEmail(value)){
        return `${value} is not a valid email`
    }
};

const validUsername = (value) => {
    if(value.length < 2 || value.length > 20){
        return "The username must be between 2 and 20 characters."
    }
};

const validPassword = (value) => {
    if(value.length < 5 || value.length > 40){
        return "The password must be between 6 and 40 characters."
    }
}

const UserForm = (props) => {

    const form = useRef();
    const checkBtn = useRef();

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [ firstName, setFirstname] = useState("");
    const [ lastName, setLastname] = useState("");
    const [ password, setPassword] = useState("");
    const [ successful, setSuccessFul] = useState(false);
    const [ message, setMessage] = useState("");

    const onChangeUsername = (e) => {
        const username = e.target.value;
        setUsername(username);
    }

    const onChangeEmail = (e) => {
        const email = e.target.value;
        setEmail(email);
    }

    const onChangeFirstname = (e) => {
        const firstName = e.target.value;
        setFirstname(firstName);
    }

    const onChangeLastname = (e) => {
        const lastName = e.target.value;
        setLastname(lastName);
    }

    const onChangePassword = (e) => {
        const password = e.target.value;
        setPassword(password);
    }

    const handleSignUp = (e) => {
        e.preventDefault();
        setMessage("");
        setSuccessFul(false);
        form.current.validateAll();
        if (checkBtn.current.context._errors.length === 0){
            authService.create(username, firstName, lastName, email, password).then(
                (response) =>{
                    setMessage(response.data.message);
                    setSuccessFul(true);
                },
                (error) => {
                    const resMessage = 
                       (error.response &&
                        error.response.data &&
                        error.response.data.message) ||
                        error.message ||
                        error.toString();
                    setMessage(resMessage);
                    setSuccessFul(false);
                }
            );
        }
    };

    return(
        <div>
            <div>
                <Form onSubmit={handleSignUp} ref={form}>
                    {!successful && (
                        <div>
                            <div className="form-group">
                                <label htmlFor="username">Username</label>
                                <Input
                                  type="text"
                                  className="form-control"
                                  name="username"
                                  value={username}
                                  onChange={onChangeUsername}
                                  validations={[required, validUsername]}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="firstName">First Name</label>
                                <Input
                                  type="text"
                                  className="form-control"
                                  name="firstName"
                                  value={firstName}
                                  onChange={onChangeFirstname}
                                //  validations={required}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="username">Last Name</label>
                                <Input
                                  type="text"
                                  className="form-control"
                                  name="lastName"
                                  value={lastName}
                                  onChange={onChangeLastname}
                                 // validations={required}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="email">Email</label>
                                <Input
                                  type="text"
                                  className="form-control"
                                  name="email"
                                  value={email}
                                  onChange={onChangeEmail}
                                  validations={[required, validEmail]}
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
                                  validations={[required, validPassword]}
                                />
                            </div>
                            <div className="form-group">
                                <button >Create Profile</button>
                            </div>
                        </div>
                    )}
                    { message &&(
                        <div className="form-group">
                            <div
                             className={ successful ? "alert alert-success" : "alert alert-danger"}
                             role="alert"
                             >
                                 {message}
                             </div>
                        </div>
                    )}
                    <CheckButton style={{ display: "none" }} ref={checkBtn} />
                </Form>
            </div>
            <div>
            <Link to={"/"}>Back</Link>
            </div>
        </div>
    );
};
export default UserForm;
