import { TextField } from '@mui/material';
import { useField } from 'formik';
import { styled } from '@mui/material/styles';

const CustomInputOutline = ({ name, disabled, multiline }) => {
  const [field, meta] = useField(name);
  const configTextField = {
    ...field,
    disabled: !!disabled,
    fullWidth: true,
    variant: 'outlined',
    multiline: !!multiline,
  };
  if (meta && meta.error && meta.touched) {
    configTextField.error = true;
    configTextField.helperText = meta.error;
  }
  return <TextFieldCustom {...configTextField} />;
};

export default CustomInputOutline;

const TextFieldCustom = styled(TextField)(({ theme }) => ({
  width: '100% !important',
  margin: '15px 0px',
  '& input': {
    '&:-webkit-autofill': {
      WebkitBoxShadow: `0 0 0px 1000px ${theme.palette.background.paper} inset !important`,
    },
  },
}));
