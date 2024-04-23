import { FormWrapper } from "./FormWrapper"

export function ShelterForm({ updateFields, isAdopt, isFromShelter }){

    return(
        <FormWrapper title="Adopt Info">
            <label>Is this cat looking for a new home</label>
            <select onChange={(e) => updateFields({ isAdopt: e.target.value === 'true'})}>
                <option value="null">Select</option>
                <option value="true">Yes</option>
                <option value="false">No</option>
            </select>

            {isAdopt && (
            <>
                <label>Is this cat located at a shelter?</label>
                    <select onChange={(e) => updateFields({ isFromShelter: e.target.value  === 'true'})}>
                        <option value="null">Select</option>
                        <option value="true">Yes</option>
                        <option value="false">No</option>
                    </select>
                
                {isFromShelter && (
                <>
                    <label> Street Address</label>
                    <input
                    type="text"
                    onChange={(e) => updateFields({ adoptInfoStreet: e.target.value })}
                />

                <label> City </label>
                <input
                    type="text"
                    onChange={(e) => updateFields({ adoptInfoCity: e.target.value })}
                />

                <label>State</label>
                <input
                    type="text"
                    onChange={(e) => updateFields({ adoptInfoState: e.target.value })}
                />
                <label>Zipcode</label>
                <input
                    type="text"
                    onChange={(e) => updateFields({ adoptInfoZipcode: e.target.value })}
                /> 
                </>
                )}
            </>
            )}
            

                               
        </FormWrapper>
    )
}