import React from 'react';
// import { useDispatch } from 'react-redux';

const ViewUser = ({user, setCurrentId}) => {
    return(
        <div>
            <h1>{user.firstName}</h1>
            <h2>{user.lastName}</h2>
            <h3>{user.username}</h3>
            <h3>{user.email}</h3>
            <div image={user.selectedFile}></div>

        </div>
    )
}

export default ViewUser;