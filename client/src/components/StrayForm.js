import { FormWrapper } from "./FormWrapper"

export function StrayForm({ updateFields, isStray }){
    const handleStrayChange = (e) => {
        const isStrayValue = e.target.value === 'true';
        updateFields({ isStray: isStrayValue });
        if(!isStrayValue){
            updateFields({ isFromHome: true });
        } else {
            updateFields({ isFromHome: false });
        }
    };

    return(
        <FormWrapper title="Adopt Info">
            <label>Is this a stray cat?</label>
            {/* <select onChange={(e) => updateFields({ isStray: e.target.value  === 'true'})}> */}
                <select onChange={handleStrayChange}>
                <option value="null">Select</option>
                <option value="true">Yes</option>
                <option value="false">No</option>
            </select>

            {isStray ? (
                <>
                    <h3>Enter approximate location of the cat:</h3>
                    <label>Street</label>
                    <input
                        type="text"
                    onChange={(e) => updateFields({ adoptInfoStreet: e.target.value})}
                    />

                    <label>City</label>
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
            ) : null}
            
        </FormWrapper>
    )
}