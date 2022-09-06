import React, { useContext }  from 'react'
import axios from "axios";
// allows to run a function when it re-renders
import { useEffect, useState } from "react";
import {useNavigate, Link} from "react-router-dom";
import PetsIcon from '@mui/icons-material/Pets';
import { AuthContext } from "../helpers/AuthContext"


function Home() {
    const [listOfGrams, setListOfGrams] = useState([]);
    // state that will hold a list of likedGrams
    const [likedGrams, setLikedGrams] = useState([]);
     const { authState } = useContext(AuthContext);
    let navigate = useNavigate();

  useEffect(() => {
    if(!localStorage.getItem("accessToken")){
      navigate('/login');
    } else {
      axios.get("http://localhost:3001/grams",{ 
        headers: { accessToken: localStorage.getItem('accessToken')}}
      ).then((response) => {
        setListOfGrams(response.data.listOfGrams);
        setLikedGrams(response.data.likedGrams.map((like) => { 
          return like.GramId
          })
        );
      });
    }
  },[]);

  const likeAPost = (gramId) => {
    axios.post("http://localhost:3001/likes", 
      { GramId: gramId}, 
      { headers: { accessToken: localStorage.getItem('accessToken')}}
    ).then((response) => {
      setListOfGrams(
        listOfGrams.map((gram) => {
        if(gram.id === gramId){
          if(response.data.liked){
            // gram object stays the same,
            // but modifying the Likes field,
            // keeping the same array but adding a zero field
            // which is used to keep track of the current likes
            return {...gram, Likes: [...gram.Likes, 0]}
          } else{
            const likeArray = gram.Likes;
            likeArray.pop()
            return {...gram, Likes: likeArray}
          }
          
        } else {
          return gram;
        }
      })
    );

      // whenever a gram has been liked before
      // only want to keep the ones we liked before
      if(likedGrams.includes(gramId)){
        setLikedGrams(
          likedGrams.filter((id) => {
          return id !== gramId;
        }))
      } else {
        setLikedGrams([...likedGrams, gramId])
      }
    })
  }


  return (
    <div className="gridGram">
    {listOfGrams.map((value, key) => {
      return (
        <div key={key} className="gram">
          <div className="title">{value.title}</div>
            <div className="body"
              onClick={() => {
                // When clicked on it will direct to the specific gram with the id
                navigate(`/gram/${value.id}`)
              }}
            >
              {/* {value.gramText} */}
              <img className="gramImage" src={value.image} alt="Gram Image"/>
            </div>
            <div className="footer">
              <div className="username">
                <Link to ={`/profile/${value.UserId}`}>
                  {value.username}
                </Link>
              </div>
              <div className="buttons">
              <PetsIcon
                onClick={() => {
                  likeAPost(value.id);
                }}
                className={likedGrams.includes(value.id) ? "unlikeBttn" : "likeBttn" }
                
              />
              
              <label>{value.Likes.length}</label>
              </div>
            </div>
        </div>
        );
      })}
    </div>
  );
}

export default Home