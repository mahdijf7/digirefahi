import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Box, TableCell, TableHead, TableRow, TableBody, Button, Grid } from '@mui/material';
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';

// Utils
import OrganizationService from 'service/api/organization.service';

// Components
import DBox from 'components/new/shared/DBox';
import Breadcrumb from 'components/new/shared/BreadCrumb/Index';
import DSnackbar from 'components/new/shared/DSnackbar';
import DTableWrapper from 'components/new/shared/DTable/DTableWrapper';
import DTableEmpty from 'components/new/shared/DTable/DTableEmpty';
import DTableHeader from 'components/new/shared/DTable/DTableHeader';
import DPagination from 'components/new/shared/DPagination/Index';
import DDeleteDialog from 'components/new/shared/DDeleteDialog/Index';
import DLoadingWrapper from 'components/new/shared/DLoadingWrapper';
import DashboardCard from 'components/Common/Card/DashboardCard';
import OrgCreateGroup from 'components/new/pages/organization/groups/add/OrgCreateGroup';
import OrgEditGroup from 'components/new/pages/organization/groups/edit/OrgEditGroup';
import OrgGroupItem from 'components/new/pages/organization/groups/OrgGroupItem';

// Assets
import theme from 'assets/theme';

const tableColumns = [
    { title: 'نام گروه' },
    { title: 'شناسه گروه' },
    { title: 'تعداد کارمندان' },
    { title: 'وضعیت' },
    { title: 'عملیات' },
];

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
    const toggleDeleteGroupDialog = (group) => {
        setShowDeleteDialog(!showDeleteDialog);
        group && setSelectedGroup(group);
    };
    const groupCreatedHandler = () => {
        closeAddGroupDialog();
        handlePageChange(1);
    };
    const showSnackbar = (message) => {
        setSnackBarData({
            show: true,
            data: {
                text: message,
                type: 'success',
            },
        });
    };
    const groupUpdatedHandler = (message) => {
        if (loading.refresh) return;
        setLoading({
            ...loading,
            refresh: true,
        });

        showSnackbar(t('groupUpdatedSuccessfully'));
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

        await OrganizationService.update(`groups/${groupId}?_method=PUT&status=${isChecked ? 'ACTIVE' : 'DEACTIVATE'}`)
            .then((res) => {
                showSnackbar(t('groupStatusUpdatedSuccessfully'));
                setFilters({ ...filters });
            })
            .catch((err) => {
                
            });
    };
    const deleteGroup = async () => {
        if (loading.delete) return;
        setLoading({
            ...loading,
            delete: true,
        });

        await OrganizationService.deleteGroup(selectedGroup.id)
            .then((res) => {
                showSnackbar(t('groupDeletedSuccessfully'));
                toggleDeleteGroupDialog();
                setLoading({
                    ...loading,
                    refresh: true,
                });
                setFilters({ ...filters });
            })
            .catch((err) => {
                setLoading({
                    ...loading,
                    delete: false,
                });
            });
    };

    useEffect(() => {
        const controller = new AbortController();
        const signal = controller.signal;

        (async () => {
            const params = new URLSearchParams();
            params.append('page', filters.page);
            await OrganizationService.get(`groups?${params.toString()}`, { signal })
                .then((res) => {
                    setGroups(res.data.data);
                    setTotalPage(res.data.meta.last_page);
                    setLoading({
                        ...loading,
                        initial: false,
                        refresh: false,
                        delete: false,
                    });
                })
                .catch((err) => {
                    console.log('error occured!');
                });
        })();
        return () => controller.abort();
    }, [filters]);

    return (
        <DashboardCard pt="2rem">
            <Breadcrumb links={breadCrumbLinks} />
            <DBox className={loading.refresh && 'box--isLoading'} sx={{ mt: '2rem', p: '26px 29px' }}>
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
                                        <OrgGroupItem
                                            group={group}
                                            key={group.id}
                                            style={{
                                                backgroundColor: index % 2 !== 0 ? '#f2f2f2' : '#ffffff',
                                            }}
                                            onDelete={toggleDeleteGroupDialog}
                                            onEdit={toggleEditGroupDialog}
                                            onChangeStatus={changeGroupStatus}
                                        />
                                    ))
                                ) : (
                                    <DTableEmpty />
                                )}
                            </TableBody>
                        </DTableWrapper>
                        {totalPage > 1 && <DPagination totalPages={totalPage} onPageChange={handlePageChange} />}
                    </>
                </DLoadingWrapper>
            </DBox>

            {/*  Delete Group Dialog */}
            {showDeleteDialog && (
                <DDeleteDialog loading={loading.delete} title="گروه" onDelete={deleteGroup} onClose={toggleDeleteGroupDialog} />
            )}

            {/* Add Group Dialog */}
            {showAddGroupDialog && <OrgCreateGroup onClose={closeAddGroupDialog} onCreate={groupCreatedHandler} />}

            {/* Edit Group Dialog */}
            {showEditDialog && (
                <OrgEditGroup groupId={selectedGroup?.id} onClose={toggleEditGroupDialog} onSave={groupUpdatedHandler} />
            )}

            <DSnackbar
                open={snackBarData.show}
                info={snackBarData.data}
                onClose={() => setSnackBarData({ ...snackBarData, show: false })}
            />
        </DashboardCard>
    );
};
const breadCrumbLinks = [
    { path: '/app/organization/dashboard/', title: 'پیشخوان' },
    {
        path: '/app/organization/groups/',
        title: 'مدیریت سازمان ',
    },
    { title: 'مدیریت گروه‌ها' },
];
const tableHeadStyle = {
    backgroundColor: theme.main.palette.primary.light,
    textAlign: 'center',
    fontWeight: 400,
    fontSize: '1.5rem',
    fontFamily: `"IRANSans", "sans-serif", "serif"`,
};
export default Groups;
