import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Box, TableCell, TableHead, TableRow, TableBody, Button, Grid } from '@mui/material';
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';

// Utils
import adminService from 'service/api/adminService';

// Components
import DSnackbar from 'components/new/shared/DSnackbar';
import DTableWrapper from 'components/new/shared/DTable/DTableWrapper';
import DTableEmpty from 'components/new/shared/DTable/DTableEmpty';
import DTableHeader from 'components/new/shared/DTable/DTableHeader';
import DPagination from 'components/new/shared/DPagination/Index';
import DDeleteDialog from 'components/new/shared/DDeleteDialog/Index';
import DLoadingWrapper from 'components/new/shared/DLoadingWrapper';
import AddGroupDialog from './addGroupDialog';
import AdminOrgEditGroup from './edit/AdminOrgEditGroup';
import GroupItem from './GroupItem';

// Assets
import theme from 'assets/theme';

const tableColumns = [{ title: 'نام گروه' }, { title: 'تعداد کارمندان' }, { title: 'وضعیت' }, { title: 'عملیات' }];

const Groups = ({}) => {
    const [loading, setLoading] = useState({
        initial: true,
        refresh: false,
        delete: false,
    });
    const [showDeleteDialog, setShowDeleteDialog] = useState(false);
    const [showEditDialog, setShowEditDialog] = useState(false);
    const [showAddGroupDialog, setShowAddGroupDialog] = useState(false);
    const [groups, setGroups] = useState([]);
    const [selectedGroup, setSelectedGroup] = useState({});
    const [filters, setFilters] = useState({ page: 1 });
    const [totalPage, setTotalPage] = useState(1);
    const { companyId } = useParams();
    const { t } = useTranslation();
    const [snackBarData, setSnackBarData] = useState({
        show: false,
        data: {},
    });

    const handlePageChange = (newPage) => {
        if (loading.refresh) return;
        setLoading({
            ...loading,
            refresh: true,
        });
        setFilters({ ...filters, page: newPage });
    };
    const openDeleteDialog = (group) => {
        setShowDeleteDialog(true);
        setSelectedGroup(group);
    };
    const closeDeleteDialog = () => {
        setShowDeleteDialog(false);
    };
    const openAddGroupDialog = () => {
        setShowAddGroupDialog(true);
    };
    const closeAddGroupDialog = () => {
        setShowAddGroupDialog(false);
    };
    const toggleEditGroupDialog = (group) => {
        setShowEditDialog(!showEditDialog);
        group && setSelectedGroup(group);
    };
    const newGroupAddedHandler = () => {
        closeAddGroupDialog();
        handlePageChange(1);
    };
    const groupUpdatedHandler = (message) => {
        if (loading.refresh) return;
        setLoading({
            ...loading,
            refresh: true,
        });

        setSnackBarData({
            show: true,
            data: {
                text: t('groupUpdatedSuccessfully'),
                type: 'success',
            },
        });
        setShowEditDialog(!showEditDialog);
        setSelectedGroup({});

        setFilters({ ...filters });
    };
    const changeGroupStatus = async (groupId, isChecked) => {
        if (loading.refresh) return;
        setLoading({
            ...loading,
            refresh: true,
        });

        await adminService
            .changeGroupStatus(groupId, isChecked ? 'ACTIVE' : 'DEACTIVATE')
            .then((res) => {
                getCompanyGroups();
            })
            .catch((err) => {
                console.log('error occured!');
            });
    };
    const deleteGroup = async () => {
        if (loading.delete) return;
        setLoading({
            ...loading,
            delete: true,
        });

        await adminService
            .deleteCompanyGroup(selectedGroup.id)
            .then((res) => {
                closeDeleteDialog();
                getCompanyGroups();
            })
            .catch((err) => {
                console.log('error occured!');
            });
    };
    const getCompanyGroups = async () => {
        await adminService
            .getCompanyGroups(companyId, filters.page)
            .then((res) => {
                setGroups(res.data.data);
                setTotalPage(res.data.meta.last_page);
                setLoading({
                    ...loading,
                    initial: false,
                    refresh: false,
                    delete: false,
                });
                closeDeleteDialog();
            })
            .catch((err) => {
                console.log('error occured!');
            });
    };

    useEffect(() => {
        getCompanyGroups();
    }, [filters]);

    return (
        <Box
            className={(loading.delete || loading.refresh) && 'box--isLoading'}
            sx={{
                padding: '20px 40px 0 40px',
            }}>
            <DLoadingWrapper loading={loading.initial}>
                <>
                    <DTableHeader>
                        <Button
                            variant="contained"
                            color="brandWarning"
                            sx={{ fontSize: '14px' }}
                            startIcon={<PersonAddAltIcon fontSize="large" sx={{ margin: '0 0 0 1rem' }} />}
                            type="button"
                            onClick={openAddGroupDialog}>
                            {t('addGroup')}
                        </Button>
                    </DTableHeader>
                    <DTableWrapper>
                        <TableHead>
                            <TableRow>
                                {tableColumns.map((column, index) => {
                                    return (
                                        <TableCell style={tableHeadStyle} key={`table-column-${index}`}>
                                            {column.title}
                                        </TableCell>
                                    );
                                })}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {groups.length > 0 ? (
                                groups.map((group, index) => (
                                    <GroupItem
                                        group={group}
                                        key={group.id}
                                        style={{
                                            backgroundColor: index % 2 !== 0 ? '#f2f2f2' : '#ffffff',
                                        }}
                                        onDelete={openDeleteDialog}
                                        onEdit={toggleEditGroupDialog}
                                        onChangeStatus={changeGroupStatus}
                                    />
                                ))
                            ) : (
                                <DTableEmpty />
                            )}
                        </TableBody>
                    </DTableWrapper>
                    <Grid
                        item
                        xs={12}
                        sx={{
                            display: 'flex',
                            justifyContent: 'flex-end',
                            marginTop: '65px',
                        }}>
                        <Button sx={{ fontSize: '14px' }} variant="outlined" component={Link} to="/app/admin/companies/">
                            بازگشت به لیست سازمان‌ها
                        </Button>
                    </Grid>
                    {totalPage > 1 && <DPagination totalPages={totalPage} onPageChange={handlePageChange} />}
                </>
            </DLoadingWrapper>

            {/* Delete Group Dialog */}
            {showDeleteDialog && (
                <DDeleteDialog loading={loading.delete} title="گروه" onDelete={deleteGroup} onClose={closeDeleteDialog} />
            )}

            {/* Add Group Dialog */}
            {showAddGroupDialog && <AddGroupDialog onClose={closeAddGroupDialog} onSave={newGroupAddedHandler} />}

            {/* Edit Group Dialog */}
            {showEditDialog && (
                <AdminOrgEditGroup groupId={selectedGroup?.id} onClose={toggleEditGroupDialog} onSave={groupUpdatedHandler} />
            )}

            <DSnackbar
                open={snackBarData.show}
                info={snackBarData.data}
                onClose={() => setSnackBarData({ ...snackBarData, show: false })}
            />
        </Box>
    );
};

const tableHeadStyle = {
    backgroundColor: theme.main.palette.primary.light,
    textAlign: 'center',
    fontWeight: 400,
    fontSize: '1.5rem',
    fontFamily: `"IRANSans", "sans-serif", "serif"`,
};
export default Groups;
