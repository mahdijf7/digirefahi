import React, { useContext } from 'react';

// Utils
import StepperContext from 'store/Stepper-context';

// Components
import DashboardCard from 'components/Common/Card/DashboardCard';
import WelcomeLogin from './StepsControl/Steps/WelcomeLogin';
import FirstLoginStepper from 'components/Stepper/FirstLoginStepper';

function FirstLoginStepsControl() {
    const { isStep } = useContext(StepperContext);

    return (
        <DashboardCard
            pt="2rem"
            minHeight={isStep ? '100vh' : 'calc(100vh - 6.6rem)'}
            height={isStep ? '100%' : 'calc(100vh - 6.6rem)'}>
            {isStep ? <FirstLoginStepper /> : <WelcomeLogin />}
        </DashboardCard>
    );
}

export default FirstLoginStepsControl;
