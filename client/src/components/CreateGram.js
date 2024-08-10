import React, { useState } from 'react'
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useForm } from "react-hook-form";
import { validationSchema } from "../helpers/schema"
import { yupResolver } from "@hookform/resolvers/yup"
import styles from './CreateGram.module.css'

const MAX_STEPS = 3;


function CreateGram(){
  const navigate = useNavigate();
  // const [isAdopt, setIsAdopt] = useState(false);
  // const [isFromShelter, setIsFromShelter] = useState(false);
  // const [isStray, setIsStray] = useState(false);
  const [formStep, setFormStep] = useState(0);
  const { watch, register, handleSubmit, formState:{errors}} = useForm({
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

  const watchedIsAdopt = watch("isAdopt");
  const watchedIsStray = watch("isStray");
  const watchedIsFromShelter = watch("isFromShelter");

  const completeFormStep = () => {
    if(formStep < 2){
      setFormStep(cur => cur + 1);
      console.log("step: " + (formStep + 1));
    }
  }
  const handleNextButton = (e) => {
    e.preventDefault();
    completeFormStep();
  }

  // refractor into its own component
  const renderButton = () => {
    if(formStep > 2){
      return undefined;
    } else if (formStep === 2 || (formStep === 1 && watchedIsAdopt === "false")){
      return (
        <button type="submit">Create Gram!</button>
      )
    } else {
      return (
        <button type="button" onClick={handleNextButton}>Next</button>
      )
    }
  }

  const goToPrevStep = () => {
    setFormStep(cur => cur - 1);
  }

  const submitForm = (data) => {

    if(formStep === 2 || (formStep === 1 && data.isAdopt === "false")){
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

    completeFormStep();
    }
    
  };

  /*
    NOTES: 
    FIX POSITIONING OF THE FORM SINCE ITS TOO LONG AND GOES INTO THE NAVBAR

  */

  return(
    <div className='createGramPage'>
     <form className="formContainer" 
        onSubmit ={handleSubmit(submitForm)}>
        {formStep < MAX_STEPS && (
          <div>
            {formStep > 0 && (
              <button onClick={goToPrevStep} type="button">Back</button>
            )}
            <p>
              Step {formStep + 1} of {MAX_STEPS}
            </p>
          </div>
        )}
        {formStep >= 0 && (
          <section className={formStep === 0 ? styles.block : styles.none}>
          <h1>Gram Creation</h1>  
  
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
          </section>
        )}
        
        {formStep >= 1 && (
          <section className={formStep === 1 ? styles.block : styles.none}>
          <label>Is this cat looking for a new home?</label>
          <div>
            <select
              {...register('isAdopt')}
              // onChange={handleAdoptChange}
            >
              <option value="">Select</option>
              <option value="true">Yes</option>
              <option value="false">No</option>
            </select>
          </div>

          {watchedIsAdopt === "true" &&(
            <>
            <label>Is This cat located at a shelter?</label>
            <div>
              <select
                {...register('isFromShelter')}
                // onChange={handleShelterChange}
              >
                <option value="">Select</option>
                <option value="true">Yes</option>
                <option value="false">No</option>
              </select>
            </div>

            <label> Is This a stray cat? </label>
            <div>
              <input
                type="checkbox"
                id="isStray"
                {...register('isStray')}
                // onChange={handleStrayChange}
              />
            </div>
            </>
          )}
          </section>
        )}


        {formStep >= 2 && (
          <section className={formStep === 2 ? styles.block : styles.none}>
          <h4>Enter approximate location of the cat: (Note: personal address won't show up on gram posts)</h4>
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
          </section>
        )}
 
        {formStep === 3 && (
          <section>
            <h2>Gram Created!</h2>
          </section>
        )}
        
        {renderButton()}
        <pre>
          {JSON.stringify(watch(), null, 2)}
          </pre>        
      </form>
    </div>
  )
}

export default CreateGram