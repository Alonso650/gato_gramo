// import { FETCH_ALL, CREATE, UPDATE, DELETE } from '../constants/httpMethods';
// import * as api from '../api';

// export const getUsers = () => async(dispatch) => {
//     try {
//         const { data } = await api.fetchUser();
//         console.log(data);

//         dispatch({ type: FETCH_ALL, payload: data});
//     } catch (error) {
//         console.log(error);
//     }
// }

// export const createUser = (user) => async(dispatch) => {
//     try {
//         const { data } = await api.createUser(user);

//         dispatch({ type: CREATE, payload: data });
//         console.log(data);
//     } catch (error) {
//         console.log(error);
//     }
// }

// export const updateUser = (id, user) => async(dispatch) =>{
//     try {
//         const { data } = await api.updateUser(id, user);

//         dispatch({ type: UPDATE, payload: data });
//     } catch (error) {
//         console.log(error);
//     }
// }

// export const deleteUser = (id) => async(dispatch) => {
//     try {
//         const { data } = await api.deleteUser(id);

//         dispatch({ type: DELETE, payload: data });
//     } catch (error) {
//         console.log(error);
//     }
// }