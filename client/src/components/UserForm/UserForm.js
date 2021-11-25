import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { createUser, updateUser } from '../../actions/users';

const UserForm = ({currentId, setCurrentId}) => {
    const [userData, setUserData] = useState({ username: '', pw: '', firstName: '', lastName: '', email: '', selectedImage: ''});
    const user = useSelector((state) => currentId ? state.users.find((u) => u._id === currentId) : null);
    const dispatch = useDispatch();

    useEffect(() => {
        if(user) setUserData(user);
    }, [user]);

    
    

    const handleSubmit = (e) => {
        e.preventDefault();
        if(currentId){
            dispatch(updateUser(currentId, userData));
            // clear();
        }else{
            dispatch(createUser(userData));
            //clear();
        }
        clear();
    };

    const clear = () => {
        setCurrentId = null;
        setUserData({ username: '', pw: '', firstName: '', lastName: '', email: '', selectedImage: ''});
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
                        value={userData.pw} 
                        placeholder="Password"
                        onChange={(e) => setUserData({...userData, pw: e.target.value })}
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

export default UserForm;