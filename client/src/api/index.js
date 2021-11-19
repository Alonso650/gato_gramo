import axios from 'axios';

//url pointing to the backend route
// going to need to update this url 
const url ='http://localhost:5000/grams';

const url2 = 'http://localhost:5000/users';

// the reason to use axios is it makes it easier to utilize the api
// methods on the client side
export const fetchGram = () => axios.get(url);
export const createGram = (newGram) => axios.post(url, newGram);
export const updateGram = (id, updatedGram) => axios.put(`${url}/${id}`, updatedGram);
export const deleteGram = (id) => axios.delete(`${url}/${id}`);

export const fetchUser = () => axios.get(url2);
export const createUser = (newUser) => axios.post(url2, newUser);
export const updateUser = (id, updatedUser) => axios.put(`${url2}/${id}`, updatedUser);
export const deleteUser = (id) => axios.delete(`${url}/${id}`);
