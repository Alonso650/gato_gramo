import React from 'react'
import { useNavigate } from 'react-router-dom';
import { useForm } from "react-hook-form";
import { registrationSchema } from '../helpers/schema';
import { yupResolver } from '@hookform/resolvers/yup';
import axios from "axios";
import styles from './Registration.module.css';

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
    <div className={styles.registrationPage}>
      <form className={styles.formContainer} onSubmit={handleSubmit(onSubmit)}>
        <div>
          <h2>Gato-Gramo</h2>
          <h4>Sign up to see cat grams.</h4>
          <hr/>
        </div>
        <div className={styles.registerBox}>
        <label>Username</label>
          <input
            id="username"
            placeholder="Username"
            name="username"
            {...register('username')}
          />
        </div>
        <div className={styles.registerBox}>
        <label>First Name</label>
          <input
            id="firstName"
            placeholder="First Name"
            name="firstName"
            {...register('firstName')}
          />
        </div>
        <div className={styles.registerBox}>
        <label>Last Name</label>
          <input
            id="lastName"
            placeholder="Last Name"
            name="lastName"
            {...register('lastName')}
          />
        </div>
        <div className={styles.registerBox}>
        <label>Email</label>
          <input
            id="email"
            placeholder="Email"
            name="email"
            type="email"
            {...register('email')}
          />
        </div>
        <div className={styles.registerBox}>
        <label>Password</label>
          <input
            id="password"
            placeholder="Password"
            name="password"
            type="password"
            {...register('password')}
          />
        </div>
          <button type="Submit">Register</button>
      </form>
     </div>
  )
}

export default Registration