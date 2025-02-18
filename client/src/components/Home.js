import React, { useContext }  from 'react'
import axios from "axios";
// allows to run a function when it re-renders
import { useEffect, useState } from "react";
import {useNavigate, Link} from "react-router-dom";
import PetsIcon from '@mui/icons-material/Pets';
import { AuthContext } from "../helpers/AuthContext";
import styles from './Home.module.css';


function Home() {
    const [listOfGrams, setListOfGrams] = useState([]);
    // state that will hold a list of likedGrams
    const [likedGrams, setLikedGrams] = useState([]);
    const { authState } = useContext(AuthContext);

    // Adding new code to display images on the home page
    //const [images, setImages] = useState([]);
    let navigate = useNavigate();

    // maybe redo with async? not sure yet
  // useEffect(() => {
  //   if(!localStorage.getItem("accessToken")){
  //     navigate('/login');
  //   } else {
  //     axios.get("http://localhost:3001/grams",{ 
  //       headers: { accessToken: localStorage.getItem('accessToken')}}
  //     ).then((response) => {
  //       setListOfGrams(response.data.listOfGrams);
  //       setLikedGrams(response.data.likedGrams.map((like) => { 
  //         return like.GramId
  //         })
  //       );
  //     });
  //   }
  // },[]);
    useEffect(() => {
      const fetchData = async () => {
        try{
          const gramsResponse = await axios.get("http://localhost:3001/grams", {
            headers: { accessToken: localStorage.getItem('accessToken') }
          });
          console.log(gramsResponse.data);
          //console.log(gramsResponse.data.listOfGrams[0].Images)

          setListOfGrams(gramsResponse.data.listOfGrams);

          setLikedGrams(
            gramsResponse.data.likedGrams.map((like) => like.GramId)
          );
          // optional chaining '?' used to avoid errors if Images[0] doesnt exist
          // it safely checks if Images[0] is defined before attempting to access imageUrl
          // so if a Gram doesn't have any images, it wont throw an error, itll simply return undefined
          // setImages(
          //   gramsResponse.data.listOfGrams.map((gram) => gram.Images[0]?.imageUrl)
          // );
        } catch(error){
          console.error("Error fetching grams data", error);
        }
      };

      if(!localStorage.getItem("accessToken")){
        navigate('/login');
      } else {
        fetchData();
      }
    }, [navigate]);


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
    <div className={styles.gridGram}>
    {listOfGrams.map((value, key) => {
          const imageUrl = value.Images.length > 0 ? value.Images[0].imageUrl : null;

          console.log("Image URL:", imageUrl);
      return (
        <div key={key} className={styles.gram}>
          <div className={styles.title}>{value.title}</div>
            <div className={styles.body}
              onClick={() => {
                // When clicked on it will direct to the specific gram with the id
                navigate(`/gram/${value.id}`)
              }}
            >
              {/* {value.gramText} */}
              {/* <img className={styles.gramImage} src={value.image} alt="Gram Image"/> */}
              {/* { images.length > 0 && images.map((image, index) => (
                <img
                  key={index}
                  className={styles.gramImage}
                  //src={images[0].imageUrl}
                  //src={images[0]}
                  src={image[0]}
                  alt={`gato pic + ${index + 1}`}
                />
              ))} */}
              {value.Images.length > 0 && (
                  <img
                    className={styles.gramImage}
                    src={value.Images.sort((a, b) => a.id - b.id)[0].imageUrl} // sorts images by ID before displaying the first one since images were not showing up in order when uploading
                    alt="gato_pic"
                  />
              )}
            </div>
            <div className={styles.footer}>
              <div className={styles.username}>
                <Link to ={`/profile/${value.UserId}`}>
                  {value.username}
                </Link>
              </div>
              <div className={styles.buttons}>
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