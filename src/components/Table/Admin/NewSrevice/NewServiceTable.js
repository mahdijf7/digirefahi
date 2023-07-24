import * as React from 'react';

import { useTranslation } from 'react-i18next';
import theme from 'assets/theme';
import { Table, TableBody, TableCell, TableContainer, TableRow, TableHead, Paper } from '@mui/material';

function createData({ id, name }) {
    return { id, name };
}

export default function NewServiceTable({ content }) {
    const { t } = useTranslation();

    const rows = content.map((item) => createData(item));

    return (
        <TableContainer
            component={Paper}
            sx={{
                border: `.1rem solid  ${theme.main.palette.background.lightDark} `,
                borderRadius: '.5rem',
                boxShadow: 'none',
                my: '2rem',
                width: '60%',
                margin: '0 auto',
            }}>
            <Table sx={styleTable} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell align="center">{t('newService.row')}</TableCell>
                        <TableCell align="center">{t('newService.title')}</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row, i) => (
                        <TableRow key={i} sx={tableStyle}>
                            <TableCell align="center" component="th" scope="row">
                                {row.id}
                            </TableCell>
                            <TableCell align="center">{row.name}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

const styleTable = {
    // width: '300px',
    direction: 'rtl',
    '& .MuiTableCell-root': {
        border: `.1rem solid  ${theme.main.palette.background.lightDark} `,
        py: '1rem',
        fontSize: '1.4rem',
        fontWeight: 400,
        height: '2rem !important',
    },
    '& .MuiTableHead-root': {
        bgcolor: 'primary.light',
        height: '4.5rem',
    },
};
const tableStyle = {
    '& .MuiTableCell-root': {
        height: '2rem !important',
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
