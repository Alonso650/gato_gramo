import React, { useContext, useEffect, useState } from 'react'
import { Formik, Form, Field, ErrorMessage } from "formik"; 
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useForm } from "react-hook-form";
import { AuthContext } from "../helpers/AuthContext"
import { validationSchema } from "../helpers/schema"
import { yupResolver } from "@hookform/resolvers/yup"

// imports for firebase
// import { storage } from "../firebase";
// import { ref, uploadBytes, listAll, getDownloadURL } from 'firebase/storage';
// import used to create randomized letters
// import { v4 } from 'uuid';
// import { Image } from "cloudinary-react"

function CreateGram() {
    const navigate = useNavigate();
    const [imageUpload, setImageUpload] = useState("");

    const { authState } = useContext(AuthContext);
    const {register, handleSubmit, formState:{errors}} = useForm({
      defaultValues:{
        title: "",
        gramText: "",
      },
      resolver: yupResolver(validationSchema),
    });
    

    // if no empty array then it would run infinitly 
    // causes the user to be redirected to the login page
    // if they are not signed in 
    useEffect(() => {
      if (!localStorage.getItem("accessToken")){
        navigate("/login");
      }
    }, []);

    


    const uploadImage = () => {
      // can hold the data 
      const formData = new FormData();
      formData.append("file", imageUpload);
      formData.append("upload_preset", "uuulgr2b")

      axios.post("https://api.cloudinary.com/v1_1/alonso650/image/upload", formData).then((response) => {
        console.log(response)
      })
    };



    const submitForm = (data) => {
        axios.post("http://localhost:3001/grams", data, { 
          headers: {
            accessToken: localStorage.getItem("accessToken"),
            // 'content-type': 'multipart/form-data',
          },
      }).then((response) => {
         navigate("/");
        })
    }

  return (
    <div className="createGramPage">
      <form className="formContainer" 
         onSubmit ={handleSubmit(submitForm)}>
        
        <label>Title:</label>
        <input
          id="title"
          placeholder="(Ex..Title)"
          {...register('title')}
          />

        <label>Description:</label>
        <input
          id="gramText"
          placholder="(Ex...gramText)"
          {...register('gramText')}
        />
        {/* <label>Image:</label>
          <input
            type="file"
            onChange={(event) => {
              setImageUpload(event.target.files[0]);
            }}
          /> */}
        <button type="submit">Submit</button>
        </form>
    </div>
  )
}

export default CreateGram