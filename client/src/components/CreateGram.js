import React, { useState } from 'react'
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useForm } from "react-hook-form";
import { validationSchema } from "../helpers/schema"
import { yupResolver } from "@hookform/resolvers/yup"


function CreateGram(){
  const navigate = useNavigate();
  const [isAdopt, setIsAdopt] = useState(false);
  const [isFromShelter, setIsFromShelter] = useState(false);
  const [isStray, setIsStray] = useState(false);
  // const [isStray, setIsStray] = useState(false);
  const {register, handleSubmit, formState:{errors}} = useForm({
    defaultValues:{
      title: "",
      gramText: "",
      image: "",
      isAdopt: "",
      isFromShelter: "",
      adoptInfoGender: "",
      IsStray: "",
      adoptInfoCatType: "",
      adoptInfoStreet: "",
      adoptInfoCity: "",
      adoptInfoState: "",
      adoptInfoZipcode: "",
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
    formData.append("isFromShelter", data.isFromShelter);
    formData.append("adoptInfoGender", data.adoptInfoGender);
    formData.append("adoptInfoCatType", data.adoptInfoCatType);
    formData.append("isStray", data.isStray);
    formData.append("adoptInfoStreet", data.adoptInfoStreet); 
    formData.append("adoptInfoCity", data.adoptInfoCity);
    formData.append("adoptInfoState", data.adoptInfoState);
    formData.append("adoptInfoZipcode", data.adoptInfoZipcode);
    

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

  const handleAdoptChange = (e) => {
    setIsAdopt(e.target.value === 'true');
  };

  const handleShelterChange = (e) => {
    setIsFromShelter(e.target.value === 'true');
  };

  const handleStrayChange = (e) => {
    setIsStray(e.target.value === 'true');
  };

  /*
    NOTES: 
    FIX POSITIONING OF THE FORM SINCE ITS TOO LONG AND GOES INTO THE NAVBAR

  */

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
        <div>
          <input
            id="adoptInfoCatType"
            placeholder="Cat Type"
            name="adoptInfoCatType"
            {...register("adoptInfoCatType")}
          />
        </div>
        <div>
        <select name="catGender" id="adoptInfoGender" {...register('adoptInfoGender')}>
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="unsure">Unsure</option>
          </select>
        </div>
  
        {isAdopt &&(
        <>
          <label>Is This cat located at a shelter?</label>
          <div>
            <select
              {...register('isFromShelter')}
                onChange={handleShelterChange}
            >
              <option value="">Select</option>
              <option value="true">Yes</option>
              <option value="false">No</option>
            </select>
          </div>

          {!isFromShelter &&(
            <>
              <label> Is this a stray cat? </label>
              <div>
                <select {...register('isStray')} onChange={handleStrayChange}>
                  <option value="">Select</option>
                  <option value="true">Yes</option>
                  <option value="false">No</option>
                </select>
              </div>
            </>
          )}

          {/* {isAdopt && isStray &&(
            <>
              {!isStray &&  (
                <>
                  <h4> Enter location of the cat: (Note personal address will not be shown on the map only approximate location)</h4>
                </>
              )} */}
          {!isFromShelter && (
            <>
            <label> Is this a stray cat? </label>
            <div>
              <select {...register('isStray')} onChange={handleStrayChange}>
                <option value="">Select</option>
                <option value="true">Yes</option>
                <option value="false">No</option>
              </select>
            </div>

            {isStray && (
              <>
              <h4> Whatd up</h4>
              <input
              id="adoptInfoStreet"
              placeholder="Enter street address"
              name="adoptInfoStreet"
              {...register("adoptInfoStreet")}
            />

            <input
              id="adoptInfoCity"
              placeholder="Enter the City"
              name="adoptInfoCity"
              {...register("adoptInfoCity")}
            />

            <input
              id="adoptInfoState"
              placeholder="Enter state"
              name="adoptInfoState"
              {...register("adoptInfoState")}
            />

            <input
              id="adoptInfoZipcode"
              placeholder="Enter Zipcode"
              name="adoptInfoZipcode"
              {...register("adoptInfoZipcode")}
            />
            </>
  
          )}
        </>
      )}
          
          {!isFromShelter && isStray &&(
            <>
            <h4>Enter approximate location of the cat (Note: personal street address will not be shown on map)</h4>
            {/* <h4> Enter the location of the animal shelter:</h4> */}
            <input
              id="adoptInfoStreet"
              placeholder="Enter street address"
              name="adoptInfoStreet"
              {...register("adoptInfoStreet")}
            />

            <input
              id="adoptInfoCity"
              placeholder="Enter the City"
              name="adoptInfoCity"
              {...register("adoptInfoCity")}
            />

            <input
              id="adoptInfoState"
              placeholder="Enter state"
              name="adoptInfoState"
              {...register("adoptInfoState")}
            />

            <input
              id="adoptInfoZipcode"
              placeholder="Enter Zipcode"
              name="adoptInfoZipcode"
              {...register("adoptInfoZipcode")}
            />

            </>
          )}
        </>
        )}
        <button type="submit">Create Gram</button>
      </form>
    </div>
  )
}

export default CreateGram