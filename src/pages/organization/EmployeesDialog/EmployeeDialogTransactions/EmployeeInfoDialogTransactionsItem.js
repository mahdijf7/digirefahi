import { TableCell, TableRow, Box } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';

// Assets
import theme from 'assets/theme';

let moment = require('moment-jalaali');

const EmployeeInfoDialogTransactionsItem = ({ trnsaction, style }) => {
    const { type, price, transaction_id, category, remain, status, created_at } = trnsaction;

    const categoryDisplay = typeof category === 'string' ? category : category.name || '---';
    return (
        <TableRow style={style}>
            <TableCell style={tableCellStyle}>{type === 'DEPOSIT' ? 'افزایش اعتبار' : 'کاهش اعتبار'}</TableCell>
            <TableCell style={tableCellStyle}>{price || '---'}</TableCell>
            <TableCell style={tableCellStyle}>{categoryDisplay}</TableCell>
            <TableCell style={tableCellStyle}>{remain || '---'}</TableCell>
            <TableCell style={tableCellStyle}>{transaction_id || '---'}</TableCell>
            <TableCell style={tableCellStyle}>{status === 'ACCEPT' ? 'موفق' : 'ناموفق' || '---'}</TableCell>
            <TableCell style={tableCellStyle}>{moment(created_at).format(' jYYYY/jM/jD')}</TableCell>
            <TableCell style={tableCellStyle}>{moment(created_at).format('HH:mm')}</TableCell>
        </TableRow>
    );
};

const moreBtnStyles = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '24px',
    border: `1px solid ${theme.main.palette.primary.main}`,
    color: theme.main.palette.primary.main,
    borderRadius: '5px',
    margin: '0 auto',
    cursor: 'pointer',
};
const tableCellStyle = {
    borderColor: theme.main.palette.background.lightDark,
    textAlign: 'center',
    fontWeight: 300,
    fontSize: '1.2rem',
    padding: '6px 14px',
    fontFamily: `"IRANSans", "sans-serif", "serif"`,
};

export default EmployeeInfoDialogTransactionsItem;
