import React from 'react'
import { useNavigate } from 'react-router-dom';
// import { Formik, Form, Field, ErrorMessage } from "formik"; 
import { useForm } from "react-hook-form";
//import * as Yup from 'yup';
import { registrationSchema } from '../helpers/schema';
import { yupResolver } from '@hookform/resolvers/yup';
import axios from "axios";

function Registration() {
    const navigate = useNavigate();
    const {register, handleSubmit, formState:{errors}} = useForm({
      defaultValues:{
        username: "",
        firstName: "",
        lastName: "",
        email: "",
        password: "",
      },
      resolver: yupResolver(registrationSchema),
    });
    // const initialValues = {
    //     username: "",
    //     firstName: "",
    //     lastName: "",
    //     email: "",
    //     password: "",
    // };

    // const validationSchema = Yup.object().shape({
    //     username: Yup.string().min(3).max(64).required("You must input a name"),
    //     firstName: Yup.string().min(3).max(64).required("You must input a first name"),
    //     lastName: Yup.string().min(3).max(64).required("You must input a last name"),
    //     email: Yup.string().min(3).max(64).required("You must input a email"),
    //     password: Yup.string().min(4).max(20).required(),
    // });

    const submitForm = (data) => {
      const formData = new FormData();
      formData.append("username", data.username);
      formData.append("firstName", data.firstName);
      formData.append("lastName", data.lastName);
      formData.append("email", data.email);
      formData.append("password", data.password);
        axios.post("http://localhost:3001/auth", data).then(() => {
            console.log(data);
            //navigate("/login");
        })
    }

  return (
    // <div className="createGramPage"> 
    //     <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
    //         <Form className="formContainer">
    //             <label>Username:</label>
    //             <ErrorMessage name="username" component="span"/>
    //             <Field 
    //               id="username" 
    //               name="username" 
    //               placeholder="(Ex....CatFan123)"
    //             />
    //             <label>First Name:</label>
    //             <ErrorMessage name="firstName" component="span"/>
    //             <Field 
    //               id="firstName" 
    //               name="firstName" 
    //               placeholder="(Ex...Pablo)"
    //             />
    //             <label>Last Name:</label>
    //             <ErrorMessage name="lastName" component="span"/>
    //             <Field 
    //               id="lastName" 
    //               name="lastName" 
    //               placeholder="(Ex...Johnson)"
    //             />
    //             <label>Email:</label>
    //             <ErrorMessage name="email" component="span"/>
    //             <Field 
    //               id="email" 
    //               name="email" 
    //               placeholder="(Ex...catfan123@aol.com)"
    //             />
    //             <label>Password:</label>
    //             <ErrorMessage name="password" component="span"/>
    //             <Field
    //               id="password"
    //               name="password"
    //               placeholder="Password"
    //               type="password"
    //             />

    //             <button type="submit">Register</button>
    //         </Form>
    //     </Formik>
    // </div>
    <div className="registrationPage">
      <div className="formContainer" onSubmit={handleSubmit(submitForm)}>
        <label>Username:</label>
          <input
            id="username"
            placeholder="(Ex...CatFan123)"
            name="username"
            {...register('username')}
          />
        <label>First Name:</label>
          <input
            id="firstName"
            placeholder="(Ex...Joe)"
            name="firstName"
            {...register('firstName')}
          />

        <label>Last Name:</label>
          <input
            id="lastName"
            placeholder="(Ex...Smith)"
            name="lastName"
            {...register('lastName')}
          />
        <label>Email:</label>
          <input
            id="email"
            placeholder="(Ex....catfan@aol.com)"
            name="email"
            type="email"
            {...register('email')}
          />
        <label>Password:</label>
          <input
            id="password"
            placeholder="(Ex...secret word)"
            name="password"
            type="password"
            {...register('password')}
          />
        <button type="submit">Submit</button>
        
      </div>
    </div>
  )
}

export default Registration