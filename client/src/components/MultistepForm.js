import { useState } from "react";

export function MultistepForm(steps){
    const [currentStepIndex, setCurrentStepIndex] = useState(0);
    // const [formData, setFormData] = useState({});

    const next = () => {
        setCurrentStepIndex((i) => {
            if(i >= steps.length - 1){
                return i;
            }
            return i + 1;
        });
    };

    const back = () => {
        setCurrentStepIndex((i) => {
            if(i <= 0){
                return i;
            }
            return i - 1;
        })
    }

    function goTo(index){
        setCurrentStepIndex(index);
    }

    // const updateFormData = (newData) => {
    //     setFormData((prevData) => ({
    //         ...prevData,
    //         ...newData,
    //     }));
    // };

    // const handleNext = () => {
    //     // Check the current step and form data to determine the next step
    //     if(currentStepIndex === 0 && formData.isAdopt === 'true'){
    //         // Move to the next step based on isAdopt value
    //         if(formData.isFromShelter === 'true'){
    //             next(); // Move to the next step
    //         } else if (formData.isFromShelter === 'false' && formData.isStray === 'true'){
    //             // Move to the step where you ask for the approximate address of the cat
    //             next();
    //         } else {
    //             // Move to the step where you ask for the location where the cat is from
    //             next();
    //         }
    //     } else {
    //         next(); // Move to the next step
    //     }
    // };

    // const handleBack = () => {
    //     // Check the current step and form data to determine the previous step
    //     if(currentStepIndex === 1 && formData.isAdopt === 'true'){
    //         // Go back to the first step if isAdopt is true
    //         goTo(0);
    //     } else if(currentStepIndex === 2 && formData.isAdopt === 'true' && formData.isFromShelter === 'false'){
    //         // Go back to the second step if isAdopt is true and isFromShelter is false
    //         goTo(1);
    //     } else {
    //         back(); // Go back to the previous step
    //     }
    // }

    return{
        currentStepIndex,
        step: steps[currentStepIndex],
        // step: steps[currentStepIndex]({
        //     formData,
        //     updateFormData,
        //     next: handleNext,
        //     back: handleBack,
        //     goTo,
        // }),
        steps,
        isFirstStep: currentStepIndex === 0,
        isLastStep: currentStepIndex === steps.length - 1,
        goTo,
        // next: handleNext,
        // back: handleBack,
        next,
        back,
    };
}