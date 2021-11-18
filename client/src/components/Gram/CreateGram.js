import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { createGram, updateGram } from '../../actions/grams'


const CreateGram = ({ currentId, setCurrentId }) => {
    // this line of code sets up the state for an inital gram entry
    const [gramData, setGramData] = useState({creator: '', title: '', selectedImage: ''});
    // useSelector: I beleive checks what the current Id of the gram is and finds the userId attached to this gramID otherwise
    // it returns empty;
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

    const handleSubmit = async(e) => {
        e.preventDefault();

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
        <div className="gram">
            <h1>This is the Create Gram Form</h1>
            <form onSubmit={handleSubmit}>
            <input 
                type="text" 
                value={gramData.title}
                placeholder="Title"
                onChange={(e) =>setGramData({...gramData, title: e.target.value })}
            />
            <input
                type="file"
                value={gramData.selectedImage}
                onChange={(e) => setGramData({...gramData, selectedImage: e.target.value })}
            />
            <button type="submit" value="submit">Submit</button>
            </form>
            <div>
                <Link to='/'>Return</Link>
            </div>
        </div>
    )
};

export default CreateGram;