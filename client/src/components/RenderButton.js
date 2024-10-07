import React from 'react'
import styles from './CreateGram.module.css'

const RenderButton = ({ formStep, watchedIsAdopt, handleNextButton }) => {
    if(formStep > 2){
        return null;
      } else if (formStep === 2 || (formStep === 1 && watchedIsAdopt === "false")){
        return (
            <button type="submit">Create Gram!</button>
            );
      } else {
        return (
          <button className={styles.gramBttn} type="button" onClick={handleNextButton}>Next</button>
        );
    }
};

export default RenderButton;