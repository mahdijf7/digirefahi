import { useState, useRef } from 'react';
import { Box, Typography } from '@mui/material';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import VisibilityIcon from '@mui/icons-material/Visibility';

// Utils
import theme from 'assets/theme';

const CategoryBoxImagePicker = ({ hasPrimaryColor = false, defaultImage, onFileSelected }) => {
    const inputRef = useRef(null);
    const [imageSrc, setImageSrc] = useState(defaultImage ? `${process.env.REACT_APP_STORAGE_URL}/${defaultImage}` : null);

    const selectFile = () => {
        // trigger input file
        inputRef.current.value = null;
        inputRef.current.click();
    };
    const fileSelected = (e) => {
        if (e.target.files && e.target.files[0]) {
            // show a preview of the selected image
            setImageSrc(URL.createObjectURL(e.target.files[0]));

            onFileSelected(e.target.files[0]);
        }
    };
    const deleteSelectedImage = () => {
        inputRef.current.value = null;
        setImageSrc(null);
    };

    const wrapperStyles = {
        flex: 1,
        border: hasPrimaryColor
            ? `1px solid ${theme.main.palette.primary.main}`
            : `1px solid ${theme.main.palette.brandGray.main}`,
        borderRadius: '5px',
        display: 'flex',
        overflow: 'hidden',
        '& input': {
            width: 0,
            height: 0,
            visibility: 'hidden',
            opacity: 0,
        },
    };
    const emptyBoxStyles = {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',
        width: '100%',
        '& svg': {
            fill: hasPrimaryColor ? theme.main.palette.primary.main : theme.main.palette.brandGray.main,
        },
    };
    return (
        <Box sx={wrapperStyles}>
            <input ref={inputRef} type="file" accept="image/*" onChange={fileSelected} />
            {imageSrc ? (
                <Box sx={{ display: 'flex', flex: 1 }}>
                    <Box sx={imageWrapperStyles}>
                        <img src={imageSrc} />
                    </Box>
                    <Box
                        sx={{
                            flex: 1,
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            gap: '4px',
                            color: hasPrimaryColor ? theme.main.palette.primary.main : `rgba(44, 44, 46, 0.5)`,
                        }}>
                        <a
                            href={imageSrc}
                            target="_blank"
                            style={{
                                color: hasPrimaryColor ? theme.main.palette.primary.main : `rgba(44, 44, 46, 0.5)`,
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                textDecoration: 'none',
                            }}>
                            <VisibilityIcon fontSize="small" />
                            <Typography component="span" fontSize="8px" fontWeight={600} sx={{ lineHeight: '14px' }}>
                                مشاهده
                            </Typography>
                        </a>
                        <Box
                            sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
                            onClick={deleteSelectedImage}>
                            <DeleteOutlineIcon fontSize="small" />
                            <Typography component="span" fontSize="8px" fontWeight={600} sx={{ lineHeight: '14px' }}>
                                حذف
                            </Typography>
                        </Box>
                    </Box>
                </Box>
            ) : (
                <Box sx={emptyBoxStyles} onClick={selectFile}>
                    <AddPhotoAlternateIcon fontSize="large" />
                </Box>
            )}
        </Box>
    );
};

const imageWrapperStyles = {
    flex: '0 0 80px',
    height: '80px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '1px',
    borderRadius: '8px',
    overflow: 'hidden',
    '& img': {
        objectFit: 'cover',
        width: '100%',
        height: '100%',
    },
};
export default CategoryBoxImagePicker;
