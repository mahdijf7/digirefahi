import React from 'react';
import { Autocomplete, TextField, Box, Divider } from '@mui/material';
import { useField } from 'formik';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { styled } from '@mui/material/styles';
import CustomLable from './CustomLable';
import { ColorGrey } from 'assets/theme/color';

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
        defaultValue,
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
        '& > li': {
            scrollbarWidth: 'none' /* Firefox */,
            '&::-webkit-scrollbar': {
                width: '0.4rem' /* Chrome, Safari, Edge */,
                height: '0.4rem' /* Chrome, Safari, Edge */,
                backgroundColor: 'red',
            },
            '&::-webkit-scrollbar-thumb': {
                backgroundColor: 'rgba(0,0,0,0)',
            },
        },
        '&.MuiAutocomplete-root .MuiAutocomplete-inputRoot': {
            padding: '0 .8rem !important',
        },
        '& input::placeholder': {
            [theme.breakpoints.down('md')]: {},
            fontSize: '1.2rem',
            paddingBottom: '.5rem',
        },

        ...sx,
    }));

    const handleSelect = (event, value) => {
        setValue(value?.id ?? null);
        if (onSelect) {
            onSelect(value?.id);
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
                // value={options.find((option) => option.id === field.value) || null}
                value={
                    field.value
                        ? options.find((option) => option.id === field.value)
                        : options.find((option) => option.id === defaultValue) || null
                }
                getOptionLabel={(option) => option.name}
                onChange={handleSelect}
                onBlur={() => helpers.setTouched(true)}
                renderInput={(params) => (
                    <TextField
                        {...params}
                        placeholder={placeholder}
                        error={meta.touched && Boolean(meta.error)}
                        helperText={meta.touched && meta.error}
                        value={field.value || ''}
                        FormHelperTextProps={{
                            style: {
                                fontSize: '1.2rem',
                                position: 'absolute',
                                top: 'calc(100% +  2px)',
                                left: 0,
                                margin: 0,
                            },
                        }}
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
                            fontSize: '1rem',
                            direction: 'rtl',
                            bgcolor: 'white',
                            borderBottom: `.1rem solid ${ColorGrey}`,
                        }}>
                        {option.name}
                    </Box>
                )}
            />
        </Box>
    );
}

export default DropDownInput;
