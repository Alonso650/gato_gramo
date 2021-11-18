import axios from 'axios';

//url pointing to the backend route
const url ='http://localhost:5000/grams';

// the reason to use axios is it makes it easier to utilize the api
// methods on the client side
export const fetchGram = () => axios.get(url);
export const createGram = (newGram) => axios.post(url, newGram);
export const updateGram = (id, updatedGram) => axios.put(`${url}/${id}`, updatedGram);
export const deleteGram = (id) => axios.delete(`${url}/${id}`);