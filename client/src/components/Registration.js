import React from 'react'
import { Formik, Form, Field, ErrorMessage } from "formik"; 
import * as Yup from 'yup';
import axios from "axios";

function Registration() {

    const initialValues = {
        username: "",
        firstName: "",
        lastName: "",
        email: "",
        password: "",
    };

    const validationSchema = Yup.object().shape({
        username: Yup.string().min(3).max(64).required("You must input a name"),
        firstName: Yup.string().min(3).max(64).required("You must input a first name"),
        lastName: Yup.string().min(3).max(64).required("You must input a last name"),
        email: Yup.string().min(3).max(64).required("You must input a email"),
        password: Yup.string().min(4).max(20).required(),
    });

    const onSubmit = (data) => {
        axios.post("http://localhost:3001/auth", data).then(() => {
            console.log(data);
        })
    }

  return (
    <div className="createGramPage"> 
        <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
            <Form className="formContainer">
                <label>Username:</label>
                <ErrorMessage name="username" component="span"/>
                <Field 
                  id="username" 
                  name="username" 
                  placeholder="(Ex....CatFan123)"
                />
                <label>First Name:</label>
                <ErrorMessage name="firstName" component="span"/>
                <Field 
                  id="firstName" 
                  name="firstName" 
                  placeholder="(Ex...Pablo)"
                />
                <label>Last Name:</label>
                <ErrorMessage name="lastName" component="span"/>
                <Field 
                  id="lastName" 
                  name="lastName" 
                  placeholder="(Ex...Johnson)"
                />
                <label>Email:</label>
                <ErrorMessage name="email" component="span"/>
                <Field 
                  id="email" 
                  name="email" 
                  placeholder="(Ex...catfan123@aol.com)"
                />
                <label>Password:</label>
                <ErrorMessage name="password" component="span"/>
                <Field
                  id="password"
                  name="password"
                  placeholder="Password"
                  type="password"
                />

                <button type="submit">Register</button>
            </Form>
        </Formik>
    </div>
  )
}

export default Registration