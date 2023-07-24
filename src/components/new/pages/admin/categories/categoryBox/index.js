import { useState } from 'react';
import { Box, TextField, Button, Checkbox } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { styled } from '@mui/material/styles';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import BorderColorIcon from '@mui/icons-material/BorderColor';

// Utils
import adminService from 'service/api/adminService';
import theme from 'assets/theme';
import { getErrorForSnackbar } from 'utils/helpers';

// Components
import DSnackbar from 'components/new/shared/DSnackbar';
import CategoryBoxColorPallate from './CategoryBoxColorPallate';
import CategoryBoxImagePicker from './CategoryBoxImagePicker';

const CategoryBox = ({ addBox, isSelected, defaultValues = {}, onCancel, onDelete, onSelect, onCreate }) => {
    const [loading, setLoading] = useState({ save: false, update: false });
    const [category, setCategory] = useState({ ...defaultValues });
    const activatePriamryTheme = isSelected || addBox;
    const [snackBarData, setSnackBarData] = useState({
        show: false,
        data: {},
    });

    const mainButtonIcon = addBox ? (
        <CheckCircleOutlineIcon sx={{ ml: '4px', fontSize: '16px !important' }} />
    ) : (
        <BorderColorIcon sx={{ ml: '4px', fontSize: '12px !important' }} />
    );
    const categoryWrapperStyles = {
        backgroundColor: addBox || isSelected ? theme.main.palette.primary.light : theme.main.palette.info.input,
        borderRadius: '6px',
        display: 'flex',
        flexDirection: 'column',
    };
    const DeleteButton = styled(Button)({
        backgroundColor: addBox ? '#fff' : 'transparent',
    });

    const handleSelectedFile = (file) => {
        setCategory({
            ...category,
            thumbnail: file,
            thumbnailUploaded: true,
        });
    };
    const handleSelectedColor = (color) => {
        setCategory({
            ...category,
            color: color,
        });
    };
    const createCategory = async () => {
        if (loading.save) return;
        setLoading({ save: true });

        const formData = new FormData();
        if (category?.name) formData.append('name', category.name);
        if (category?.color) formData.append('color', category.color);
        if (category?.thumbnail) formData.append('thumbnail', category.thumbnail);

        await adminService
            .createCategory(formData)
            .then((res) => {
                onCreate(res.data.data.id);
            })
            .catch((err) => {
                const errorMsg = err?.response?.data?.data && getErrorForSnackbar(err.response.data.data);
                errorMsg &&
                    setSnackBarData({
                        show: true,
                        data: {
                            text: errorMsg,
                            type: 'error',
                        },
                    });
            });
        setLoading({ save: false });
    };
    const editCategory = async () => {
        if (loading.update) return;
        setLoading({ update: true });

        const formData = new FormData();
        formData.append('_method', 'put');
        if (category?.name) formData.append('name', category.name);
        if (category?.color) formData.append('color', category.color);
        if (category?.thumbnailUploaded) formData.append('thumbnail', category.thumbnail);

        await adminService
            .updateCategory(category.id, formData)
            .then((res) => {
                setSnackBarData({
                    show: true,
                    data: {
                        text: 'دسته بندی با موفقیت ویرایش شد.',
                        type: 'success',
                    },
                });
            })
            .catch((err) => {
                console.log('error occured!');
            });

        setLoading({ update: false });
    };

    return (
        <Box sx={{ marginBottom: '20px' }}>
            <Box sx={categoryWrapperStyles}>
                <Box sx={{ padding: '10px 16px', display: 'flex', gap: '1rem' }}>
                    {!addBox && (
                        <CssCheckbox
                            checked={isSelected}
                            onChange={(event) => {
                                onSelect(event.target.checked ? category : null);
                            }}
                        />
                    )}
                  
                    <CssTextField
                        value={category.name}
                        onChange={(event) => {
                            setCategory({ ...category, name: event.target.value });
                        }}
                        hiddenLabel
                        ml="auto"
                        size="small"
                        variant="filled"
                        placeholder="نام دسته‌بندی"
                    />

                    <Box sx={{ display: 'flex', gap: '4px' }}>
                        <CssButton
                            variant="contained"
                            color={addBox ? 'primary' : 'brandWarning'}
                            sx={{ padding: '0 6px', minWidth: '55px', height: '24px' }}
                            startIcon={mainButtonIcon}
                            loading={loading.save || loading.update}
                            onClick={() => (addBox ? createCategory() : editCategory())}>
                            {addBox ? 'ذخیره' : 'ویرایش'}
                        </CssButton>


                        {!addBox && category.children_all.length === 0 && (
                            <DeleteButton
                                variant="outlined"
                                color="primary"
                                sx={{
                                    padding: 0,
                                    minWidth: '24px',
                                    height: '24px',
                                    backgroundColor: activatePriamryTheme ? '#fff' : 'transparent',
                                }}
                                disabled={loading.save || loading.update}
                                onClick={() => (addBox ? onCancel() : onDelete(category))}>
                                <DeleteOutlineIcon />
                            </DeleteButton>
                        )}
                    </Box>
                </Box>

                <Box sx={categoryContentStyles}>
                    <CategoryBoxImagePicker
                        hasPrimaryColor={activatePriamryTheme}
                        defaultImage={defaultValues.thumbnail}
                        onFileSelected={handleSelectedFile}
                    />

                    <CategoryBoxColorPallate
                        hasPrimaryColor={activatePriamryTheme}
                        defaultSelectedColor={defaultValues.color}
                        onSelect={handleSelectedColor}
                    />
                </Box>
            </Box>

            <DSnackbar
                open={snackBarData.show}
                info={snackBarData.data}
                onClose={() => setSnackBarData({ ...snackBarData, show: false })}
            />
        </Box>
    );
};

const categoryContentStyles = {
    display: 'flex',
    gap: '10px',
    borderTop: `1px dashed ${theme.main.palette.info.border}`,
    padding: '10px 16px',
    minHeight: '102px',
};
const CssTextField = styled(TextField)({
    '& .MuiFilledInput-input ': {
        padding: '3px 8px',
        backgroundColor: 'transparent',
        fontSize: '12px',
        fontWeight: 600,
    },
});
const CssButton = styled(LoadingButton)({
    '& .MuiButton-startIcon ': {
        margin: 0,
    },
});
const CssCheckbox = styled(Checkbox)({
    padding: 0,
    '& .MuiSvgIcon-root': {
        width: '20px',
        height: '20px',
    },
});
export default CategoryBox;
