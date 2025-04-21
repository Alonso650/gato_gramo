import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from "react-router-dom"
import axios from "axios"
import { useForm } from "react-hook-form"
import { validateionSchema } from "../helpers/schema"
import RenderButton from './RenderButton';
import styles from './CreateGram.module.css'

const MAX_STEPS = 3;
function EditGram(){
    let { id } = useParams();
    const [gramObject, setGramObject] = useState({});
    const [formStep, setFormStep] = useState(0);
    const {register, reset, handleSubmit, watch} = useForm();
    let navigate = useNavigate();

    // Might have to include steps since its editing the gram to refer back to the 
    // process
    const watchedIsAdopt = watch("isAdopt");
    useEffect(() => {
        const fetchData = async () => {
            try{
                const gramResponse = await axios.get(`http://localhost:3001/grams/byId/${id}`);
                setGramObject(gramResponse.data);

                console.log(gramResponse.data);
            } catch (error) {
                console.error("Error fetching data: ", error);
            }
        };

        fetchData();
    }, [id]);

    const completeFormStep = () => {
        if(formStep === 0 || (formStep === 1 && watchedIsAdopt === 'true')){
            setFormStep(cur => cur + 1);
        }
        if(formStep === 1 && watchedIsAdopt === 'false'){
            handleSubmit(submitEditForm);
        }
    }

    const handleNextButton = (e) => {
        e.preventDefault();
        completeFormStep();
    }

    const goToPrevStep = () => {
        setFormStep(cur => cur - 1);
    }
    const submitEditForm = (editData) => {
        if(formStep === 2){
            
        }
    }




    return(
        <div>
            <h1>Edit Gram boi {gramObject.id} </h1>
        </div>
    )
}

export default EditGram