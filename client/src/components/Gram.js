import React, { useContext, useEffect, useState } from 'react'
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../helpers/AuthContext";

function Gram() {
  let { id } = useParams();
  const [gramObject, setGramObject] = useState({});
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
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
    } catch (error) {
        console.error("Error fetching data:", error);
    }
    };

    fetchData();
  }, [id]);

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