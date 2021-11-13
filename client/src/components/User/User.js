import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

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
        if(currentId == 0){
            dispatch(createUser(userData));
            clear();
        }else{
            dispatch(updateUser(currentId, userData));
            clear();
        }
    };

    return(
        <div>
            <h1>This is the user form</h1>
        </div>
    )
};

export default User;