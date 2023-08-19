import React, { useEffect, useState } from 'react';
import { Box, Button, Grid, TableBody, TableCell, TableHead, TableRow, Typography } from '@mui/material';
import DashboardCard from 'components/Common/Card/DashboardCard';
import Breadcrumb from 'components/new/shared/BreadCrumb/Index';
import DLoadingWrapper from 'components/new/shared/DLoadingWrapper';
import DTableHeader from 'components/new/shared/DTable/DTableHeader';
import DTableWrapper from 'components/new/shared/DTable/DTableWrapper';
import DTableEmpty from 'components/new/shared/DTable/DTableEmpty';
import DPagination from 'components/new/shared/DPagination/Index';
import adminService from 'service/api/adminService';
import theme from 'assets/theme';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileExcel } from '@fortawesome/free-solid-svg-icons';
import CommentsListItem from './List/CommentsListItem';

const breadCrumbLinks = [{ path: '/app/admin/', title: 'پیشخوان' }, { title: 'مدیریت نظرات' }];
const tableColumns = [
    { title: 'نام و نام خانوادگی' },
    { title: 'عنوان خدمت' },
    { title: 'نظر' },
    { title: 'امتیاز' },
    { title: 'وضعیت' },
    { title: 'تاریخ ثبت نظر' },
    { title: 'عملیات' },
];

function CommentManagement(props) {
    const [loading, setLoading] = useState({ initial: true, refresh: false });
    const [filters, setFilters] = useState({ page: 1 });
    const [totalPage, setTotalPage] = useState(1);
    const [comments, setComments] = useState([]);
    const [disabled, setDisabled] = React.useState(false);

    const handlePageChange = (newPage) => {
        if (loading.refresh) return;
        setLoading({
            ...loading,
            refresh: true,
        });
        setFilters({ ...filters, page: newPage });
    };

    const updateList = () => {
        if (loading.refresh) return;
        setLoading({
            ...loading,
            refresh: true,
        });
        getComments();
    };

    // const updateButton = () => {

    // };

    const getComments = async () => {
        const queryString = new URLSearchParams();
        if (filters?.page) queryString.append('page', filters.page);
        await adminService
            .getComments(queryString.toString())
            .then((res) => {
                setComments(res.data.data);
                setTotalPage(res.data.meta.last_page);
                setLoading({ initial: false, refresh: false });
            })
            .catch((err) => {
          
            });
    };
    useEffect(() => {
        getComments();
    }, [filters]);

    return (
        <DashboardCard pt="2rem" meta={{ title: 'مدیریت نظرات' }}>
            <Breadcrumb links={breadCrumbLinks} />
            <Box
                className={loading.refresh && 'box--isLoading'}
                mt="2rem"
                p="26px 29px"
                bgcolor="common.white"
                borderRadius="14px"
                boxShadow="0px 0px 12px 3px rgba(0, 0, 0, 0.05)">
                <DLoadingWrapper loading={loading.initial}>
                    <>
                        <Grid container>
                            <Grid item xs={12}>
                                <DTableHeader></DTableHeader>
                            </Grid>
                            <Grid item xs={12}>
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
                                        {comments.length > 0 ? (
                                            comments.map((comment, index) => (
                                                <CommentsListItem
                                                    updateButton={setDisabled}
                                                    onRefresh={updateList}
                                                    comment={comment}
                                                    key={comment.id}
                                                    style={{
                                                        backgroundColor: index % 2 !== 0 ? '#f2f2f2' : '#ffffff',
                                                    }}
                                                />
                                            ))
                                        ) : (
                                            <DTableEmpty />
                                        )}
                                    </TableBody>
                                </DTableWrapper>
                            </Grid>
                            <Grid item xs={6} mt="20px" sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                                {totalPage > 1 && <DPagination totalPages={totalPage} onPageChange={handlePageChange} />}
                            </Grid>
                        </Grid>
                    </>
                </DLoadingWrapper>
            </Box>
        </DashboardCard>
    );
}

const tableHeadStyle = {
    backgroundColor: theme.main.palette.primary.light,
    textAlign: 'center',
    fontWeight: 400,
    fontSize: '1.5rem',
    fontFamily: `"IRANSans", "sans-serif", "serif"`,
};

export default CommentManagement;
