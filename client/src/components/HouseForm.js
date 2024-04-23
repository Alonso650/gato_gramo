import { FormWrapper } from "./FormWrapper"

export function HouseForm({ updateFields}){
    return(
        <FormWrapper title="Adopt Info">
            <h3>Enter location of cat: (Note: home addresses will not be shown on maps</h3>
                <h3>instead approximate locations would be shown)</h3>
            <label> Street: </label>
            <input 
                type="text"
                onChange={(e) => updateFields({ adoptInfoStreet: e.target.value })}
            />

            <label>City: </label>
            <input
                type="text"
                onChange={(e) => updateFields({ adoptInfoCity: e.target.value })}
            />

            <label>State: </label>
            <input
                type="text"
                onChange={(e) => updateFields({ adoptInfoState: e.target.value })}
            />

            <label>Zipcode: </label>
            <input
                type="text"
                onChange={(e) => updateFields({ adoptInfoZipcode: e.target.value })}
            />
        </FormWrapper>
    )
}