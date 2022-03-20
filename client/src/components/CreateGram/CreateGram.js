import React, {useState, useRef, useEffect, useContext} from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
// import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import NavBar from "../NavBar/NavBar";
import { AuthContext } from "../../helpers/AuthContext";
import { useHistory } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import authService from "../../services/auth.service";
import GramDataService from "../../services/gram.service";
import axios from "axios";


const CreateGram = () => {
   const { authState } = useContext(AuthContext);
    
   let id = useParams();    
   let navigate = useNavigate();


    const initialValues = {
        title: "",
        description: "",
    };


    const validationSchema = Yup.object().shape({
        title: Yup.string().required("You must input a title"),
        description: Yup.string().required(),
    });


    useEffect(() => {
      if(!localStorage.getItem("accessToken")){
        navigate("/");
      }
    },[])
    

    const onSubmit = (data) => {
        axios
           .post("http://localhost:8080/grams", data,{
             headers: { accessToken: localStorage.getItem("accessToken") },
           })
           .then((response) =>{
               navigate("/indexPage");
           })
    }

    
    // return(
    //     <div>
    //         <div>
    //             <NavBar />
    //             <Form onSubmit={onSubmit} ref={form}>
    //                 {!successful && (
    //                     <div>
    //                         <div className="form-group">
    //                             <label htmlFor="title">Title</label>
    //                             <Input
    //                                 type="text"
    //                                 className="form-control"
    //                                 name="title"
    //                                 value={title}
    //                                 onChange={onChangeTitle}
    //                             />
    //                         </div>
    //                         <div>{currentUser.id}</div>

    //                         <div className="form-group">
    //                             <label htmlFor="description">Description</label>
    //                             <Input
    //                                 type="paragraph"
    //                                 className="form-control"
    //                                 name="description"
    //                                 value={description}
    //                                 onChange={onChangeDescription}
    //                             />
    //                         </div>
    //                         <div className="form-group">
    //                             <label htmlFor="description">Username</label>
    //                             <Input
    //                                 type="paragraph"
    //                                 className="form-control"
    //                                 name="username"
    //                                 value={username}
    //                                 onChange={onChangeUsername}
    //                             />
    //                         </div>
    //                         <div className="form-group">
    //                             <button>Post Gram</button>
    //                         </div>
    //                     </div>
    //                 )}
    //                 { message &&(
    //                     <div className="form-group">
    //                         <div
    //                             className={ successful ? "alert alert-success" : "alert alert-danger"}
    //                             role="alert"
    //                         >
    //                             {message}
    //                         </div>
    //                     </div>
    //                 )}
    //                 <CheckButton style={{ display: "none" }} ref={checkBtn} />
    //             </Form>
    //         </div>
    //     </div>
    // );

    return(
        <div className="createGramPage">
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        <Form className="formContainer">
          <label>Title: </label>
          <ErrorMessage name="title" component="span" />
          <Field
            autocomplete="off"
            id="inputCreateGram"
            name="title"
            placeholder="(Ex. Title...)"
            
          />
          <label>Description: </label>
          <ErrorMessage name="description" component="span" />
          <Field
            autocomplete="off"
            id="inputCreateGram"
            name="description"
            placeholder="(Ex. Gram...)"
          />

          <button type="submit"> Create Gram</button>
        </Form>
      </Formik>
    </div>
    );

};

export default CreateGram;