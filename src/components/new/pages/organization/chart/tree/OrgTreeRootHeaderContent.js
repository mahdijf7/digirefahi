import { useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Typography, TextField } from '@mui/material';

// Material Icons
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import BorderColorIcon from '@mui/icons-material/BorderColor';

// Utils
import organizationService from 'service/api/organization.service';
import adminService from 'service/api/adminService';
import theme from 'assets/theme';
import { getErrorForSnackbar } from 'utils/helpers';
import { StyledCheckBox, StyledBox, StyledRootBox, StyledTextField, StyledButton } from './styles';
import ChartContext from '../chart-context';

// Components
import DDeleteDialog from 'components/new/shared/DDeleteDialog/Index';
import DSnackbar from 'components/new/shared/DSnackbar';
import TreeRootId from './TreeRootId';

const OrgTreeRootHeaderContent = ({
    isMainRoot,
    root,
    parentId,
    isNew,
    childrenLength,
    open,
    onCreate,
    onDelete,
    onUpdate,
    onClick,
    onActionSelected,
}) => {
    const [loading, setLoading] = useState({ create: false, delete: false, update: false });
    const [showDeleteCategoryDialog, setShowDeleteCategoryDialog] = useState(false);
    const [showUpdateMode, setShowUpdateMode] = useState(false);
    const [categoryName, setCategoryName] = useState(root.name || '');
    const { companyId } = useParams();
    const [snackBarData, setSnackBarData] = useState({
        show: false,
        data: {},
    });
    const { selectedNode, selectNode } = useContext(ChartContext);
    const actions = !isMainRoot
        ? {
              delete: { title: 'حذف', icon: <DeleteOutlineIcon />, emitData: root, hideIfThereIsChildren: true },
          }
        : {};
    const isChecked = root?.id && selectedNode?.id ? root.id === selectedNode.id : false;

    const stopEvent = (e) => {
        e.stopPropagation();
        e.preventDefault();
    };
    const callThisAction = (e, actionKey) => {
        stopEvent(e);
        if (actionKey === 'delete') {
            setShowDeleteCategoryDialog(true);
        } else if (actionKey === 'seeServices') {
            onActionSelected(actionKey, actions[actionKey].emitData);
        }
    };
    const saveButtonClicked = (e) => {
        stopEvent(e);
        if (isNew) createOrganizationUnit();
        else updateOrganizationUnit();
    };
    const openUpdateMode = (e) => {
        stopEvent(e);
        setShowUpdateMode(true);
    };
    const createOrganizationUnit = async () => {
        if (loading.create) return;
        setLoading({ create: true });

        const formData = new FormData();
        if (categoryName) formData.append('name', categoryName);
        if (parentId) formData.append('parent_id', parentId);
        if (companyId) formData.append('company_id', companyId);

        await organizationService
            .createOrganizationUnit(formData)
            .then((res) => {
                onCreate({ oldId: root.id, ...res.data.data });
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

        setLoading({ ...loading, create: false });
    };
    const updateOrganizationUnit = async () => {
        if (loading.update) return;
        setLoading({ ...loading, update: true });

        const params = new URLSearchParams();
        params.append('_method', 'put');
        if (categoryName) params.append('name', categoryName);

        await organizationService
            .updateOrganizationUnit(root.id, params)
            .then((res) => {
                setShowUpdateMode(false);
                onUpdate({ id: res.data.data.id, name: categoryName });
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

        setLoading({ ...loading, update: false });
    };
    const deleteCategory = async () => {
        
        if (root.isNew) {
            onDelete(root);
        } else {
            if (loading.delete) return;
            setLoading({ delete: true });

            await organizationService
                .deleteOrganizationUnit(root.id)
                .then((res) => {
                    setShowDeleteCategoryDialog(false);
                    onDelete(root, true);
                })
                .catch((err) => {
                    console.log('error occured!');
                });
        }
    };

    const toggleRootSelection = () => {
        selectNode(root);
    };

    const textInputStyles =
        isNew || showUpdateMode ? { display: 'flex', position: 'relative', zIndex: 1 } : { display: 'flex', gap: '3px' };

    const renderActions = (
        <StyledBox
            sx={{ display: 'flex', alignItems: 'center', gap: '20px', marginLeft: '20px', position: 'relative', zIndex: 1 }}>
            {/* Tree Root Id */}
            {!isMainRoot && !(isNew || showUpdateMode) && <TreeRootId id={root.id} />}

            {/* show create button only if we are not in the root level */}
            {!isMainRoot && (isNew || showUpdateMode) && (
                <StyledButton
                    sx={{ color: `${theme.main.palette.primary.main} !important` }}
                    loading={loading.create || loading.update}
                    startIcon={<CheckCircleOutlineIcon />}
                    onClick={saveButtonClicked}>
                    ذخیره
                </StyledButton>
            )}

            {!isMainRoot && !showUpdateMode && !isNew && (
                <StyledButton loading={loading.update} startIcon={<BorderColorIcon />} onClick={openUpdateMode}>
                    ویرایش
                </StyledButton>
            )}

            {/* hide actions when we are adding a new category */}
            {Object.keys(actions).map(
                (actionKey) =>
                    !(childrenLength > 0 && actions[actionKey].hideIfThereIsChildren) && (
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
        </StyledBox>
    );
    return (
        <>
            <StyledRootBox isChecked={isChecked}>
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
                            placeholder="نام واحد سازمانی"
                        />
                    ) : (
                        <>
                            {/* we dont need to show checkbox in our main root */}
                            {!isMainRoot && <StyledCheckBox checked={isChecked} onChange={toggleRootSelection} />}
                            <Typography color={isChecked ? 'primary.main' : '#000000'} fontWeight={open ? 600 : 500}>{root.name}</Typography>
                            <Typography fontSize="13px">{` / ${childrenLength} زیرمجموعه`}</Typography>
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
            </StyledRootBox>
            <DSnackbar
                open={snackBarData.show}
                info={snackBarData.data}
                onClose={() => setSnackBarData({ ...snackBarData, show: false })}
            />

            {/* Delete Group Dialog */}
            {showDeleteCategoryDialog && (
                <DDeleteDialog
                    loading={loading.delete}
                    title="واحد سازمانی"
                    onDelete={deleteCategory}
                    onClose={() => setShowDeleteCategoryDialog(false)}
                />
            )}
        </>
    );
};

export default OrgTreeRootHeaderContent;
