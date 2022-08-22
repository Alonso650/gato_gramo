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
    const { authState } = useContext(AuthContext);
    const {register, handleSubmit, formState:{errors}} = useForm({
      defaultValues:{
        // title: "",
        // gramText: "",
        file: "",
      },
      resolver: yupResolver(validationSchema),
    });

    const [image, setImage] = useState('');

    const convert2base64 = file =>{
      const reader = new FileReader();

      reader.onloadend = () => {
        setImage(reader.result.toString());
      }

      reader.readAsDataURL(file);
    }
    
    

    // if no empty array then it would run infinitly 
    // causes the user to be redirected to the login page
    // if they are not signed in 
    useEffect(() => {
      if (!localStorage.getItem("accessToken")){
        navigate("/login");
      }
    }, []);

    


    // const uploadImage = () => {
    //   // can hold the data 
    //   const formData = new FormData();
    //   formData.append("file", imageUpload);
    //   formData.append("upload_preset", "uuulgr2b")

    //   axios.post("https://api.cloudinary.com/v1_1/alonso650/image/upload", formData).then((response) => {
    //     console.log(response)
    //   })
    // };



    const submitForm = (data) => {
        // const formData = new FormData();
        // for(const key in data){
        //   formData.append(key, data[key]);
        // }


        
        // for(var pair of formData.entries()){
        //   console.log(pair[1]);
        // }
        console.log(data);
        convert2base64(data.files[0]);
        
        // formData.append("image", file);
        // for(var pair of formData.entries()){
        //   console.log(pair[0])
        // }
        // formData.append("data", data)
        // console.log(formData)
        axios.post("http://localhost:3001/grams", data,{ 
          headers: {
            accessToken: localStorage.getItem("accessToken"),
          },
      }).then((response) => {
         navigate("/");
        })
    }



    

  return (
    <div className="createGramPage">
      <form className="formContainer" 
         onSubmit ={handleSubmit(submitForm)}>
        
        {/* <label>Title:</label>
        <input
          id="title"
          placeholder="(Ex..Title)"
          {...register('title')}
          /> */}

        {/* <label>Description:</label>
        <input
          id="gramText"
          placholder="(Ex...gramText)"
          {...register('gramText')}
        /> */}
        <label>Image:</label>
          <input
            type="file"
            {...register("file")}
            id="file"
          />
        <input type="submit"/>
        </form>
    </div>
  )

}

export default CreateGram