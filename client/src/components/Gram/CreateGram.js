import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';


const CreateGram = ({ currentId, setCurrentId }) => {
    // this line of code sets up the state for an inital gram entry
    const [gramData, setGramData] = useState({creator: '', title: '', selectedImage: ''});
    // useSelector: I beleive checks what the current Id and finds the userId attached to this gramID otherwise
    // it returns false;
    const gram = useSelector((state) => (currentId ? state.grams.find((user) => user._id === currentId) : null));
    
    // Dispatch is going to be used to call the route for handling the creating
    // or updating of the gram entry.
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

    // the rest of the code is the visuals for the creating gram entry 
    return(
        <div>
            <h1>This is the Create Gram Form</h1>
        </div>
    )
};

export default CreateGram;