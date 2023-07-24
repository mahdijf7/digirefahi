import { useState, useEffect } from 'react';
import { Box, TableCell, TableHead, TableRow, TableBody, CircularProgress, Grid, Button, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import GroupsIcon from '@mui/icons-material/Groups';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

// Components
import DTableWrapper from 'components/new/shared/DTable/DTableWrapper';
import DTableEmpty from 'components/new/shared/DTable/DTableEmpty';
import DTableCell from 'components/new/shared/DTable/DTableCell';

// Assets
import theme from 'assets/theme';

const tableColumns = [
    { title: 'نام کارمند' },
    { title: 'کدملی' },
    { title: 'شماره موبایل' },
    { title: 'موقعیت سازمانی' },
    { title: 'حذف' },
];

const AdminOrgEditGroupSelectedEmployees = ({ employees, onDelete }) => {
    const { t } = useTranslation();

    return (
        <Grid item xs={12} mt="20px">
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
                            اعضای گروه
                        </Typography>
                    </Box>
                </Grid>
                <Grid item xs={12} mt="12px">
                    <Box
                        sx={{
                            width: '100%',
                            display: 'flex',
                            maxHeight: '400px',
                            overflowY: 'auto',
                        }}>
                        <DTableWrapper sx={{ pb: '20px' }}>
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
                                        <TableRow
                                            key={employee.id}
                                            style={{
                                                backgroundColor: index % 2 !== 0 ? '#f2f2f2' : '#ffffff',
                                            }}>
                                            <DTableCell>{employee.full_name || '---'}</DTableCell>
                                            <DTableCell>{employee.national_code || '---'}</DTableCell>
                                            <DTableCell>{employee.mobile || '---'}</DTableCell>
                                            <DTableCell>{'---'}</DTableCell>
                                            <DTableCell>
                                                <Box className="flex" sx={{ gap: '10px' }}>
                                                    <DeleteOutlineIcon
                                                        fontSize="large"
                                                        sx={{ color: '#F77A06', cursor: 'pointer' }}
                                                        onClick={() => onDelete(employee)}
                                                    />
                                                </Box>
                                            </DTableCell>
                                        </TableRow>
                                    ))
                                ) : (
                                    <DTableEmpty message="کارمندی به این گروه اضافه نشده است." />
                                )}
                            </TableBody>
                        </DTableWrapper>
                    </Box>
                </Grid>
            </Grid>
        </Grid>
    );
};
const tableHeadStyle = {
    backgroundColor: theme.main.palette.primary.light,
    textAlign: 'center',
    fontWeight: 400,
    fontSize: '1.5rem',
    fontFamily: `"IRANSans", "sans-serif", "serif"`,
};
export default AdminOrgEditGroupSelectedEmployees;
