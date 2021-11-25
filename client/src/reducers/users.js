import { FETCH_ALL, CREATE, UPDATE, DELETE } from "../constants/httpMethods";

// a reducer is a function where it accepts the state and action

export default(users = [], action) => {
    switch(action.type){
        case FETCH_ALL:
            return action.payload;
        case CREATE:
            return [...users, action.payload];
        case UPDATE:
        case DELETE:
            return users.filter((user) => user._id !== action.payload);
        default:
            return users;
    }
}