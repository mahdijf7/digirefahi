import * as React from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, IconButton, Box, Typography } from '@mui/material';
import * as Yup from 'yup';
import { Formik, Form } from 'formik';
import { styled } from '@mui/material/styles';
import { LoadingButton } from '@mui/lab';

// Component
import CustomInputDocument from 'components/Common/Form/CustomInputDocument';
import DDialogWrapper from 'components/new/shared/DDialog/DDialogWrapper';
import CustomInputBase from 'components/Common/Form/CustomInputBase';

//style
import { ColorPrimary } from 'assets/theme/color';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import theme from 'assets/theme';
import imageDefault from 'assets/image/defaultImg.png';
import DownloadIcon from '@mui/icons-material/Download';

import AddIcon from '@mui/icons-material/Add';

const validation_Schema = Yup.object({
    name: Yup.string().required('نام معتبر نیست'),
    image: Yup.mixed()
        .test('fileType', 'عکس معتبر نیست', (value) => {
            return ['image/jpeg', 'image/png'].includes(value?.type);
        })
        .required('عکس معتبر نیست'),
});

export default function BannerAddDetailDialog({
    setFilters,
    filters,
    setSnackBarData,
    isOpen,
    handleClose,
    loading,
    setLoading,
    getBannerData,
    id,
    api,
    apiService,
}) {
    const [image, setImage] = React.useState(null);
    const [imageDelete, setImageDelete] = React.useState(false);

    const initialValues = {
        name: '',
        image: null,
    };

    const formData = new FormData();
    const handleSubmit = (values) => {
        formData.append('image', image ? values.image : null);
        formData.append('name', values.name);
        createBanner();
    };

    const handleImageSelect = (file) => {
        setImage(file);

        if (file) {
            setImageDelete(false);
            const megabit = 1_000_000;
            const bits = parseInt(file.size, 10) * 8;
            const sizeInMegabits = bits / megabit;
            const size = sizeInMegabits.toFixed(2);
            const reader = new FileReader();
            reader.onload = () => {
                const documentItem = {
                    id: Date.now(),
                    type: file.type.includes('image'),
                    url: reader.result,
                    name: file.name,
                    size: size + 'MB',
                };
                setImage(documentItem);
            };
            reader.readAsDataURL(file);
        } else {
            setImage(null);
        }
    };

    const handleDeleteImage = () => {
        setImage(null);
        setImageDelete(true);
    };

    const createBanner = async () => {
        setLoading({
            refresh: false,
            initial: false,
            delete: true,
        });

        await apiService
            .update(api, formData)
            .then((res) => {
                setSnackBarData({
                    show: true,
                    data: {
                        text: ' بنر با موفقیت اضافه شد.',
                        type: 'success',
                    },
                });
                setFilters({ ...filters, page: 1 });
                handleClose();
                handleDeleteImage();
            })
            .catch((err) => {
                setSnackBarData({
                    show: true,
                    data: {
                        text: ' مشگلی پیش آمد.',
                        type: 'error',
                    },
                });
                setLoading({
                    initial: false,
                    refresh: false,
                    delete: false,
                });
            });
    };
    React.useEffect(() => {
        setImageDelete(false);
    }, [isOpen]);

    const UplaodBox = styled(Box)(({ theme }) => ({
        width: '100% !important',
        height: '14.2rem',
        border: ' .1rem solid   #D1D1D6',
        backgroundColor: '#F2F2F7',
        position: 'relative',
        borderRadius: '1.6rem',
        display: 'flex',
    }));

    return (
        <DDialogWrapper strip="true" size="sg" open={isOpen} onClose={handleClose}>
            <Box position="relative" minHeight="15rem" width="100%">
                <Formik onSubmit={handleSubmit} initialValues={initialValues} validationSchema={validation_Schema}>
                    <Form>
                        <DialogTitle variant="h4" textAlign="right">
                            افزودن بنر جدید
                        </DialogTitle>
                        <DialogContent>
                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={5}>
                                    <UplaodBox>
                                        {image?.url ? (
                                            <img style={buttonUplaod} src={image?.url} alt="" />
                                        ) : (
                                            <img style={buttonUplaod} src={imageDefault} alt="" />
                                        )}

                                        <Typography variant="body2" sx={imageDataStyle}>
                                            {image?.size}
                                        </Typography>
                                        {!image && (
                                            <Box>
                                                <Typography
                                                    sx={{
                                                        fontWeight: '500',
                                                        fontSize: '1.1rem',
                                                        m: '1rem 1.5rem ',
                                                    }}>
                                                    بنر خود را بارگذاری کنید
                                                </Typography>

                                                <Box
                                                    sx={{
                                                        left: '20%',
                                                        top: '7rem',
                                                        position: 'absolute',
                                                        display: 'flex',
                                                        height: '3rem',
                                                        gap: '2rem',
                                                    }}>
                                                    <CustomInputDocument
                                                        sx={iconSelect}
                                                        onSelect={handleImageSelect}
                                                        accept="image/*"
                                                        name="image">
                                                        <IconButton>
                                                            <DownloadIcon
                                                                fontSize="large"
                                                                sx={{ color: '#8C8C8C', cursor: 'pointer' }}
                                                            />
                                                        </IconButton>
                                                    </CustomInputDocument>
                                                </Box>
                                            </Box>
                                        )}
                                        {image?.url && (
                                            <Box sx={iconBox}>
                                                <CustomInputDocument
                                                    sx={iconSelect}
                                                    onSelect={handleImageSelect}
                                                    accept="image/*"
                                                    name="image">
                                                    <IconButton>
                                                        <BorderColorIcon
                                                            fontSize="large"
                                                            sx={{ color: '#8C8C8C', cursor: 'pointer' }}
                                                        />
                                                    </IconButton>
                                                </CustomInputDocument>

                                                <IconButton sx={iconSelectDelete}>
                                                    <DeleteOutlineIcon
                                                        onClick={handleDeleteImage}
                                                        fontSize="large"
                                                        sx={{ color: '#F77A06', cursor: 'pointer' }}
                                                    />
                                                </IconButton>
                                            </Box>
                                        )}
                                    </UplaodBox>
                                </Grid>
                                <Grid item xs={12} sm={7}>
                                    <Grid container>
                                        <Grid item xs={12}>
                                            <CustomInputBase
                                                sx={inputStyle}
                                                height="3.9rem"
                                                placeholder={'نام بنر'}
                                                name="name"
                                            />
                                        </Grid>
                                        <Grid item xs={12} mt="5.4rem">
                                            <DialogActions sx={{ pl: '0' }}>
                                                <Box display="flex" gap="2rem">
                                                    <LoadingButton
                                                        disabled={!image}
                                                        loading={loading.delete}
                                                        variant="contained"
                                                        sx={{
                                                            fontSize: '1.4rem',

                                                            display: 'flex',
                                                            gap: '1rem',
                                                        }}
                                                        type="submit">
                                                        <AddIcon /> افزودن بنر
                                                    </LoadingButton>
                                                    <Button
                                                        disabled={loading.delete}
                                                        sx={{ fontSize: '1.4rem' }}
                                                        variant="contained"
                                                        color="brandWarning"
                                                        onClick={() => {
                                                            handleClose();
                                                            handleDeleteImage();
                                                        }}>
                                                        لغو
                                                    </Button>
                                                </Box>
                                            </DialogActions>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </DialogContent>
                    </Form>
                </Formik>
            </Box>
        </DDialogWrapper>
    );
}
const inputStyle = {
    backgroundColor: theme.main.palette.info.input,
    borderRadius: '.8rem !important',

    '& .MuiOutlinedInput-root': {
        borderRadius: '.8rem !important',
        height: '3.9rem',
        color: ` ${theme.main.palette.common.black}`,
        '& fieldset': {
            border: `.1rem solid ${theme.main.palette.info.border} `,
        },
    },
};
const buttonUplaod = {
    display: 'flex',
    // backgroundColor: ColorPrimary,
    width: '55%',
    height: '14.2rem',
    borderRadius: '1.6rem',
    '&:hover': {
        backgroundColor: ColorPrimary,
    },
};
const iconBox = {
    left: '5%',
    top: '8rem',
    position: 'absolute',
    display: 'flex',
    height: '3rem',
    gap: '2rem',
};
const imageDataStyle = {
    left: '8%',
    top: '3rem',
    position: 'absolute',
    display: 'flex',
    height: '3rem',
    gap: '2rem',
    color: '#8C8C8C',
};
const iconSelect = {
    borderRadius: '50%',
    p: '0',
    m: '0',
    width: '3rem',
    minWidth: '1rem !important',
    height: '3rem',
};
const iconSelectDelete = {
    minWidth: '1rem !important',
    width: '3rem !important',
    height: '3rem !important',
};
