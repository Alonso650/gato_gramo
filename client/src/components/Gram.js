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

  useEffect(() => {
      axios.get(`http://localhost:3001/grams/byId/${id}`).then((response) => {
        setGramObject(response.data);
      });

      axios.get(`http://localhost:3001/comments/${id}`).then((response) => {
        setComments(response.data);
      },[])
  })

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
          <div className="body"
            onClick={() => {
              if( authState.username === gramObject.username){
                editGram("body")
              }
            }}
          >
            {gramObject.gramText}{" "}
          </div>
          <div className="footer">
            {gramObject.username} 
            { authState.username === gramObject.username && (
              <button onClick={() => {deleteGram(gramObject.id)}}> Delete Gram</button>
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