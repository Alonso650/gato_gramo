import React, { useContext, useEffect } from 'react'
import { Formik, Form, Field, ErrorMessage } from "formik"; 
import { useNavigate } from "react-router-dom";
import * as Yup from 'yup';
import axios from "axios";
import { AuthContext } from "../helpers/AuthContext"

function CreateGram() {
    const navigate = useNavigate();

    const { authState } = useContext(AuthContext);

    const initialValues = {
        title: "",
        gramText: "",
    };

    // if no empty array then it would run infinitly 
    // causes the user to be redirected to the login page
    // if they are not signed in 
    useEffect(() => {
      if (!localStorage.getItem("accessToken")){
        navigate("/login");
      }
    }, []);

    const validationSchema = Yup.object().shape({
        title: Yup.string().required("You must input a title"),
        gramText: Yup.string().required("You must input a description"),
    })

    const onSubmit = (data) => {

        axios.post("http://localhost:3001/grams", data, { headers: {accessToken: localStorage.getItem("accessToken")},
      }).then((response) => {
            navigate("/");
        })
    }

  return (
    <div className="createGramPage"> 
        <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
            <Form className="formContainer">
                <label>Title:</label>
                <ErrorMessage name="title" component="span"/>
                <Field 
                  id="inputCreateGram" 
                  name="title" 
                  placeholder="(Ex...Title)"
                />
                <label>Description:</label>
                <ErrorMessage name="gramText" component="span"/>
                <Field 
                  id="inputCreateGram" 
                  name="gramText" 
                  placeholder="(Ex...Gram)"
                />

                <button type="submit">Create a Gram</button>
            </Form>
        </Formik>
    </div>
  )
}

export default CreateGram