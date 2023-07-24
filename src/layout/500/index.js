import React from 'react';
import { Grid, Box, Link } from '@mui/material';
import icon from '../../assets/image/Error500.jpg';
import logo from '../../assets/image/Logo-FA-3.png';
import { useTranslation } from 'react-i18next';
function Index(props) {
  const { t } = useTranslation();
  return (
    <Box maxWidth="1700px" m="0 auto">
      <Grid container>
        <Grid position="relative" sx={style} item xs={12}>
          <Box position="relative">
            <img src={icon} alt="" />
            <img src={logo} alt="" />
          </Box>
        </Grid>

        <Link
          position="absolute"
          sx={{
            textDecoration: 'none',
            cursor: 'pointer',
            '&:active': {
              transform: ' scale(.98)',
            },
          }}
          color="common.black"
          fontSize="2rem"
          bgcolor="secondary.main"
          width="22.2rem"
          height="5.4rem"
          borderRadius="1.5rem"
          top="15%"
          left="38%"
          className="flex"
          fontWeight="700"
        >
          {t('error.callSupport')}
        </Link>
      </Grid>
    </Box>
  );
}

export default Index;
const style = {
  '& img:first-child': {
    objectFit: 'contain',
    width: '100%',
    height: '90vh',
  },
  '& img:last-child': {
    position: 'absolute',
    bottom: '1%',
    left: '1%',
    objectFit: 'contain',
    width: '7.5rem',
    height: '8.4rem',
  },
};
