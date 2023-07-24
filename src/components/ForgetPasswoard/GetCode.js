import React, { useEffect } from 'react';
import { Grid, Paper, Typography, Box } from '@mui/material';
import CustomInputBase from '../Common/Form/CustomInputBase';

function GetCode({ t, counter, setCounter, mobile }) {
  useEffect(() => {
    const timer = counter > 0 && setInterval(() => setCounter(counter - 1), 1000);
    return () => clearInterval(timer);
  }, [counter]);

  return (
    <>
      <Grid mt={'5%'} item xs={10}>
        <CustomInputBase
          name="mobile_token"
          showlabel="true"
          title={t('login.code')}
          placeholder={t('login.enterCode')}
        />
      </Grid>

      <Grid mt={'5%'} item xs={12}>
        <Box display="flex" justifyContent="center">
          <Paper
            sx={{
              backgroundColor: 'text.light',
              borderRadius: '5px',
              boxShadow: 'none',
              display: 'flex',
              width: '40%',
              height: '68px',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '2rem',
            }}
          >
            {counter === 60 ? '1:00' : counter}
          </Paper>
        </Box>
        <Grid mt="1rem" item xs={12}>
          <Typography color="text.main" variant="h5">
            {`${t('login.codeMessage')} ${mobile}  ${t('login.sended')} `}
          </Typography>
        </Grid>
      </Grid>
    </>
  );
}

export default GetCode;
