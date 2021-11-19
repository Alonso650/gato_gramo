import { FETCH_ALL, CREATE, UPDATE, DELETE } from '../constants/httpMethods';
import * as api from '../api';

export const getGrams = () => async (dispatch) => {
    try {
        const { data } = await api.fetchGram();

        dispatch({ type: FETCH_ALL, payload: data });
    } catch (error) {
        console.log(error);
    }
}

export const createGram = (gram) => async(dispatch) =>{
    try {
        const { data } = await api.createGram(gram);

        dispatch({ type: CREATE, payload: data });
    } catch (error) {
        console.log(error)
    }
}

export const updateGram = (id, gram) => async(dispatch) =>{
    try {
        const { data } = await api.updateGram(id, gram);

        dispatch({ type: UPDATE, payload: data });
    } catch (error) {
        console.log(error);
    }
}

export const deleteGram = (id) => async(dispatch) =>{
    try {
        const { data } = await api.deleteGram(id);

        dispatch({ type: DELETE, payload: data });
    } catch (error) {
        console.log(error);
    }
}