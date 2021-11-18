import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { createUser, updateUser } from '../../actions/users';

const User = ({currentId, setCurrentId}) => {
    const [userData, setUserData] = useState({ username: '', pw: '', firstName: '', lastName: '', email: '', selectedImage: ''});
    const user = useSelector((state) => (currentId ? state.users.find((gram) => gram._id === currentId) : null));
    const dispatch = useDispatch();

    useEffect(() => {
        if(user) setUserData(user);
    }, [user]);

    
    const clear = () => {
        setCurrentId(0);
        setUserData({ username: '', pw: '', firstName: '', lastName: '', email: '', selectedImage: ''});
    };

    const handleSubmit = async(error) => {
        error.preventDefault();
        if(currentId === 0){
            dispatch(createUser(userData));
            clear();
        }else{
            dispatch(updateUser(currentId, userData));
            clear();
        }
    };

    return(
        <div className="user">
            <h1>Create a Profile and Join Us...(meow)</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <input 
                        type="text" 
                        value={userData.firstName}
                        placeholder="First Name"
                        onChange={(e) =>setUserData({...userData, firstName: e.target.value })}
                    />
                </div>
                <div>
                    <input 
                        type="text" 
                        value={userData.lastName} 
                        placeholder="Last Name"
                        onChange={(e) => setUserData({...userData, lastName: e.target.value })}
                    />
                </div>
                <div>
                    <input 
                        type="text" 
                        value={userData.username}
                        placeholder="User Name"
                        onChange={(e) => setUserData({...userData, username: e.target.value })}
                    />
                </div>
                <div>
                    <input 
                        type="email" 
                        value={userData.email} 
                        placeholder="Email"
                        onChange={(e) => setUserData({...userData, email: e.target.value })}
                    />
                </div>
                <div>
                    <input 
                        type="file" 
                        value={userData.selectedImage}
                        onChange={(e) => setUserData({...userData, selectedImage: e.target.value })}
                    /> 
                </div>
                <div>
                    <input 
                        type="password" 
                        value={userData.password} 
                        placeholder="Password"
                        onChange={(e) => setUserData({...userData, password: e.target.value })}
                    />
                </div> 
                  
                <button type="submit" value="submit">Submit</button>
            </form>
            <div>
                <Link to='/'>Return</Link>
            </div>
        </div>
    )
};

export default User;