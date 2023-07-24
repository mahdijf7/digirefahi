import FormLogin from '../../components/Login/FormLogin';
import '../../assets/style/login.scss';
import Logo from '../../components/Login/Logo';
import Cart from '../../components/Login/Cart';
import CartForm from '../../components/Login/CartForm';
import iconHellow from '../../assets/image/Group-481.png';

const sx = {
  alignSelf: 'center',
  height: '400px !important',
};
const Index = () => {
  return (
    <Cart>
      <CartForm title={'login.login'}>
        <FormLogin />
      </CartForm>
      <Logo sx={sx} title={'login.welcome'} img={iconHellow} />
    </Cart>
  );
};

export default Index;
