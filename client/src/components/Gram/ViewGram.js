import React from 'react';
// import { useDispatch } from 'react-redux';

const ViewGram = ({gram, setCurrentId}) => {
    return(
        <div>
            <h1>{gram.title}</h1>
            <div image={gram.selectedFile}></div>

        </div>
    )
}

export default ViewGram;