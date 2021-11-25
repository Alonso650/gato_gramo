// import { FETCH_ALL, CREATE, UPDATE, DELETE } from "../constants/httpMethods";
// import users from "./users";

// export default(grams = [], action) => {
//     switch(action.type){
//         case FETCH_ALL:
//             return action.payload;
//         case CREATE:
//             return [...grams, action.payload];
//         case UPDATE:
//         case DELETE:
//             return grams.filter((gram) => gram._id !== action.payload);
//         default:
//             return users;
//     }
// }