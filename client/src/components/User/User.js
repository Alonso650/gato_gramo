import React from 'react';
import { useDispatch } from 'react-redux';
import { deleteUser } from '../../actions/users';

// import { useDispatch } from 'react-redux';

const User = ({ user }) => {
    const dispatch = useDispatch();

    // const dispatch = useDispatch(); 
    return(
        <div>
            <h1>USER INFORMATION FOR TESTING</h1>
            <div>
                {/* <h1>{user.firstName}</h1>
                <h2>{user.lastName}</h2> */}
                <h1>{user.username}</h1>
            </div>

        </div>
    )
}

export default User;