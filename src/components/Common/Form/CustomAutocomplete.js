import React from 'react';
import { Autocomplete, TextField, Box } from '@mui/material';
import { useField } from 'formik';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { styled } from '@mui/material/styles';
import CustomLable from './CustomLable';

function DropDownInput(props) {
    const {
        valueName,
        showlabel,
        icon,
        placeholder,
        options,
        title,
        name,
        id,
        sx,
        weight,
        onSelect, // if we had callback function
        ...otherProps
    } = props;
    const [field, meta, helpers] = useField({ name });
    const { setValue } = helpers;

    const AutocompleteCustom = styled(Autocomplete)(({ theme }) => ({
        '&.MuiAutocomplete-root': {
            width: '100%',
            borderColor: theme.palette.primary.main,
            borderRadius: '.5rem',
        },
        '& .MuiOutlinedInput-root': {
            paddingTop: '0 !important',
        },
        '&.MuiAutocomplete-root .MuiAutocomplete-inputRoot': {
            padding: '0 .8rem !important',
        },
        '& .MuiAutocomplete-inputRoot': {
            paddingLeft: theme.spacing(2),
            paddingRight: theme.spacing(2),
            '& .MuiAutocomplete-endAdornment': {
                right: 'auto',
                left: theme.spacing(3),
                top: '30%',
                transform: 'scale(2)',
            },
        },
        '& input::placeholder': {
            [theme.breakpoints.down('md')]: {},
            fontSize: '1.2rem',
            paddingBottom: '.5rem',
        },
        '& .MuiAutocomplete-endAdornment': {},

        ...sx,
    }));

    const handleSelect = (event, value) => {
        setValue(value ? value.value : null);
        if (onSelect) {
            onSelect(value);
        }
    };

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            {showlabel && <CustomLable id={name} weight={weight} name={title || placeholder} />}
            <AutocompleteCustom
                {...field}
                {...otherProps}
                popupIcon={<ExpandMoreIcon />}
                options={options}
                value={options.find((option) => option.value === field.value) || null}
                getOptionLabel={(option) => option.label}
                onChange={handleSelect}
                onBlur={() => helpers.setTouched(true)}
                renderInput={(params) => (
                    <TextField
                        {...params}
                        placeholder={placeholder}
                        error={meta.touched && Boolean(meta.error)}
                        helperText={meta.touched && meta.error}
                        value={field.value || ''}
                        InputProps={{
                            ...params.InputProps,
                            startAdornment: <>{icon}</>,
                        }}
                    />
                )}
                renderOption={(props, option) => (
                    <Box
                        component="li"
                        {...props}
                        sx={{
                            direction: 'rtl',
                            bgcolor: 'white',
                        }}>
                        {option.label}
                    </Box>
                )}
            />
        </Box>
    );
}

export default DropDownInput;
