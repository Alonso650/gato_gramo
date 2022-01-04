// import React from 'react';
// import { useSelector } from 'react-redux';
// import { deleteUser } from '../../actions/users';

// // import { useDispatch } from 'react-redux';

// const User = ({ setCurrentId }) => {
//     //const dispatch = useDispatch();
//     const user = useSelector((state) => state.user);
//     console.log(user);

//     // const dispatch = useDispatch(); 
//     return(
//         <div>
//             <h1>USER INFORMATION FOR TESTING</h1>
//             <div>
//                 {/* <h1>{user.firstName}</h1>
//                 <h2>{user.lastName}</h2> */}
//                 <h1>{user.username}</h1>
//             </div>

//         </div>
//     )
// }

// export default User;

// import React, { Component } from 'react';
// import UserDataService from "../../user.service.js";

// export default class User extends Component{
//     constructor(props){
//         super(props);
//         this.onChangeUsername = this.onChangeUsername.bind(this);
//         this.onChangeFirstname = this.onChangeFirstname.bind(this);
//         this.onChangeLastname = this.onChangeLastname.bind(this);
//         this.onChangeEmail = this.onChangeEmail.bind(this);
//         this.onChangePassword = this.onChangePassword.bind(this);
//         this.getUser = this.getUser.bind(this);
//         this.updateUser = this.updateUser.bind(this);
//         this.deleteUser = this.deleteUser.bind(this);

//         this.state = {
//             currentUser: {
//                 id: null,
//                 username: "",
//                 firstName: "",
//                 lastName: "",
//                 email: "",
//                 password: ""
//             },
//             message: ""
//         };
//     }
    
//     componentDidMount() {
//         //this.getUser(this.props.match.params.id);
//         console.log(this.getUser(this.props.id));
//       }

//     onChangeUsername(e){
//         const username = e.target.value;

//         this.setState(prevState => ({
//                 currentUser:{
//                     ...prevState.currentUser,
//                     username: username
//                 }
//         }));
//     }

//     onChangeFirstname(e){
//         const firstName= e.target.value;

//         this.setState(prevState => ({
//             currentUser: {
//                 ...prevState.currentUser,
//                 firstName: firstName
//             }
//         }));
//     }

//     onChangeLastname(e){
//         const lastName = e.target.value;

//         this.setState(prevState => ({
//             currentUser: {
//                 ...prevState.currentUser,
//                 lastName: lastName
//             }
//         }));
//     }

//     onChangeEmail(e){
//         const email = e.target.value;

//         this.setState(prevState => ({
//             currentUser: {
//                 ...prevState.currentUser,
//                 email: email
//             }
//         }));
//     }

//     onChangePassword(e){
//         const password = e.target.value;

//         this.setState(prevState => ({
//             currentUser: {
//                 ...prevState.currentUser,
//                 password: password
//             }
//         }));
//     }

//     getUser(id){
//         UserDataService.get(id)
//             .then(response => {
//                 this.setState({
//                     currentUser: response.data
//                 });
//                 console.log(response.data);
//             })
//             .catch(e => {
//                 console.log(e);
//             });
//     }

//     updateUser(){
//         UserDataService.update(
//             this.state.currentUser.id,
//             this.state.currentUser
//         )
//         .then(response => {
//             console.log(response.data);
//             this.setState({
//                 message: "the user was updated successfully"
//             });
//         })
//         .catch(e => {
//             console.log(e);
//         });
//     }


//     deleteUser(){
//         UserDataService.delete(this.state.currentUser.id)
//             .then(response => {
//                 console.log(response.data);
//                 this.props.history.push('/users')
//             })
//             .catch(e => {
//                 console.log(e);
//             });
//     }

//     render(){
//         const { currentUser } = this.state;


//         return(
//             <div>
//                 {currentUser ? (
//                     <div>
//                         <h4>User</h4>
//                         <form>
//                             <div>
//                                 <label htmlFor="username">User Name</label>
//                                 <input
//                                     type="text"
//                                     id="username"
//                                     value={currentUser.username}
//                                     onChange={this.onChangeUsername}
//                                 />
//                             </div>
//                             <div>
//                                 <label htmlFor="firstName">First Name</label>
//                                 <input
//                                     type="text"
//                                     id="firstName"
//                                     value={currentUser.firstName}
//                                     onChange={this.onChangeFirstname}
//                                 />
//                             </div>
//                             <div>
//                                 <label htmlFor="lastName">Last Name</label>
//                                 <input
//                                     type="text"
//                                     id="lastName"
//                                     value={currentUser.lastName}
//                                     onChange={this.onChangeLastname}
//                                 />
//                             </div>
//                             <div>
//                                 <label htmlFor="email">Email</label>
//                                 <input
//                                     type="email"
//                                     id="email"
//                                     value={currentUser.email}
//                                     onChange={this.onChangeEmail}
//                                 />
//                             </div>
//                             <div>
//                                 <label htmlFor="username">Password</label>
//                                 <input
//                                     type="password"
//                                     id="password"
//                                     value={currentUser.password}
//                                     onChange={this.onChangePassword}
//                                 />
//                             </div>
//                         </form>
//                         <button onClick={this.deleteUser}>Delete</button>
//                         <button type="submit" onClick={this.updateUser}>Update</button>
//                         <p>{this.state.message}</p>
//                         </div>
//                 ) : (
//                     <div>
//                         <br />
//                         <p> Please click on a user....</p>
//                     </div>
//         )}
//         </div>
//         );
//     }
// }


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
        //published: false
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