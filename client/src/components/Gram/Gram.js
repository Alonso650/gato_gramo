import React, { useEffect, useState } from 'react'
import {useParams} from "react-router-dom";
import axios from "axios";

const Gram = () => {
    let {id} = useParams();
    const [gramObject, setGramObject] = useState({});

    useEffect(() => {
        axios.get(`http://localhost:8080/grams/byId/${id}`).then((response) => {
            setGramObject(response.data);
        });
    });
  return (
    <div className="GramPage">
        <div className="leftSide">
            <div className="title">{gramObject.title}</div>
            <div className="description">{gramObject.description}</div>
            <div className="footer">{gramObject.username}</div>
        </div>
        <div className="rightSide">

        </div>
    </div>
  )
}

export default Gram