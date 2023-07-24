import { Button } from '@mui/material';
import { useFormikContext } from 'formik';

const SubmitButtonFill = ({ children, sx, onClick, ...otherProps }) => {
  const { submitForm } = useFormikContext();
  const handleSubmit = () => {
    submitForm();
  };
  const configButton = {
    ...otherProps,
    variant: 'contained',
    onClick: onClick ? onClick : handleSubmit,
  };
  return (
    <Button
      sx={{
        height: '45px',
        borderRaduis: '10px',
        backgroundColor: 'primary.main',
        color: 'common.white',
        boxShadow: '1',
        '&:hover': {
          bgcolor: 'primary.main',
        },
        ...sx,
      }}
      {...configButton}
    >
      {children}
    </Button>
  );
};

export default SubmitButtonFill;
