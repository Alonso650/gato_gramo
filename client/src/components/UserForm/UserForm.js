import React, { useState } from "react";
import UserDataService from "../../user.service";


const UserForm = () => {
    const initialUserState = {
        id: null,
        username: "",
        firstName: "",
        lastName: "",
        email: "",
        password: ""
    };

    const [user, setUser] = useState(initialUserState);
    const [submitted, setSubmitted] = useState(false);
    
    const handleInputChange = Event => {
        const {name, value } = Event.target;
        setUser({ ...user, [name]: value });
    };

    const saveUser = () => {
        var data = {
            username: user.username,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            password: user.password
        };

        UserDataService.create(data)
            .then(response => {
                setUser({
                    id: response.data.id,
                    username: response.data.username,
                    firstName: response.data.firstName,
                    lastName: response.data.lastName,
                    email: response.data.email,
                    password: response.data.password
                });
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    };

    const newUser = () => {
        setUser(initialUserState);
    };

    return(
        <div>
            {submitted ? (
            <div>
                <h4>You submitted successfully</h4>
                <button onClick={newUser}>Add </button>
            </div>
            ) : (
                <div>
                <div>
                    <label htmlFor="username">Username</label>
                    <input
                    type="text"
                    id="username"
                    required
                    value={user.username}
                    onChange={handleInputChange}
                    name="username"
                    />
                </div>
                <div>
                    <label htmlFor="firstName">First Name</label>
                    <input
                    type="text"
                    id="firstName"
                    required
                    value={user.firstName}
                    onChange={handleInputChange}
                    name="firstName"
                    />
                </div>
                <div>
                    <label htmlFor="lastName">Last Name</label>
                    <input
                    type="text"
                    id="lastName"
                    required
                    value={user.lastName}
                    onChange={handleInputChange}
                    name="lastName"
                    />
                </div>
                <div>
                    <label htmlFor="email">Email</label>
                    <input
                    type="email"
                    id="email"
                    required
                    value={user.email}
                    onChange={handleInputChange}
                    name="email"
                    />
                </div>
                <div>
                    <label htmlFor="password">Password</label>
                    <input
                    type="password"
                    id="password"
                    required
                    value={user.password}
                    onChange={handleInputChange}
                    name="password"
                    />
                </div>
                <button onClick={saveUser}>Submit</button>
            </div>
            )}
        </div>
    );
};

export default UserForm;