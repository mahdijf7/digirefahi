import { useTranslation } from 'react-i18next';
import theme from 'assets/theme';
import { Table, TableBody, TableCell, TableContainer, TableRow, TableHead, Paper, Stack, Button, Chip } from '@mui/material';
import { isEmpty } from 'lodash';
import RequestModal from './RequestModal';
import { useState } from 'react';

const RequestsTable = ({ content }) => {
    const { t } = useTranslation();
    const [iseOpen, setIsOpen] = useState();
    const [rowData, setRowData] = useState();

    const renderStatus = (status) => {
        if (status === 'pending') return <Chip color="primary" variant="outlined" label={t('requests.pendingStatus')} />;
        else if (status === 'approve') return <Chip color="success" variant="outlined" label={t('requests.approveStatus')} />;
        else return <Chip color="error" variant="outlined" label={t('requests.rejectStatus')} />;
    };

    return (
        <>
            <TableContainer
                component={Paper}
                sx={{
                    border: `.1rem solid  ${theme.main.palette.background.lightDark} `,
                    borderRadius: '.5rem',
                    boxShadow: 'none',
                    my: '2rem',
                }}>
                <Table sx={styleTable} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="center">{t('requests.organizationName')}</TableCell>
                            <TableCell align="center">{t('requests.serviceType')}</TableCell>
                            <TableCell align="center">{t('requests.supplier')}</TableCell>
                            <TableCell align="center">{t('requests.unitPrice')}</TableCell>
                            <TableCell align="center">{t('requests.quantity')}</TableCell>
                            <TableCell align="center">{t('requests.totalPrice')}</TableCell>
                            <TableCell align="center">{t('requests.startDate')}</TableCell>
                            <TableCell align="center">{t('requests.status')}</TableCell>
                            <TableCell align="center">{t('requests.action')}</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {content &&
                            content.map((row) => (
                                <TableRow key={row.id} sx={tableStyle}>
                                    <TableCell align="center">{row.organizationName}</TableCell>
                                    <TableCell align="center">{row.serviceType}</TableCell>
                                    <TableCell align="center">{row.supplier}</TableCell>
                                    <TableCell align="center">{Number(row.unitPrice | 0).toLocaleString('IRR')}</TableCell>
                                    <TableCell align="center">{row.quantity}</TableCell>
                                    <TableCell align="center">{Number(row.totalPrice | 0).toLocaleString('IRR')}</TableCell>
                                    <TableCell align="center">
                                        {!isEmpty(row.startDate) ? new Date(row.startDate).toLocaleDateString('IR-fa') : '-'}
                                    </TableCell>
                                    <TableCell align="center">{renderStatus(row.status)}</TableCell>
                                    <TableCell align="center">
                                        <Stack direction="row" spacing={2} justifyContent="space-evenly">
                                            <Button
                                                variant="contained"
                                                color="warning"
                                                sx={{ mx: 1 }}
                                                onClick={() => {
                                                    setRowData(row);
                                                    setIsOpen(true);
                                                }}>
                                                تغییر وضعیت
                                            </Button>
                                        </Stack>
                                    </TableCell>
                                </TableRow>
                            ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <RequestModal isOpen={iseOpen} onClose={() => setIsOpen(false)} row={rowData} />
        </>
    );
};

const styleTable = {
    // width: '300px',
    direction: 'rtl',
    '& .MuiTableCell-root': {
        border: `.1rem solid  ${theme.main.palette.background.lightDark} `,
        py: '1rem',
        fontSize: '1.4rem',
        fontWeight: 400,
    },
    '& .MuiTableHead-root': {
        bgcolor: 'primary.light',
        height: '4.5rem',
    },
};
const tableStyle = {
    '& .MuiTableCell-root': {
        height: '6rem',
        '&:not(:last-child)': {
            borderLeft: `.1rem solid  ${theme.main.palette.background.lightDark} `,
        },
    },
    '&:nth-of-type(odd)': {
        backgroundColor: 'background.light',
    },
    '&:nth-of-type(even)': {
        backgroundColor: 'background.default',
    },
    '&:last-child td, &:last-child th': {},
};

export default RequestsTable;
