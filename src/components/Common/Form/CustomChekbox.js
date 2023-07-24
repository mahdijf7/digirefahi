import React from 'react';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import { useField, useFormikContext } from 'formik';

function CustomCheckbox({ name, label, sx, onSelect, ...otherProps }) {
    const { values, setFieldValue } = useFormikContext();
    const [field, meta] = useField(name);

    const handleChange = () => {
        if (!values[name]) {
            setFieldValue(name, true);
            setFieldValue(otherProps.relevent, false);
            onSelect && onSelect(values[name]);
        } else {
            setFieldValue(name, false);
            onSelect && onSelect(values);
        }
    };

    return (
        <FormControlLabel
            sx={sx}
            control={<Checkbox {...field} checked={field.value} onChange={handleChange} color="primary" {...otherProps} />}
            label={label}
        />
    );
}

export default CustomCheckbox;
