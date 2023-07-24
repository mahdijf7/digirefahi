import React, { useState, useEffect, useRef } from 'react';
import { useField } from 'formik';
import { Avatar, Box, Button, TextField, IconButton, Link, Stack, Typography } from '@mui/material';

import DeleteIcon from '@mui/icons-material/Delete';
import UserProfileEdit from 'assets/icone/svg/UserProfileEdit';
import { ColorPrimary } from 'assets/theme/color';

function CustomAvatar({ name, alt, src, accept, props }) {
    const [field, meta, helpers] = useField(name);
    const fileInputRef = React.useRef(null);
    const [previewLink, setPreviewLink] = useState(null);

    const configTextField = {
        ...field,
        ...props,
    };
    if (meta && meta.error && meta.touched) {
        configTextField.error = true;
        configTextField.helperText = meta.error;
    }

    const handleButtonClick = () => {
        const data = fileInputRef.current.click();
    };

    const handleInputChange = (event) => {
        const file = event.currentTarget.files[0];
        setPreviewLink(URL.createObjectURL(file));

        helpers.setValue(file);
    };

    const handleDelete = () => {
        URL.revokeObjectURL(previewLink);
        setPreviewLink(null);
        helpers.setValue('');
        helpers.setTouched(false);
    };

    useEffect(() => {
        if (src) {
            setPreviewLink(src);
        }
    }, []);

    return (
        <Box position="relative">
            <Avatar
                alt={alt}
                sx={{ bgcolor: 'primary.main', width: '9rem', height: '9rem', borderRadius: '50%' }}
                src={previewLink}
            />
            <TextField
                type="text"
                value={field.value ? field.value.name : ''}
                disabled
                FormHelperTextProps={{
                    style: {
                        textAlign: 'right',
                        top: '2rem',
                        left: '-15rem',
                        width: '7rem',
                        backgroundColor: 'green !important',
                    },
                }}
                InputProps={{
                    style: {
                        display: 'none',
                        borderRadius: '.5rem',
                        height: '4rem',
                        ...props,
                    },
                    ...props,
                }}
                {...configTextField}
            />
            <Box position="absolute" bottom="2rem" right="6rem">
                <input ref={fileInputRef} type="file" accept={accept} onChange={handleInputChange} style={{ display: 'none' }} />
                <IconButton type="button" onClick={handleButtonClick} {...props}>
                    <UserProfileEdit />
                </IconButton>
                <IconButton
                    sx={{
                        bgcolor: ColorPrimary,
                        mb: '-5rem',
                        mr: '-9rem',
                        width: '3.5rem',
                        height: '3.5rem',
                        '&:hover': {
                            bgcolor: ColorPrimary,
                        },
                    }}
                    onClick={handleDelete}>
                    <DeleteIcon sx={{ bgcolor: ColorPrimary, fontSize: '2rem', color: 'white' }} />
                </IconButton>
            </Box>
        </Box>
    );
}

export default CustomAvatar;
