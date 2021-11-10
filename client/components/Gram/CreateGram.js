import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';


const CreateGram = ({ currentId, setCurrentId }) => {
    // this line of code sets up the state for an inital gram entry
    const [gramData, setGramData] = useState({creator: '', title: '', selectedImage: ''});
    const gram = useSelector((state) => (currentId ? state.grams.find((user) => user._id === currentId) : null));
    const dispatch = useDispatch();
    
    useEffect(() => {
        if(gram) setGramData(gram);
    }, [gram]);

    // clears the input for the form 
    const clear = () => {
        setCurrentId(0);
        setGramData({ creator: '', title: '', selectedimage: '' });
    }

    const handleSubmit = async(error) => {
        error.preventDefault();

        if(currentId === 0){
            dispatch(createGram(gramData));
            clear();
        }else{
            dispatch(updateGram(currentId, gramData));
            clear();
        }
    };

    return(
        <div>
            <h1>This is the Create Gram Form</h1>
        </div>
    )
};