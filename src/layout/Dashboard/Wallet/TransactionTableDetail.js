import { TableCell, TableRow } from '@mui/material';

// Assets
import theme from 'assets/theme';

let moment = require('moment-jalaali');
const colorRed = '#E52929';
const colorGreen = '#08BD71';

const TransactionTableDetail = ({ trnsaction, style }) => {
    const { description, type, price, transaction_id, category, remain, status, created_at } = trnsaction;

    const categoryDisplay = typeof category === 'string' ? category : category.name || '---';

    const isStatusOk = status === 'ACCEPT';

    // const statusTitle = status === 'ACCEPT';
    return (
        <TableRow style={style}>
            <TableCell style={tableCellStyle}>{description || '---'}</TableCell>
            <TableCell sx={{ ...tableCellStyle, color: isStatusOk ? colorGreen : colorRed }}>
                {price.toLocaleString() || '---'}
            </TableCell>
            <TableCell style={tableCellStyle}>{categoryDisplay}</TableCell>
            <TableCell style={tableCellStyle}>{remain.toLocaleString() || '---'}</TableCell>
            <TableCell style={tableCellStyle}>{transaction_id || '---'}</TableCell>
            <TableCell sx={{ ...tableCellStyle, color: isStatusOk ? 'black' : colorRed }}>
                {isStatusOk ? 'موفق' : 'ناموفق' || '---'}
            </TableCell>
            <TableCell style={tableCellStyle}>{moment(created_at).format(' jYYYY/jM/jD')}</TableCell>
            <TableCell style={tableCellStyle}>{moment(created_at).format('HH:mm')}</TableCell>
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

export default TransactionTableDetail;
