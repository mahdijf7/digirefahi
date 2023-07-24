import React, { useState, useRef } from 'react';
import { Box, TextField, InputAdornment, IconButton } from '@mui/material';
import DatePicker from 'react-multi-date-picker';
import persian_fa from 'react-date-object/locales/persian_fa';
import persian from 'react-date-object/calendars/persian';
import theme from 'assets/theme';
import { useField } from 'formik';
import { styled } from '@mui/material/styles';
import CustomLable from './CustomLable';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';

import gregorian from 'react-date-object/calendars/gregorian';
import gregorian_en from 'react-date-object/locales/gregorian_en';
let moment = require('moment-jalaali');

const {
    main: { palette },
} = theme;

const JalaliDatePicker = ({ name, sx, ...otherProps }) => {
    const datePickerRef = useRef(null);

    const [field, meta, helpers] = useField({
        name,
    });
    const [formattedDate, setFormattedDate] = useState(field.value ? moment(field.value).format('jYYYY-jMM-jDD') : undefined);
    const configTextField = {
        ...field,
        ...otherProps,
    };

    if (meta && meta.error && meta.touched) {
        configTextField.error = true;
        configTextField.helperText = meta.error;
    }

    const { disabled, showlabel, placeholder, weight, title } = otherProps;

    const CustomInput = styled(TextField)(({ theme }) => ({
        width: '100%',
        '& .MuiOutlinedInput-root': {
            backgroundColor: palette.info.input,
            color: ` ${palette.common.black}`,
            '& fieldset': {
                border: `.1rem solid ${palette.info.border} `,
                borderColor: meta.touched && meta.error ? '#d32f2f !important' : theme.palette.text.main,
            },
        },

        '& input::placeholder': {
            [theme.breakpoints.down('md')]: {},
            fontSize: '1.2rem',
            paddingBottom: '.5rem',
        },
        ...sx,
    }));

    const handleDateChange = (date) => {
        if (date) {
            const formatted = date.format('YYYY-MM-DD');
            setFormattedDate(formatted);
        } else {
            setFormattedDate('');
        }
        helpers.setValue(date?.convert(gregorian, gregorian_en).format('YYYY-MM-DD'));
    };

    const handleTextFieldClick = () => {
        datePickerRef.current.openCalendar();
    };

    return (
        <Box
            className="column"
            width="100%"
            sx={{
                '& .rmdp-container': {
                    width: '100%',
                    display: 'inline !important',
                },
            }}>
            {showlabel && <CustomLable id={name} weight={weight} name={title || placeholder} />}

            <DatePicker
                sx={{
                    display: 'inline',
                }}
                ref={datePickerRef}
                disabled={disabled}
                format="YYYY-MM-DD"
                locale={persian_fa}
                calendar={persian}
                value={formattedDate}
                onOpenPickNewDate={false}
                onChange={handleDateChange}
                render={({ inputProps, inputRef, togglePicker }) => (
                    <CustomInput
                        name={name}
                        InputProps={{
                            sx: {
                                ...sx,
                            },

                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton onClick={handleTextFieldClick}>
                                        <CalendarMonthIcon />
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                        FormHelperTextProps={{
                            style: {
                                fontSize: '1.2rem',
                                position: 'absolute',
                                top: 'calc(100% +  2px)',
                                left: 0,
                                margin: 0,
                            },
                        }}
                        disabled={disabled}
                        inputRef={inputRef}
                        onClick={handleTextFieldClick}
                        value={disabled ? '' : formattedDate}
                        error={meta.touched && Boolean(meta.error)}
                        helperText={meta.touched && meta.error}
                        {...otherProps}
                    />
                )}
            />
        </Box>
    );
};

export default JalaliDatePicker;
