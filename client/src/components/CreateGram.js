import React, { useState } from 'react'
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useForm } from "react-hook-form";
import { validationSchema } from "../helpers/schema"
import { yupResolver } from "@hookform/resolvers/yup"


function CreateGram(){
  const navigate = useNavigate();
  const [isAdopt, setIsAdopt] = useState(false);
  const {register, handleSubmit, formState:{errors, isDirty}} = useForm({
    defaultValues:{
      title: "",
      gramText: "",
      image: "",
      isAdopt: "",
      adoptInfoGender: "",
      adoptInfoLocation: "",
      adoptInfoCatType: "",
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
    // adoption info
    formData.append("isAdopt", data.isAdopt);
    formData.append("adoptInfoGender", data.adoptInfoGender);
    formData.append("adoptInfoLocation", data.adoptInfoLocation);
    formData.append("adoptInfoCatType", data.adoptInfoCatType);

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

  // const handleAdoptChanges = () => {
  //   // If isAdopt changes, reset adoptinfo fields
  //   if(!isDirty('isAdopt')){
  //     register('adoptInfoCatType').setValue("");
  //     register('adoptInfoGender').setValue("");
  //     register('adoptInfoLocation').setValue("");
  //   }
  // };

  const handleAdoptChange = (e) => {
    setIsAdopt(e.target.value === 'true');
  };

  return(
    <div className='createGramPage'>
     <form className="formContainer" 
         onSubmit ={handleSubmit(submitForm)}>
          <h1>Gram Creation</h1>
        {/* Depending on what user answers will display adoption info */}

        <label>Is this cat looking for a new home?</label>
        <div>
          
            <select
              {...register('isAdopt')}
              onChange={handleAdoptChange}
            >
              <option value="">Select</option>
              <option value="true">Yes</option>
              <option value="false">No</option>
            </select>
        </div>
      
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
          type="text"
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

        {isAdopt && (
          <>
            <select name="catGender" id="adoptInfoGender" {...register('adoptInfoGender')}>
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>

            <input
              id="adoptInfoLocation"
              placeholder="Enter location"
              name="adoptInfoLocation"
              {...register("adoptInfoLocation")}
            />

            <input
              id="adoptInfoCatType"
              placeholder="Cat Type"
              name="adoptInfoCatType"
              {...register("adoptInfoCatType")}
            />
          </>
        )}
          

        <button type="submit">Create Gram</button>
      </form>
    </div>
  )
}

export default CreateGram