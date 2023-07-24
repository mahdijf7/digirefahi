import DeleteIcon from '@mui/icons-material/Delete';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import { Box, Button, Dialog, DialogActions, Divider, IconButton, Link, Stack, Typography } from '@mui/material';
import { useField } from 'formik';
import { isEmpty } from 'lodash';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import CustomLable from './CustomLable';

function UploadFile({ name, accept, title, showlabel, weight, sx }) {
    const { t } = useTranslation();
    const [field, meta, helpers] = useField(name);
    const [previewLink, setPreviewLink] = useState('');
    const [isOpen, setIsOpen] = useState(false);
    const [isUrl, setIsUrl] = useState(false);

    const handleInputChange = (event) => {
        const file = event.currentTarget.files[0];
        setPreviewLink(URL.createObjectURL(file));
        helpers.setValue(file);
    };

    const getImageFileName = (imageUrl) => {
        const urlParts = imageUrl.split('/');
        const fileName = urlParts[urlParts.length - 1];
        return fileName;
    };

    const handleDownload = () => {
        const link = document.createElement('a');
        if (isUrl) {
            link.href = field.value;
            const fileName = getImageFileName(field?.value);
            link.setAttribute('download', fileName);
            link.setAttribute('target', '_blank');
        } else {
            link.href = previewLink;
            link.setAttribute('download', field?.value?.name);
        }
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const handleDelete = () => {
        URL.revokeObjectURL(previewLink);
        setPreviewLink('');
        helpers.setValue('');
        helpers.setTouched(false);
    };

    useEffect(() => {
        if (typeof field.value === 'string' && !isEmpty(field.value)) {
            setIsUrl(true);
        } else setIsUrl(false);
    }, [field]);

    return (
        <Stack sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            {showlabel && <CustomLable id="logo" weight={weight} name={title} />}
            <Box
                sx={{
                    borderRadius: '0.8rem',
                    height: '4.2rem',
                    display: 'flex',
                    width: '100%',
                    lineHeight: '1.4375em',
                    background: '#f2f2f7',
                    boxSizing: 'border-box',
                    border: '0.1rem solid #D1D1D6',
                    ...sx,
                    cursor: isEmpty(field?.value?.name) && 'pointer',
                }}
                onClick={() => isEmpty(field?.value?.name) && !isUrl && document.getElementById(field.name).click()}>
                <Stack
                    direction="row"
                    spacing={1.25}
                    sx={{ width: '100%', alignItems: 'center', justifyContent: 'space-between', px: '1.5rem' }}>
                    <Typography
                        sx={{
                            overflow: 'hidden',
                            whiteSpace: 'nowrap',
                            textOverflow: 'ellipsis',
                            maxWidth: '45%',
                        }}
                        variant="caption"
                        fontSize="1.2rem">
                        {isUrl
                            ? getImageFileName(field.value)
                            : isEmpty(field.value?.name)
                            ? 'تصویر را بارگذاری کنید'
                            : field?.value?.name}
                    </Typography>
                    <Box
                        direction="row"
                        sx={{
                            '& button': {
                                borderRadius: '50%',
                                width: '3rem',
                                height: '3rem',
                            },
                        }}>
                        {!isEmpty(field.value?.name) || isUrl ? (
                            <>
                                <IconButton onClick={() => setIsOpen(true)}>
                                    <RemoveRedEyeIcon />
                                </IconButton>
                                <IconButton onClick={handleDownload}>
                                    <FileDownloadIcon />
                                </IconButton>
                                <IconButton onClick={handleDelete}>
                                    <DeleteIcon />
                                </IconButton>
                            </>
                        ) : (
                            <IconButton size="large" sx={{ borderRadius: '4px' }}>
                                <FileUploadIcon />
                            </IconButton>
                        )}
                    </Box>
                </Stack>
            </Box>
            <input
                type="file"
                id={field.name}
                name={field.name}
                style={{ display: 'none' }}
                accept={accept}
                onChange={handleInputChange}
            />
            <Dialog
                open={isOpen}
                onClose={() => setIsOpen(false)}
                sx={{
                    '& .MuiPaper-root': {
                        minWidth: '40%',
                        borderRadius: '1.6rem',
                        '& img': {
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                        },
                    },
                }}>
                <img
                    src={isUrl ? process.env.REACT_APP_STORAGE_URL + '/' + field.value : previewLink}
                    aria-hidden
                    alt="image of uploaded in form."
                />
            </Dialog>
        </Stack>
    );
}

export default UploadFile;
