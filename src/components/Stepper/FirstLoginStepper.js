import { useContext } from 'react';

import { Typography, StepLabel, Step, Stepper, Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import StepAddInterest from 'components/Login/FirstLogin/StepsControl/Steps/StepAddInterest';
import StepAddPass from 'components/Login/FirstLogin/StepsControl/Steps/StepAddPass';
import StepAddProfileData from 'components/Login/FirstLogin/StepsControl/Steps/StepAddProfileData';
import StepperContext from 'store/Stepper-context';

function FirstLoginStepper() {
    const { steps, activeStep } = useContext(StepperContext);

    const CustomStepper = styled(Stepper)(({ theme }) => ({
        width: '70% !important',
        margin: '0 auto',
        color: theme.palette.text.main,
        '.MuiStepIcon-root': {
            width: '3rem',
            height: '3rem',
            color: '#E1E1E1',
        },
        '& .MuiStepIcon-text': { fill: theme.palette.primary.main, fontSize: '1.3rem' },
        '.MuiSvgIcon-root.Mui-active': {
            width: '3.5rem',
            height: '3.5rem',
            padding: '3px',
            borderRadius: '50%',
            border: `1px solid  ${theme.palette.primary.main}`,
            marginY: '-4px',
            color: theme.palette.primary.light,
        },
    }));

    return (
        <>
            <Box sx={{ margin: '0 auto', width: '100%', hight: '30rem !important' }}>
                <Box height="7rem" className="flex" mb="4rem">
                    <CustomStepper activeStep={activeStep}>
                        {steps.map((label, index) => {
                            const stepProps = {};
                            const labelProps = {};
                            return (
                                <Step
                                    sx={{
                                        position: 'relative',
                                    }}
                                    key={label}
                                    {...stepProps}>
                                    <StepLabel {...labelProps} />
                                    <Typography
                                        sx={{
                                            width: '15rem',
                                            position: 'absolute',
                                            top: '5rem',
                                            right: '-10%',
                                        }}
                                        variant="h4">
                                        {label}
                                    </Typography>
                                </Step>
                            );
                        })}
                    </CustomStepper>
                </Box>
                {
                    {
                        1: <StepAddPass />,
                        2: <StepAddProfileData />,
                        3: <StepAddInterest />,
                    }[activeStep]
                }
            </Box>
        </>
    );
}

export default FirstLoginStepper;
