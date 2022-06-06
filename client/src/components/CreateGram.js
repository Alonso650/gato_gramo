import React, { useContext, useEffect, useState } from 'react'
import { Formik, Form, Field, ErrorMessage } from "formik"; 
import { useNavigate } from "react-router-dom";
import * as Yup from 'yup';
import axios from "axios";
import { AuthContext } from "../helpers/AuthContext"

// imports for firebase
import { storage } from "../firebase";
import { ref, uploadBytes, listAll, getDownloadURL } from 'firebase/storage';
// import used to create randomized letters
import { v4 } from 'uuid';

function CreateGram() {
    const navigate = useNavigate();
    const [imageUpload, setImageUpload] = useState(null);
    const [imageList, setImageList] = useState([]);

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

      // lines of code involving images
      listAll(imageListRef).then((response) => {
        response.items.forEach((item) => {
          getDownloadURL(item).then((url) => {
            // the url gets added onto the end of the
            // list of images
            setImageList((prev) => [...prev, url])
          })
        })
      });
    }, []);

    const validationSchema = Yup.object().shape({
        title: Yup.string().required("You must input a title"),
        gramText: Yup.string().required("You must input a description"),
    })

    const imageListRef = ref(storage, "images/");

    const uploadImage = () => {
      if(imageUpload == null){
        return;
      }
      // creating a reference to the storage in firebase
      // the second argument is the path/name of the image file 
      const imageRef = ref(storage, `images/${imageUpload.name + v4()}`);
      
      // 2 arguments: reference where to upload, image you want to upload
      uploadBytes(imageRef, imageUpload).then((snapshot) => {
        // snapshot.ref makes a reference to the image that was uploaded
        // then it gets added onto the end of the list of images
        getDownloadURL(snapshot.ref).then((url) => {
          setImageList((prev) => [...prev, url])
        })
      });
    }

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