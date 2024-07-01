import React, { useState } from 'react'
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useForm } from "react-hook-form";
import { validationSchema } from "../helpers/schema"
import { yupResolver } from "@hookform/resolvers/yup"
import { MultistepForm } from "./MultistepForm";
import { GramForm } from './GramForm';
import { ShelterForm } from './ShelterForm';
import { StrayForm } from './StrayForm'
import { HouseForm } from './HouseForm';
import styles from './CreateGram.module.css';


function CreateGram(){
  const navigate = useNavigate();
  //const [isAdopt, setIsAdopt] = useState(false);
  const [data, setData] = useState({
    title: "",
    gramText: "",
    image: "",
    adoptInfoStreet: "",
    adoptInfoCity: "",
    adoptInfoState: "", 
    adoptInfoZipcode: 0,
    isFromShelter: false,
    isAdopt: false,
    isStray: false,
    // adding this flag for the last part of the adoption from
    isFromHome: false,
  })




  const updateFields = (fields) => {
    setData(prev => {
      return { ...prev, ...fields};
    });
  };

  // const updateIsAdopt = (value) => {
  //   setData((prev) => ({
  //     ...prev,
  //     isAdopt: value,
  //   }));
  // };

  
  const { currentStepIndex, step, steps, isFirstStep, isLastStep, next, back } = MultistepForm([
    <GramForm {...data} updateFields={updateFields} />,
    <ShelterForm {...data} updateFields={updateFields} isAdopt={data.isAdopt} isFromShelter={data.isFromShelter} />,
    <StrayForm {...data} updateFields={updateFields} isStray={data.isStray}/>,
    <HouseForm {...data} updateFields={updateFields} isFromHome={data.isFromHome} />
  ])

  console.log("Succes from isfromhome");
  const submitForm = (e) => {
    // prevents the default form submission behavior allowing the form
    // to go to next
    e.preventDefault();
    if(!isLastStep){
      if(currentStepIndex === 1 && data.isAdopt === false){
        alert("Gram created since cat not looking for a new home");
        console.log("data in the if statement: ", data);
      } else {
        alert("went to next");
        return next();
      }
    }
    
    console.log("Submitting form...");
    console.log("FormData: ", data);
    const formData = new FormData();
    // console.log(imageData);
    console.log(data.title);
    console.log(typeof data.isAdopt);
    
    /* Since I have named the file input as "image", to access the information
       I have to specify the name so data.image[0] allows access to the file.
       Then include all information in a formdata

    */
    formData.append("image", data.image);
    formData.append("gramText", data.gramText);
    formData.append("title", data.title);
    formData.append("isAdopt", data.isAdopt);
    formData.append("isStray", data.isStray);
    formData.append("isFromShelter", data.isFromShelter);
    formData.append("isFromHome", data.isFromHome);
    formData.append("adoptInfoStreet", data.adoptInfoStreet);
    formData.append("adoptInfoCity", data.adoptInfoCity);
    formData.append("adoptInfoState", data.adoptInfoState);
    formData.append("adoptInfoZipcode", data.adoptInfoZipcode);

    console.log("Form data before axios: ", formData);
    
    
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

    alert("Success creation after api call");
    
  };

  return(
    <div className={styles.createGramPage}>
     <form className={styles.formContainer} 
        onSubmit ={submitForm}>
        <div style={{ position: "absolute", top: ".5rem", right: ".5rem" }}>
          {/* {currentStepIndex + 1} / {steps.length} */}
        </div>
        {step}
        <div style={{
              marginTop: "1rem",
              display: "flext",
              gap: ".5rem",
              justifyContent: "flex-end",
            }}
        >
          {!isFirstStep && (
            <button type="button" onClick={back}>
              Back
            </button>
          )}
        {/* <button type="submit">{isLastStep ? (data.isAdopt === false ? "Create Gram" : "Submit") : "Next"}</button> */}
        <button type="submit">
          { (data.isFromShelter || data.isStray || data.isFromHome) ? "Submit" : "Next"}
        </button>        
        </div>
      </form>
    </div>
  )
}

export default CreateGram