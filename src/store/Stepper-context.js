import React, { createContext, useEffect, useState } from 'react';

const steps = ['تغییر کلمه عبور', 'تکمیل پروفایل', 'علاقه مندی ها'];

const StepperContext = createContext({
    isStep: '',
    setIsStep: '',
    steps: '',
    activeStep: '',
    setActiveStep: '',
    skipped: '',
    setSkipped: '',
    isStepOptional: (step) => {},
    isStepSkipped: (step) => {},
    handleNext: () => {},
    handleBack: () => {},
    handleSetActiveStep: () => {},
});
export const StepperContextProvider = ({ children }) => {
    // const [activeStep, setActiveStep] = useState(1);

    const userNew = parseInt(localStorage.getItem('floginActiveStep')) === 0;



    const [activeStep, setActiveStep] = useState(1);
    const [isStep, setIsStep] = useState(false);
    const [skipped, setSkipped] = useState(new Set());

    const isStepOptional = (step) => {
        return step === 1;
    };

    const isStepSkipped = (step) => {
        return skipped.has(step);
    };
    const handleSetActiveStep = (newStep) => {
        setActiveStep(newStep);
    };

    const handleNext = () => {
        let newSkipped = skipped;
        if (isStepSkipped(activeStep)) {
            newSkipped = new Set(newSkipped.values());
            newSkipped.delete(activeStep);
        }

        setActiveStep((prevActiveStep) => prevActiveStep + 1);

        setSkipped(newSkipped);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    useEffect(() => {
        if (!userNew) {
            localStorage.setItem('floginActiveStep', activeStep);
        }
    }, [activeStep, userNew]);

    return (
        <StepperContext.Provider
            value={{
                isStep,
                setIsStep,
                steps,
                activeStep,
                setActiveStep,
                skipped,
                setSkipped,
                isStepOptional,
                isStepSkipped,
                handleNext,
                handleBack,
                handleSetActiveStep,
            }}>
            {children}
        </StepperContext.Provider>
    );
};

export default StepperContext;
