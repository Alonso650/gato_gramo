import { FormWrapper } from "./FormWrapper"
import { useEffect } from "react";

export function GramForm({ updateFields }){
    // const handleAdoptChange = (e) => {
    //     const value = e.target.value;
    //     console.log("adopt status: ", value);
    //     updateIsAdopt(value);
    // }


    const handleImageChange = (e) => {
        const file = e.target.files[0];
        console.log(file);
        if(file){
            updateFields({ image: file })
            console.log("success updatefields")
        }
    };

    

    return(
        <FormWrapper title="Gram Creation">
            <label>Title</label>
            <input 
            // NOTE was getting a big error with value = {title}
            // maybe cause it was overwriting the value
            // but after deleting it it fixed everything
            // plus I wasnt getting the actual image as well
            // so had to fix that also
                required
                type="text"
                onChange={(e) => updateFields({ title: e.target.value })}
            />
            <label>Description</label>
            <input
                required
                type="text"
                onChange={(e) => updateFields({ gramText: e.target.value })}
            />
            <label>Image Upload</label>
            <input
                required
                type="file"
                onChange={handleImageChange}
            />
            

        </FormWrapper>
    )
}