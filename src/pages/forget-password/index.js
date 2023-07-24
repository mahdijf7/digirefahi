import React, { useState } from 'react';
import CartForm from '../../components/Login/CartForm';
import Cart from '../../components/Login/Cart';
import Logo from '../../components/Login/Logo';
import imgLogo from '../../assets/image/Group-1.png';
import ChangeStep from '../../components/ForgetPasswoard/ChangeStep';

const sx = {
  display: 'flex',
  marginTop: 'auto !important',
  alignItems: 'flex-start',
  justfyContent: 'flex-end',
  height: '80vh',
  width: '100%',
  '& img': {
    width: '100%',
    height: '100%',
  },
};

function Index(props) {
  const [title, setTitle] = useState('login.forget');
  const liftState = (data) => {
    setTitle(data); 
  };
  return (
    <Cart>
      <CartForm title={title}>
        <ChangeStep onSubmit={liftState} />
      </CartForm>
      <Logo img={imgLogo} sx={sx} alignSelf="flex-end" />
    </Cart>
  );
}

export default Index;
