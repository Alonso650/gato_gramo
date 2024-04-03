import React, { useContext, useEffect, useState } from 'react'
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../helpers/AuthContext";
import mapboxgl from "mapbox-gl"

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
          // mapboxgl.accessToken = 'pk.eyJ1IjoiaGVjdG9yYWxvbnpvdG9ycmVzIiwiYSI6ImNrODZrNWdzOTA4dG0zZnA5MmZnZWZ6YXEifQ.srAhuc_wTyhyOFLMDcXr2g';
          mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_API;
          const mapInstance = new mapboxgl.Map({
            container: 'mapContainer',
            style: 'mapbox://styles/mapbox/streets-v11',
            center: mapData.center,
            zoom: 250,
            interactive: false,
          });
          setMap(mapInstance);
        } else{
          map.setCenter(mapData.center);
          map.setZoom(12);
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
            'circle-color': 'rgba(255, 0, 0, 0.5)',
            'circle-stroke-color': 'rgba(255, 0, 0, 1)',
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
  
  return (
   
    <div className="gramPage">
      <div className="leftSide">
        <div className="gram" id="individual">
          <div className="title" 
            onClick={() => {
              if( authState.username === gramObject.username){
                editGram("title")
              }
            }}
          >
            {gramObject.title}{" "}
          </div>
          <div className="body">
            <img className="gramImage" src={gramObject.image} alt="gato pic"/>    
          </div>
            {gramObject.isAdopt &&(
            <>
            <div className="adoptInfoContainer">
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
              <h5>Approximate Location of the Cat</h5>
              <div>
                <label>City: </label>
                {gramObject.adoptInfoCity}
              </div>
              <div>
                <label>State: </label>
                {gramObject.adoptInfoState}
              </div>
              <div>
                <label>Zipcode: </label>
                {gramObject.adoptInfoZipcode}
              </div>
            </div>
            </>
            )}
          <div>
            <label>Description: </label>
            {gramObject.gramText}           
          </div>
          <div className="footer">
            {gramObject.username} 
            { authState.username === gramObject.username && (
              <button onClick={() => {deleteGram(gramObject.id)}}> Delete Gram</button>   
            )}
            {/* Need to rework the edit portion of the gram */}
            { authState.username === gramObject.username && (
              <button onClick={() => {editGram("body")}}>Edit Gram</button>
            )}  
          </div>
        </div>
      </div>
      <div className="rightSide">
        <div className="addCommentContainer">
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
          {/* Displays the map on the gram, if it is an adoption post */}
          <div id="mapContainer" style={{ width: '100%', height: '400px'}}></div>

        </div>
        
        <div className="listOfComments">
          {comments.map((comment, key) => {
            return(
              <div key={key} className="comment">
                {comment.commentBody}
                <label>Username: {comment.username}</label>
                {authState.username === comment.username && <button onClick={() => {deleteComment(comment.id)}}>Delete</button>}
              </div>
            )
          })}
        </div>
      </div>
    </div>
      
  )
}

export default Gram