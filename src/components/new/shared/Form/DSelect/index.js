import * as React from 'react';
import { Box, Button, FormControl, Checkbox, Typography } from '@mui/material';
import { Field, ErrorMessage, useField } from 'formik';

import CustomLable from 'components/Common/Form/CustomLable';

import { StyledMenuItem, StyledSelect } from './styles';
import DSelectButton from './DSelectButton';

export default function DSelect({
    name,
    optionLabelKey = 'name',
    optionValueKey = 'id',
    formControlStyle,
    label,
    placeholder,
    defaultOptions = [],
    multiple = false,
    wrapperStyles= {},
    onSelect,
}) {
    const [open, setOpen] = React.useState(false);
    const [options, setOptions] = React.useState(defaultOptions);
    const [field, meta, helpers] = useField({ name });
    const isSelected = multiple ? field.value.length > 0 : !!field.value;

    const handleChange = (event) => {
        onSelect && onSelect(event.target.value);

        const {
            target: { value },
        } = event;
        helpers.setValue(
            // On autofill we get a stringified value.
            typeof value === 'string' ? value.split(',') : value
        );
    };
    const handleClose = (event) => {
        setOpen(false);
    };
    const reset = () => {
        helpers.setValue(multiple ? [] : '');
        setOpen(false);
    };

    // we need this hack because in react mui select the value and the options should have a shared refrence
    const getValue = () => {
        if (defaultOptions && field.value) {
            return multiple
                ? defaultOptions.filter((option) => field.value.indexOf(option.value) >= 0)
                : defaultOptions.find((option) => option[optionValueKey] === field.value[optionValueKey]);
        } else {
            return multiple ? [] : '';
        }
    };

    return (
        <Box className="column" sx={{ position: 'relative' }}>
            <Field name={name}>
                {({
                    field, // { name, value, onChange, onBlur }
                    form: { touched, errors, setFieldValue }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
                    meta,
                }) => (
                    <Box sx={{ width: '100%', position: 'relative' }}>
                        {label && <Typography sx={{ fontSize: '13px', fontWeight: 600,textAlign:"right" }}>{label}</Typography>}
                        <FormControl fullWidth sx={{ position: 'relative', ...wrapperStyles }}>
                            <DSelectButton
                                formControlStyle={formControlStyle}
                                multiple={multiple}
                                value={field.value}
                                label={!multiple && field.value ? field.value[optionLabelKey] : placeholder}
                                isSelected={isSelected}
                                isOpen={open}
                                onOpen={() => setOpen(true)}
                            />

                            <StyledSelect
                                value={getValue()}
                                MenuProps={menuProps}
                                multiple={multiple}
                                open={open}
                                onChange={handleChange}
                                onClose={handleClose}
                                inputProps={{ 'aria-label': 'Without label' }}>
                                {options.map((option) => (
                                    <StyledMenuItem key={option[optionValueKey]} ownerState={{ color: 'red' }} value={option}>
                                        {multiple && <Checkbox checked={!!field.value ? field.value.includes(option) : false} />}
                                        <Typography fontSize="13px"> {option[optionLabelKey]} </Typography>
                                    </StyledMenuItem>
                                ))}

                                <Box sx={{ borderTop: '1px solid #D9D9D9', padding: '10px' }}>
                                    <Button color="primary" variant="outlined" sx={{ fontSize: '12px' }} onClick={reset}>
                                        حذف فیلتر
                                    </Button>
                                </Box>
                            </StyledSelect>

                            {/* <FormHelperText>Without label</FormHelperText> */}
                        </FormControl>
                    </Box>
                )}
            </Field>
            {meta.touched && meta.error && (
                <Typography
                    component="span"
                    sx={{
                        position: 'absolute',
                        bottom: '-27px',
                        left: 0,
                        color: '#d32f2f',
                        fontSize: '12px',
                        fontWeight: 500,
                    }}>
                    {meta.error}
                </Typography>
            )}
        </Box>
    );
}

const menuProps = {
    sx: { '& .MuiPaper-root': { backgroundColor: 'transparent', margin: '10px  0 ' } },
    MenuListProps: { sx: { backgroundColor: '#fff', borderRadius: '8px', padding: 0, border: '1px solid   #e1e4e8' } },
};
