import React from 'react'
import { useNavigate } from 'react-router-dom';
import { useForm } from "react-hook-form";
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

    const onSubmit = (data) => {
        axios.post("http://localhost:3001/auth", data).then(() => {
            console.log("Success!");
            navigate("/login");
        })
    }

  return (
    <div className="registrationPage">
      <form className="formContainer" onSubmit={handleSubmit(onSubmit)}>
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
      </form>
    </div>
  )
}

export default Registration