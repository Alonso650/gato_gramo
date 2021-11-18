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
            <h1>This is the user form</h1>
            <form onSubmit={handleSubmit}>
                <input 
                    type="text" 
                    value={userData.firstName}
                    placeholder="First Name"
                    onChange={(e) =>setUserData({...userData, firstName: e.target.value })}
                />
                <input 
                    type="text" 
                    value={userData.lastName} 
                    placeholder="Last Name"
                    onChange={(e) => setUserData({...userData, lastName: e.target.value })}
                />
                <input 
                    type="text" 
                    value={userData.username}
                    placeholder="User Name"
                    onChange={(e) => setUserData({...userData, username: e.target.value })}
                />
                <input 
                    type="email" 
                    value={userData.email} 
                    placeholder="Email"
                    onChange={(e) => setUserData({...userData, email: e.target.value })}
                />  
                <input 
                    type="file" 
                    value={userData.selectedImage}
                    onChange={(e) => setUserData({...userData, selectedImage: e.target.value })}
                />          
                <input 
                    type="password" 
                    value={userData.password} 
                    placeholder="Password"
                    onChange={(e) => setUserData({...userData, password: e.target.value })}
                />  
                <button type="submit" value="submit">Submit</button>
            </form>
            <div>
                <Link to='/'>Return</Link>
            </div>
        </div>
    )
};

export default User;