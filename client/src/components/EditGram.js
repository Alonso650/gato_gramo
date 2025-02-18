import React, { useState } from 'react'
import { useNavigate } from "react-router-dom"
import axios from "axios"
import { useForm } from "react-hook-form"
import { validateionSchema } from "../helpers/schema"
import RenderButton from './RenderButton';
import styles from './CreateGram.module.css'

function EditGram(){



    return(
        <div>
            <h1>Edit Gram boi</h1>
        </div>
    )
}

export default EditGram