import { useState } from 'react';
import { Box, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

// Material Icons
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import VisibilityIcon from '@mui/icons-material/Visibility';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import BorderColorIcon from '@mui/icons-material/BorderColor';

// Utils
import adminService from 'service/api/adminService';
import theme from 'assets/theme';
import { getErrorForSnackbar } from 'utils/helpers';

// Components
import DDeleteDialog from 'components/new/shared/DDeleteDialog/Index';
import DSnackbar from 'components/new/shared/DSnackbar';

// Assets
import { StyledCategoryHeaderBox, StyledCategoryHeaderButton, StyledTextField } from './styles';

const CategoryTreeRootHeaderContent = ({
    root,
    color,
    parentId,
    isNew,
    childrenArray,
    open,
    onSave,
    onDelete,
    onClick,
    onActionSelected,
}) => {
    const [loading, setLoading] = useState({ update: false, delete: false });
    const [showDeleteCategoryDialog, setShowDeleteCategoryDialog] = useState(false);
    const [showUpdateMode, setShowUpdateMode] = useState(false);
    const [categoryName, setCategoryName] = useState(root.name || '');
    const [snackBarData, setSnackBarData] = useState({
        show: false,
        data: {},
    });
    const hasChildren = childrenArray && childrenArray.length > 0;
    const actions = {
        delete: { title: 'حذف', icon: <DeleteOutlineIcon />, emitData: root, hideIfThereIsChildren: true },
    };

    const stopEvent = (e) => {
        e.stopPropagation();
        e.preventDefault();
    };
    const callThisAction = (e, actionKey) => {
        e.stopPropagation();
        e.preventDefault();
        if (actionKey === 'delete') {
            setShowDeleteCategoryDialog(true);
        } else if (actionKey === 'seeServices') {
            onActionSelected(actionKey, actions[actionKey].emitData);
        }
    };
    const saveButtonClicked = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (isNew) createCategory();
        else updateCategory();
    };
    const openUpdateMode = (e) => {
        stopEvent(e);
        setShowUpdateMode(true);
    };
    const seeServices = (e) => {
        stopEvent(e);
        onActionSelected('seeServices', root);
    };
    const createCategory = async () => {
        if (loading.update) return;
        setLoading({ update: true });

        const formData = new FormData();
        if (categoryName) formData.append('name', categoryName);
        if (parentId) formData.append('parent_id', parentId);

        await adminService
            .createCategory(formData)
            .then((res) => {
                setSnackBarData({
                    show: true,
                    data: {
                        text: 'دسته بندی با موفقیت ایجاد شد.',
                        type: 'success',
                    },
                });
                setShowUpdateMode(false);
                onSave({ id: res.data.data.id, oldId: root.id, name: categoryName });
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
    const updateCategory = async () => {
        if (loading.update) return;
        setLoading({ update: true });
     
        const formData = new FormData();
        formData.append('_method', 'put');
        if (categoryName) formData.append('name', categoryName);
    
        await adminService
            .updateCategory(root.id, formData)
            .then((res) => {
                setSnackBarData({
                    show: true,
                    data: {
                        text: 'دسته بندی با موفقیت ویرایش شد.',
                        type: 'success',
                    },
                });
              
                setShowUpdateMode(false); 
                onSave({ id: res.data.data.id, name: categoryName });
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
    const deleteCategory = async () => {
       
        if (root.isNew) {
            onDelete(root);
            // const newChildren = children.filter((item) => item.id !== categoryId);
            // setChildren(newChildren);
        } else {
            if (loading.delete) return;
            setLoading({ delete: true });

            await adminService
                .deleteCategory(root.id)
                .then((res) => {
                    setShowDeleteCategoryDialog(false);
                    onDelete(root);
                })
                .catch((err) => {
                
                });
        }
    };

    const textInputStyles =
        isNew || showUpdateMode ? { display: 'flex', position: 'relative', zIndex: 1 } : { display: 'flex', gap: '3px' };

    const CssBox = styled(Box)({
        '& .MuiButton-root ': {
            color: theme.main.palette.brandGray.main,
            '& svg': {
                fontSize: '14px',
            },
        },
    });
    const renderActions = (
        <CssBox sx={{ display: 'flex', alignItems: 'center', gap: '20px', marginLeft: '20px', position: 'relative', zIndex: 1 }}>
            {/* show this button when we are adding a new category */}
            {showUpdateMode || isNew ? (
                <StyledCategoryHeaderButton
                buttonColor={color}
                    loading={loading.update}
                    startIcon={<CheckCircleOutlineIcon />}
                    onClick={saveButtonClicked}>
                    ذخیره
                </StyledCategoryHeaderButton>
            ) : (
                <StyledCategoryHeaderButton
                    buttonColor={color}
                    loading={loading.update}
                    startIcon={<BorderColorIcon />}
                    onClick={openUpdateMode}>
                    ویرایش
                </StyledCategoryHeaderButton>
            )}

            {/* hide actions when we are adding a new category */}
            {Object.keys(actions).map(
                (actionKey) =>
                    !(hasChildren && actions[actionKey].hideIfThereIsChildren) && (
                        <Box
                            key={actionKey}
                            sx={{ display: 'flex', alignItems: 'center', gap: '6px' }}
                            onClick={(e) => callThisAction(e, actionKey)}>
                            {actions[actionKey].icon}
                            <Typography fontSize="12px" fontWeight={600}>
                                {actions[actionKey].title}
                            </Typography>
                        </Box>
                    )
            )}

            {/* See Services Button */}
            {!isNew && (
                <Box sx={{ display: 'flex', alignItems: 'center', gap: '6px' }} onClick={seeServices}>
                    <VisibilityIcon />
                    <Typography fontSize="12px" fontWeight={600}>
                        مشاهده خدمت‌ها
                    </Typography>
                </Box>
            )}
        </CssBox>
    );
    return (
        <>
            <StyledCategoryHeaderBox color={color}>
                <Box
                    sx={{
                        position: 'absolute',
                        top: 0,
                        right: 0,
                        width: '100%',
                        height: '100%',
                        backgroundColor: 'transparent',
                        borderRadius: '8px',
                    }}
                    onClick={onClick}></Box>
                <Box sx={textInputStyles}>
                    {/* if we are in add or edit mode show TextField instead of name text*/}
                    {isNew || showUpdateMode ? (
                        <StyledTextField
                            value={categoryName}
                            onChange={(event) => {
                                setCategoryName(event.target.value);
                            }}
                            hiddenLabel
                            ml="auto"
                            size="small"
                            variant="filled"
                            placeholder="نام دسته‌بندی"
                        />
                    ) : (
                        <>
                            <Typography fontWeight={open ? 600 : 500}>{root.name}</Typography>
                            <Typography fontSize="13px">{` / ${childrenArray ? childrenArray.length : 0} زیرمجموعه`}</Typography>
                        </>
                    )}
                </Box>

                <Box mr="auto" sx={{ display: 'flex', alignItems: 'center' }}>
                    {/* Actions */}
                    {renderActions}

                    {/* Arrow Icons */}
                    {!isNew && (
                        <Box sx={{ display: 'flex', position: 'relative', zIndex: 1, pointerEvents: 'none' }}>
                            {open ? <KeyboardArrowUpIcon fontSize="large" /> : <KeyboardArrowLeftIcon fontSize="large" />}
                        </Box>
                    )}
                </Box>
            </StyledCategoryHeaderBox>
            <DSnackbar
                open={snackBarData.show}
                info={snackBarData.data}
                onClose={() => setSnackBarData({ ...snackBarData, show: false })}
            />

            {/* Delete Group Dialog */}
            {showDeleteCategoryDialog && (
                <DDeleteDialog
                    loading={loading.delete}
                    title="دسته‌بندی"
                    onDelete={deleteCategory}
                    onClose={() => setShowDeleteCategoryDialog(false)}
                />
            )}
        </>
    );
};

export default CategoryTreeRootHeaderContent;
