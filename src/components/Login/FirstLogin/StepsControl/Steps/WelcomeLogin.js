import React, { useContext, useEffect } from 'react';
import { Box, Grid, Typography, Button } from '@mui/material';
import '../../../../../assets/style/profile.scss';
import img1 from '../../../../../assets/image/12345.png';
import img2 from '../../../../../assets/image/1234.png';
import { useTranslation } from 'react-i18next';
import StepperContext from '../../../../../store/Stepper-context';

const buttonStyle = {
  width: '20%',
  height: '3.9rem',
  backgroundColor: 'secondary.main',
  color: 'common.black',
  fontSize: '1.5rem',
  '&:hover': {
    backgroundColor: 'secondary.main',
  },
};

function WelcomeLogin(props) {
  const { setIsStep, isStep } = useContext(StepperContext);
 
  const { t } = useTranslation();

  const handleChange = () => setIsStep(true);

  useEffect(() => {
    // window.location.reload();
  }, []);

  return (
    <Box
      position="relative"
      height="38vw"
      maxHeight="65rem"
      bgcolor="common.white"
      borderRadius="1.4rem"
      mt="4rem"
    >
      <Box className="welcome-img-box">
        <img src={img1} alt="" />
        <img src={img2} alt="" />

        <Typography fontWeight="700" fontSize="2.8rem" variant="h1" component="h2">
          {t('firstLogin.welcome')}
        </Typography>
        <Typography fontWeight="300" variant="h4">
          {t('firstLogin.completeProfile')}
        </Typography>
        <Button onClick={handleChange} sx={buttonStyle}>
          {t('firstLogin.completeAcount')}
        </Button>
      </Box>
    </Box>
  );
}

export default WelcomeLogin;
