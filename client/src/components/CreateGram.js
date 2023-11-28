import React from 'react'
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useForm } from "react-hook-form";
import { validationSchema } from "../helpers/schema"
import { yupResolver } from "@hookform/resolvers/yup"


function CreateGram(){
  const navigate = useNavigate();
  const {register, handleSubmit, formState:{errors}} = useForm({
    defaultValues:{
      title: "",
      gramText: "",
      image: "",
    },
    resolver: yupResolver(validationSchema),
  });

  const submitForm = (data) => {
    const formData = new FormData();
    
    /* Since I have named the file input as "image", to access the information
       I have to specify the name so data.image[0] allows access to the file.
       Then include all information in a formdata

    */
    formData.append("image", data.image[0]);
    formData.append("gramText", data.gramText);
    formData.append("title", data.title);

    axios.post("http://localhost:3001/grams", formData,{ 
      headers: {
        accessToken: localStorage.getItem("accessToken"),
        "Content-Type": "multipart/form-data"
      },
      }).then((response) => {
        console.log(response);
        navigate("/");
      })
      .catch((err) =>alert("File upload error: " + err.message))
  };

  return(
    <div className='createGramPage'>
     <form className="formContainer" 
         onSubmit ={handleSubmit(submitForm)}>
        
        {/* <label>Title:</label> */}
        <input
          id="title"
          name="title"
          placeholder="Title"
          {...register('title')}
          /> 

         {/* <label>Description:</label> */}
        <input
          id="gramText"
          placeholder="Description"
          name="gramText"
          {...register('gramText')}
        />
        
        {/* <label>Image:</label> */}
        <div>
          <label>Image:</label>
        <input
            type="file"
            name="image"
            {...register("image")}
            id="image"
          />
        </div>
          

        <button type="submit">Create Gram</button>
      </form>
    </div>
  )
}

export default CreateGram