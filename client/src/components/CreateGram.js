import React, { useState } from 'react'
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useForm } from "react-hook-form";
import { validationSchema } from "../helpers/schema"
import { yupResolver } from "@hookform/resolvers/yup"
import RenderButton from './RenderButton';
import styles from './CreateGram.module.css'
import { Chevronleft } from '@heroicons/react/24/solid'

const MAX_STEPS = 3;

function CreateGram(){
  const navigate = useNavigate();
  const [formStep, setFormStep] = useState(0);
  const { watch, register, handleSubmit, formState:{errors}, setValue} = useForm({
    defaultValues:{
      title: "",
      gramText: "",
      image: [],
      infoGender: "",
      infoBreed: "",
      infoHairPattern: "",
      infoCoatLength: "",
      isAdopt: "",
      isFromShelter: "",
      IsStray: "",
      adoptInfoStreet: "",
      adoptInfoCity: "",
      adoptInfoState: "",
      adoptInfoZipcode: "",
    },
    resolver: yupResolver(validationSchema),
  });

  const watchedIsAdopt = watch("isAdopt");

  const completeFormStep = () => {
    if(formStep === 0 || (formStep === 1 && watchedIsAdopt === 'true')){
      setFormStep(cur => cur + 1);
    }
    if(formStep === 1 && watchedIsAdopt === 'false'){
      handleSubmit(submitForm);
    }
  }

  const handleNextButton = (e) => {
    e.preventDefault();
    completeFormStep();
  }

  const goToPrevStep = () => {
    setFormStep(cur => cur - 1);
  }

  // const handleFileChange = (e) => {
  //   const files = e.target.files;
  //   setValue("images", files);
  // }

  const submitForm = (data) => {
    if(formStep === 2){
      const formData = new FormData();
      if(data.isFromShelter === 'true'){
        data.isStray = 'false';
      } else if (data.isStray === 'true'){
        data.isFromShelter = 'false';
      }

    // Array.from(data.images).forEach(file => {
    //   formData.append("images", file);
    //   console.log(file);
    // });
    
    // Looping through the list of images to add to the formData to send to the backend
    for(const imageFile of data.image){
      formData.append('image', imageFile);
    }
    
    /* Since I have named the file input as "image", to access the information
       I have to specify the name so data.image[0] allows access to the file.
       Then include all information in a formdata

    */
    formData.append("title", data.title);
    formData.append("gramText", data.gramText);
    formData.append("infoGender", data.infoGender);
    formData.append("infoBreed", data.infoBreed);
    formData.append("infoHairPattern", data.infoHairPattern);
    formData.append("infoCoatLength", data.infoCoatLength);
    // adoption info
    formData.append("isAdopt", data.isAdopt);
    formData.append("isStray", data.isStray);
    formData.append("isFromShelter", data.isFromShelter);
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
        console.log(response.data.image);
        navigate("/");
      })
      .catch((err) =>alert("File upload error: " + err.message))
    completeFormStep();
    // try{
    //   const response = axios.post("http://localhost:3001/grams", formData, {
    //     headers: {
    //       accessToken: localStorage.getItem("accessToken"),
    //       "Content-Type": "multipart/form-data"
    //     },
    //   });
    //   console.log(response.data.images);
    //   navigate("/");
    // } catch (error){
    //   alert("File Upload Error: " + error.message);
    // }
    // completeFormStep();

    } else if (formStep === 1 && data.isAdopt === "false"){
      const formData = new FormData();
      data.isAdopt = 'false';
      data.isFromShelter = data.isFromShelter === 'false'
      data.isStray = data.isStray === 'false';

      for(const imageFile of data.image){
        formData.append('image', imageFile);
        console.log(imageFile);
      }

      formData.append("title", data.title);
      formData.append("gramText", data.gramText);
      formData.append("infoGender", data.infoGender);
      formData.append("infoBreed", data.infoBreed);
      formData.append("infoHairPattern", data.infoHairPattern);
      formData.append("infoCoatLength", data.infoCoatLength);
      // adoption info
      formData.append("isAdopt", data.isAdopt);
      formData.append("isStray", data.isStray);
      formData.append("isFromShelter", data.isFromShelter);
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
    <div className={styles.createGramPage}>
     <form className={styles.formContainer} 
        onSubmit ={handleSubmit(submitForm)}>
        {formStep < MAX_STEPS && (
          <div>
            {formStep > 0 && (
              <button 
              onClick={goToPrevStep} type="button">Back
                {/* <svg xmlns="http://www.w3.org/2000/svg" 
                viewBox="0 0 20 30" 
                fill="currentColor">
              <path fill-rule="evenodd" 
              d="M7.72 12.53a.75.75 0 0 1 0-1.06l7.5-7.5a.75.75 0 1 1 1.06 1.06L9.31 12l6.97 6.97a.75.75 0 1 1-1.06 1.06l-7.5-7.5Z" 
              clip-rule="evenodd" 
              />
            </svg> */}
            
            </button>
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
  
          {/* <div>
            <label>Image:</label>
            <input
              type="file"
              name="image"
              {...register("image")}
              id="image"
            />
          </div> */}
          <div>
            <label>Image(s):</label>
            <input
              type="file"
              name="image"
              id="image"
              multiple
              {...register("image")}
              />
          </div>
          <div>
          <label>Gender: </label>
            <select
              {...register('infoGender')}
              >
                <option value="">Select</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="unsure">Unsure</option>
              </select>
          </div>
          <div>
          <label>Breed: </label>
          <input 
            type="text"
            name="breed"
            {...register('infoBreed')}
            id="breed"
          />
          </div>
          <div>
          <label>Hair Pattern: </label>
          <input
            type="text"
            name="hairpattern"
            {...register('infoHairPattern')}
            id="hairpattern"
          />
          </div>
          <div>
          <label>Coat Length: </label>
            <select
              {...register('infoCoatLength')}
              >
                <option value="">Select</option>
                <option value="short">Short</option>
                <option value="long">Long</option>
                <option value="None">None</option>
              </select>
          </div>
          </section>
        )}
        
        {formStep >= 1 && (
          <section className={formStep === 1 ? styles.block : styles.none}>
          <label>Is this cat looking for a new home?</label>
            <select
              {...register('isAdopt')}
            >
              <option value="">Select</option>
              <option value="true">Yes</option>
              <option value="false">No</option>
            </select>

          {watchedIsAdopt === "true" &&(
            <>
            <div>
            <label>Is This cat located at a shelter?</label>
              <select
                {...register('isFromShelter')}
              >
                <option value="">Select</option>
                <option value="true">Yes</option>
                <option value="false">No</option>
              </select>
            </div>

            <div>
            <label> Is This a stray cat? </label>
              <select
                {...register('isStray')}
              >
                <option value="">Select</option>
                <option value="true">Yes</option>
                <option value="false">No</option>
              </select>
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
        
        <RenderButton
          formStep={formStep}
          watchedIsAdopt={watchedIsAdopt}
          handleNextButton={handleNextButton}
        />
        {/* <pre>
          {JSON.stringify(watch(), null, 2)}
          </pre>         */}
      </form>
    </div>
  )
}

export default CreateGram