import React from 'react'

const RenderButton = ({ formStep, watchedIsAdopt, handleNextButton }) => {
    if(formStep > 2){
        return null;
      } else if (formStep === 2 || (formStep === 1 && watchedIsAdopt === "false")){
        return (
          <button type="submit">Create Gram!</button>
        );
      } else {
        return (
          <button type="button" onClick={handleNextButton}>Next</button>
        );
    }
};

export default RenderButton;