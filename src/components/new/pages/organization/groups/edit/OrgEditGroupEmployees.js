import { useState, useEffect } from 'react';
import { Box, TableCell, TableHead, TableRow, TableBody, Grid, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import GroupsIcon from '@mui/icons-material/Groups';

// Utils
import OrganizationService from 'service/api/organization.service';

// Components
import DTableWrapper from 'components/new/shared/DTable/DTableWrapper';
import DTableEmpty from 'components/new/shared/DTable/DTableEmpty';
import DPagination from 'components/new/shared/DPagination/Index';

// Assets
import theme from 'assets/theme';
import DLoadingWrapper from 'components/new/shared/DLoadingWrapper';
import OrgEditGroupEmployeeItem from './OrgEditGroupEmployeeItem';

const tableColumns = [
    { title: '', style: { width: '36px' } },
    { title: 'نام کارمند' },
    { title: 'کدملی' },
    { title: 'شماره موبایل' },
    { title: 'نام گروه فعلی' },
    { title: 'موقعیت سازمانی' },
];

const OrgEditGroupEmployees = ({ selectedEmployees, onDelete, onEmployeeToggle }) => {
    const [loading, setLoading] = useState({ initial: true, refresh: false });
    const [employees, setEmployees] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPage, setTotalPage] = useState(1);
    const { t } = useTranslation();

    const handlePageChange = (newPage) => {
        if (loading.refresh) return;
        setLoading({
            ...loading,
            refresh: true,
        });
        setPage(newPage);
    };

    useEffect(() => {
        const controller = new AbortController();
        const signal = controller.signal;

        (async () => {
            const params = new URLSearchParams();
            params.append('page', page);
            await OrganizationService.get(`employees?${params.toString()}`, { signal })
                .then((res) => {
                    setEmployees(res.data.data);
                    setTotalPage(res.data.meta.last_page);
                })
                .catch((err) => {
                    console.log('error occured!');
                });

            setLoading({ ...loading, initial: false, refresh: false });
        })();

        return () => controller.abort();
    }, [page]);
    return (
        <DLoadingWrapper loading={loading.initial} sx={{ mt: '25px' }}>
            {employees && employees.length > 0 && (
                <Grid item xs={12} sx={{ mt: '25px' }} className={loading.refresh ? 'box--isLoading' : ''}>
                    <Grid container>
                        <Grid item xs={12}>
                            <Box
                                sx={{
                                    borderBottom: '1px solid rgba(0, 0, 0, 0.2)',
                                    pb: '8px',
                                    display: 'flex',
                                    gap: '10px',
                                    alignItems: 'center',
                                }}>
                                <GroupsIcon sx={{ color: theme.main.palette.primary.main }} fontSize="large" />
                                <Typography color="primary.main" sx={{ fontWeight: 600, fontSize: '16px' }}>
                                    افزودن کارمندان به گروه
                                </Typography>
                            </Box>
                        </Grid>
                        <Grid item xs={12} mt="12px">
                            <DTableWrapper>
                                <TableHead>
                                    <TableRow>
                                        {tableColumns.map((column, index) => {
                                            return (
                                                <TableCell
                                                    style={{ ...tableHeadStyle, ...column.style }}
                                                    key={`table-column-${index}`}>
                                                    {column.title}
                                                </TableCell>
                                            );
                                        })}
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {employees.length > 0 ? (
                                        employees.map((employee, index) => (
                                            <OrgEditGroupEmployeeItem
                                                employee={employee}
                                                key={employee.id}
                                                selected={!!selectedEmployees.find((item) => item.id === employee.id)}
                                                style={{
                                                    backgroundColor: index % 2 !== 0 ? '#f2f2f2' : '#ffffff',
                                                }}
                                                onCheckBoxToggled={onEmployeeToggle}
                                            />
                                        ))
                                    ) : (
                                        <DTableEmpty />
                                    )}
                                </TableBody>
                            </DTableWrapper>
                        </Grid>
                        {totalPage > 1 && (
                            <Grid item xs={12} mt="12px">
                                <Box sx={{ displat: 'flex', alignItems: 'center' }}>
                                    <DPagination
                                        current={page}
                                        sx={{ marginRight: 'auto' }}
                                        totalPages={totalPage}
                                        onPageChange={handlePageChange}
                                    />
                                </Box>
                            </Grid>
                        )}
                    </Grid>
                </Grid>
            )}
        </DLoadingWrapper>
    );
};
const tableHeadStyle = {
    backgroundColor: theme.main.palette.primary.light,
    textAlign: 'center',
    fontWeight: 400,
    fontSize: '1.5rem',
    fontFamily: `"IRANSans", "sans-serif", "serif"`,
};
export default OrgEditGroupEmployees;
