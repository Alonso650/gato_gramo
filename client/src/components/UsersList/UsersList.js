import React, { useState, useEffect } from 'react';
import UserDataService from "../../services/user.service";
import { Link } from "react-router-dom";

const UsersList = () => {
    const [users, setUsers] = useState([]);
    const [currentUser, setCurrentUser] = useState(null);
    const [currentIndex, setCurrentIndex] = useState(-1);
    const [searchUsername, setSearchUsername] = useState("");

    useEffect(() => {
        retrieveUsers();
    }, []);

    const onChangeSearchUsername = e => {
        const searchUsername = e.target.value;
        setSearchUsername(searchUsername);
    };

    const retrieveUsers = () => {
        UserDataService.getAll()
            .then(response => {
                setUsers(response.data);
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    };

    const refreshList = () => {
        retrieveUsers();
        setCurrentUser(null);
        setCurrentIndex(-1);
    };

    const setActiveUser = (user, index) => {
        setCurrentUser(user);
        setCurrentIndex(index);
    }

    const removeAllUsers = () => {
        UserDataService.deleteAll()
            .then(response => {
                console.log(response.data);
                refreshList();
            })
            .catch(e => {
                console.log(e);
            });
    };

    const findByUsername = () => {
        UserDataService.findByUsername(searchUsername)
            .then(response => {
                setUsers(response.data);
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    };

    return(
        <div>
            <div>
                <div>
                    <input
                    type="text"
                    placeholder="Search by username"
                    value={searchUsername}
                    onChange={onChangeSearchUsername}
                    />
                    <div>
                        <button type="button" onClick={findByUsername}>
                            Search
                        </button>
                    </div>
                </div>
            </div>
            <div>
                <h4>Users List</h4>
                {users && users.map((user, index) => (
                <li
                className={
                  (index === currentIndex ? "active" : "")
                }
                onClick={() => setActiveUser(user, index)}
                key={index}
              >
                  {user.username}
                  </li>
                ))}
                <button onClick={removeAllUsers}>
                    Remove All
                </button>
            </div>
            <div>
                {currentUser ? (
                    <div>
                        <h4>User</h4>
                        <div>
                            <label>
                                <strong>Username:</strong>
                            </label>{" "}
                            {currentUser.username}
                        </div>
                        <div>
                            <label>
                                <strong>First Name:</strong>
                            </label>{" "}
                            {currentUser.firstName}
                        </div>
                        <div>
                            <label>
                                <strong>Last Name:</strong>
                            </label>{" "}
                            {currentUser.lastName}
                        </div>
                        <div>
                            <label>
                                <strong>email:</strong>
                            </label>{" "}
                            {currentUser.email}
                        </div>
                        <div>
                            <label>
                                <strong>password:</strong>
                            </label>{" "}
                            {currentUser.password}
                        </div>

                        <div>
              {/* <label>
                <strong>Status:</strong>
              </label>{" "} */}
              {/* {currentUser.published ? "Published" : "Pending"} */}
            </div>
                        <Link
                        to={"/users/" + currentUser.id}>Edit</Link>
                    </div>
                ) : (
                    <div>

                    </div>
                )}
            </div>
        </div>
    );
};

export default UsersList;