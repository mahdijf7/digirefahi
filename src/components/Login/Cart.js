import React from 'react';
import { Grid, Container, Box } from '@mui/material';
import '../../assets/style/login.scss';
function Cart(props) {
  return (
    <Box bgcolor="primary.light" className="loginContainer">
      <Grid container height="100vh">
        {props.children}
      </Grid>
    </Box>
  );
}

export default Cart;
