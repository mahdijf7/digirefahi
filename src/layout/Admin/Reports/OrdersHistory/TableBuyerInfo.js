import React from 'react';
import { TableCell, TableHead, TableRow, TableBody, Box } from '@mui/material';
// Components
import DTableWrapper from 'components/new/shared/DTable/DTableWrapper';

// Assets
import theme from 'assets/theme';

function TableBuyerInfo({ transactions, onSelectModal, open, handleOpen, handleClose }) {
    const tableColumns = [{ title: 'خریدار' }, { title: 'کدملی' }, { title: 'نام سازمان' }];
    const { employee } = transactions;

    return (
        <div>
            <Box sx={wrapperStyles}>
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
                        <TableRow>
                            <TableCell style={tableCellStyle}>{employee?.full_name || '---'}</TableCell>
                            <TableCell style={tableCellStyle}>{employee?.national_code || '---'}</TableCell>
                            <TableCell style={tableCellStyle}>{transactions?.company_name || '---'}</TableCell>
                        </TableRow>
                    </TableBody>
                </DTableWrapper>
            </Box>
        </div>
    );
}

const wrapperStyles = {
    display: 'flex',
    flexDirection: 'column',
    marginTop: '30px',
    padding: '0 30px',
};
const tableHeadStyle = {
    backgroundColor: theme.main.palette.primary.light,
    textAlign: 'center',
    fontWeight: 400,
    fontSize: '1.5rem',
    fontFamily: `"IRANSans", "sans-serif", "serif"`,
};
const tableCellStyle = {
    borderColor: theme.main.palette.background.lightDark,
    textAlign: 'center',
    fontWeight: 300,
    fontSize: '1.2rem',
    padding: '6px 14px',
    fontFamily: `"IRANSans", "sans-serif", "serif"`,
};
export default TableBuyerInfo;
