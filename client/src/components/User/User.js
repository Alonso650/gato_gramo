import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import UserDataService from "../../user.service";

const User = props => {
    const initialUserState = {
        id: null,
        username: "",
        firstName: "",
        lastName: "",
        email: "",
        password: ""
    };
    const { id } = useParams();
    const [currentUser, setCurrentUser] = useState(initialUserState);
    const [message, setMessage] = useState("");

    const getUser = id => {
        UserDataService.get(id)
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
    }, [id])

    const handleInputChange = Event => {
        const { name, value } = Event.target;
        setCurrentUser({ ...currentUser, [name]: value});
    };

    const updateUser = () => {
        UserDataService.update(currentUser.id, currentUser)
            .then(response => {
                console.log(response.data);
                setMessage("The tutorial was updated successfully");
            })
            .catch(e => {
                console.log(e);
            });
    };

    const deleteUser = () => {
        UserDataService.delete(currentUser.id)
        .then(response => {
            console.log(response.data);
            props.history.push("/users");
        })
        .catch(e => {
            console.log(e);
        });
    };
    
    return(
        <div>
            {currentUser ? (
                <div>
                    <h4>User</h4>
                    <form>
                        <div>
                            <label htmlFor="username">Username</label>
                            <input
                            type="text"
                            id="username"
                            name="username"
                            value={currentUser.username}
                            onChange={handleInputChange}
                            />
                        </div>
                        <div>
                            <label htmlFor="firstName">First Name</label>
                            <input
                            type="text"
                            id="firstName"
                            name="firstName"
                            value={currentUser.firstName}
                            onChange={handleInputChange}
                            />
                        </div>
                        <div>
                            <label htmlFor="lastName">Last Name</label>
                            <input
                            type="text"
                            id="lastName"
                            name="lastName"
                            value={currentUser.lastName}
                            onChange={handleInputChange}
                            />
                        </div>
                        <div>
                            <label htmlFor="email">Email</label>
                            <input
                            type="email"
                            id="email"
                            name="email"
                            value={currentUser.email}
                            onChange={handleInputChange}
                            />
                        </div>
                        <div>
                            <label htmlFor="password">Password</label>
                            <input
                            type="password"
                            id="password"
                            name="password"
                            value={currentUser.password}
                            onChange={handleInputChange}
                            />
                        </div>
          </form>



                    <button onClick={deleteUser}>Delete</button>
                    <button
                    type="submit"
                    onClick={updateUser}>Update</button>
                    <p>{message}</p>
                    </div>
            ) : (
                <div>

                </div>
            )}
        </div>
    );
};

export default User;