import React, { useContext, useEffect, useState } from 'react'
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../helpers/AuthContext";
import mapboxgl from "mapbox-gl"
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit';
import styles from './Gram.module.css'

function Gram() {
  let { id } = useParams();
  const [gramObject, setGramObject] = useState({});
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [map, setMap] = useState(null);
  const { authState } = useContext(AuthContext);

  let navigate = useNavigate();
  
  // made useEffect asynchronous and await is used to wait for each API call
  // to complete. Included the id variable in the dependency array to trigger the effect
  // when the id changes
  useEffect(() => {

    const fetchData = async () => {
      try {
        const gramResponse = await axios.get(`http://localhost:3001/grams/byId/${id}`);
        setGramObject(gramResponse.data);

        const commentsResponse = await axios.get(`http://localhost:3001/comments/${id}`);
        setComments(commentsResponse.data);

        const location = `${gramObject.adoptInfoCity}, ${gramObject.adoptInfoState}, ${gramObject.adoptInfoZipcode}`;
        const mapData = await fetchMapData(location);
        console.log(process.env.REACT_APP_API_KEY);

        if(!map){
          mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_API;
          const mapInstance = new mapboxgl.Map({
            container: 'mapContainer',
            style: 'mapbox://styles/mapbox/streets-v11',
            center: mapData.center,
            zoom: 250,
            interactive: false,
            attributionControl: false,
          });
          setMap(mapInstance);
        } else{
          map.setCenter(mapData.center);
          map.setZoom(11);
          // Disable map zoom when using scroll
          map.scrollZoom.disable();
        }

        if(map){
          map.on('load', function(){
            console.log("Center coordinates: ", mapData.center);
            map.addSource("radius",{
              type: 'geojson',
              data:{
                type: 'FeatureCollection',
                features: [{
                 type: 'Feature',
                  geometry: {
                    type: 'Point',
                    coordinates: mapData.center
                  }
                }]
              }
            });
          
          map.addLayer({
          id: 'radius-layer',
          type: 'circle',
          source: 'radius',
          paint: {
            'circle-radius': {
              base: 1.75,
              stops: [
                [12, 30],
                [22, 180]
              ]
            },
            'circle-color': 'rgba(0, 0, 255, 0.5)',
            'circle-stroke-color': 'rgba(0, 0, 255, 1)',
            'circle-stroke-width': 1
          }
        });
      });
    }

        // new mapboxgl.Marker()
        //   .setLngLat(mapData.center)
        //   .addTo(map);
    } catch (error) {
        console.error("Error fetching data:", error);
    }
    };

    fetchData();
  }, [id, map]);
 
  const fetchMapData = async (location) => {
    const response = await axios.get('https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(location) + '.json',{
        params:{
          access_token: process.env.REACT_APP_MAPBOX_API
        }
      });
      const features = response.data.features;
      if(features.length > 0){
        const center = features[0].center;
        return { center: center};
      } else {
        throw new Error('Location not found');
      }
  };

  // const initializeMap = (center) => {
  //   const mapInstance = new mapboxgl.Map({
  //     container: 'mapContainer',
  //     style: 'mapbox://styles/mapbox/streets-v11',
  //     center: center,
  //     zoom: 12
  //   });
  //   setMap(mapInstance);
  // }

  const addComment = () => {
    axios
      .post("http://localhost:3001/comments", {
        commentBody: newComment, 
        GramId: id
      },
      {
        headers: {
          accessToken: localStorage.getItem("accessToken"),
        },
      }
      )
      .then((response) => {
        if(response.data.error){
          console.log(response.data.error);
        }else{
          const commentToAdd = {commentBody: newComment, username: response.data.username}
          // restructuring
          setComments([...comments, commentToAdd]);
          setNewComment("");
        }
     });
  };


  const deleteComment = (id) => {
    axios.delete(`http:/localhost:3001/comments/${id}`, {headers: {
      accessToken: localStorage.getItem('accessToken')},
    }).then(() => {
      setComments(comments.filter((value) => {
        return value.id !== id;
      })
      );
    });
  }

  const deleteGram = (id) => {
    axios.delete(`http://localhost:3001/grams/${id}`, 
    {headers:{accessToken: localStorage.getItem("accessToken")}
  })
  .then(() => {
      navigate("/");
    })
  }

  const editGram = (option) => {
    if(option === "title"){
      let newTitle = prompt("Enter new title");
      axios.put("http://localhost:3001/grams/title", {
        newTitle: newTitle, 
        id: id
      },
      {
        headers: { accessToken: localStorage.getItem("accessToken") },
      }
      );
      setGramObject({...gramObject, title: newTitle})
    } else {
      let newGramText = prompt("Enter new text");
      axios.put("http://localhost:3001/grams/gramText", {
        newText: newGramText, 
        id: id
      },
      {
        headers: { accessToken: localStorage.getItem("accessToken") },
      }
      );

      setGramObject({...gramObject, gramText: newGramText})
    }
    // maybe do the same thing but for images?
  };

//   const StyledLeftSide = styled.div`
//   flex: 50%;
//   height: calc(100vh - 70px);
//   display: grid;
//   place-items: center;
//   /* Add conditional margin to center the gram when not an adoption form */
//   margin-left: ${props => props.isAdopt ? '0' : 'auto'};
// `;
  
  return (
   
    <div className={styles.gramPage}>
      <div className={styles.leftSide}>
        <div className={styles.gram} id={styles.individual}>
          <div className={styles.title}
            onClick={() => {
              if( authState.username === gramObject.username){
                editGram("title")
              }
            }}
          >
            {gramObject.title}{" "}
          </div>
          <div className={styles.body}>
            <img className={styles.gramImage} src={gramObject.image} alt="gato pic"/>    
          </div>
          <div>
            <label>Description: </label>
            {gramObject.gramText}           
          </div>
          <div className={styles.footer}>
            {gramObject.username} 
            { authState.username === gramObject.username && (
              <DeleteForeverIcon  className={styles.footerBtn} style={{color: 'red'}} onClick={() => {deleteGram(gramObject.id)}} />
              // <button onClick={() => {deleteGram(gramObject.id)}}> Delete Gram</button>   
            )}
            {/* Need to rework the edit portion of the gram */}
            { authState.username === gramObject.username && (
              <EditIcon onClick={() => {editGram("body")}} />
              // <button onClick={() => {editGram("body")}}>Edit Gram</button>
            )}  
          </div>
        </div>
        
        <div className={styles.addCommentContainer}>
          {/* grab values directly from inputs and set them into a state to use later (applies to the onChange)*/}
          <input 
            type="text" 
            placeholder="Add a comment..." 
            autoComplete='off'
            value={newComment} 
            onChange={(event) => {
              setNewComment(event.target.value)
            }}
          />
          <button onClick={addComment}>Add Comment</button>
          
        </div>
        <div className={styles.listOfComments}>
          {comments.map((comment, key) => {
            return(
              <div key={key} className={styles.comment}>
                 <label style={{ fontSize: '25px', color: 'green', padding: '5px'}}>{comment.username}:</label>
                {comment.commentBody}
                {/* NEED TO FIX DELETE COMMENT BUTTON FUNCTION */}
                {authState.username === comment.username && <DeleteForeverIcon  className={styles.commentBtn} style={{ color: 'red'}}onClick={() => {deleteComment(comment.id)}} />}
              </div>

            )
          })}
        </div>
      </div>
      <div className={styles.rightSide}>
        {/* Displays the map on the gram, if it is an adoption post */}
        {gramObject.isAdopt && (
            <>
              <div className={styles.mapLocation}>
               {gramObject.isFromShelter ? (
                <>
                  <h3>Location of the Shelter:</h3>
                </>
               ) : (
                <>
                  <h3>Approximate location of the cat:</h3>
                </>
               )} 
                <span style={{ fontSize: '16px', padding: '5px'}}>{gramObject.adoptInfoCity},</span>
                <span style={{ fontSize: '16px'}}>{gramObject.adoptInfoState}</span> 
                <span style={{ fontSize: '16px', padding: '5px'}}>{gramObject.adoptInfoZipcode}</span>
                
              </div>
                 <div id="mapContainer" className={styles.mapDisplay}></div>
            </>
          )}
          {gramObject.isAdopt &&(
            <>
            <div className={styles.adoptInfoContainer}>
              <h3>Adoption Information</h3>
              <div>
                <label>Cat Type:</label>
                {gramObject.adoptInfoCatType}
              </div>
              {gramObject.adoptInfoIsStray ? (
                <div>
                <label>Stray: </label> Yes
              </div>
              ) : (
                <div>
                <label>Stray: </label> No
              </div>
              )}
              <div>
                <label>Gender: </label>
                {gramObject.adoptInfoGender}
              </div>
            </div>
            </>
            )}
      </div>
    </div>
      
  )
}

export default Gram