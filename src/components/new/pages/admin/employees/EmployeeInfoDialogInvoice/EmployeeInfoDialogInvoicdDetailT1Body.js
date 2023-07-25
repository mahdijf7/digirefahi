import { useState } from 'react';
import { TableCell, TableRow, Box } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';

// Assets
import theme from 'assets/theme';

let moment = require('moment-jalaali');

const EmployeeInfoDialogInvoicdDetailT1Body = ({ style, trnsaction }) => {
    const { service, created_at, price, count } = trnsaction;

 

    return (
        <TableRow style={style}>
            <TableCell style={tableCellStyle}>{service?.name || '---'}</TableCell>
            <TableCell style={tableCellStyle}>{(price / count).toLocaleString()}</TableCell>
            <TableCell style={tableCellStyle}>{service?.supplier || '---'}</TableCell>
            <TableCell style={tableCellStyle}>{service?.province[0] || '---'}</TableCell>
            <TableCell style={tableCellStyle}>{moment(created_at).format(' jYYYY/jM/jD')}</TableCell>
        </TableRow>
    );
};

const tableCellStyle = {
    borderColor: theme.main.palette.background.lightDark,
    textAlign: 'center',
    fontWeight: 300,
    fontSize: '1.2rem',
    padding: '6px 14px',
    fontFamily: `"IRANSans", "sans-serif", "serif"`,
};

export default EmployeeInfoDialogInvoicdDetailT1Body;
