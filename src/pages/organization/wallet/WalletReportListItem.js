import { TableCell, TableRow } from '@mui/material';
import theme from 'assets/theme';

const WalletReportListItem = ({ report, style }) => {
    const { type, price, category, employee,transaction_id,status,created_at } = report;
    return (
        <TableRow style={style}>
            <TableCell style={tableCellStyle}>{type === 'DEPOSIT' ? 'افزایش اعتبار' : 'کاهش اعتبار'}</TableCell>
            <TableCell style={tableCellStyle}>{price}</TableCell>
            <TableCell style={tableCellStyle}>{category}</TableCell>
            <TableCell style={tableCellStyle}>{employee || '---'}</TableCell>
            <TableCell style={tableCellStyle}>{transaction_id}</TableCell>
            <TableCell style={tableCellStyle}>{status === 'ACCEPT' ? 'موفق' : 'ناموفق' || '---'}</TableCell>
            <TableCell style={tableCellStyle}>{new Date(created_at).toLocaleDateString('fa-IR')}</TableCell>
            <TableCell style={tableCellStyle}>{new Date(created_at).toLocaleTimeString('fa-IR')}</TableCell>
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

export default WalletReportListItem;
