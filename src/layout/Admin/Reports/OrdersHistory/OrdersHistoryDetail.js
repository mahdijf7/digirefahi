import { TableCell, TableRow, Button } from '@mui/material';

// Assets
import theme from 'assets/theme';

function OrderHistoryDetail({ onSelectDetail, style, trnsaction, open, handleOpen, handleClose }) {
    const { id, company_name, employee, service, created_at, price } = trnsaction;
    const { name } = service;

    return (
        <TableRow style={style}>
            <TableCell style={tableCellStyle}>{name}</TableCell>
            <TableCell style={tableCellStyle}>{employee?.full_name || '---'}</TableCell>
            <TableCell style={tableCellStyle}>{employee?.national_code || '---'}</TableCell>
            <TableCell style={tableCellStyle}>{company_name || '---'}</TableCell>
            <TableCell style={tableCellStyle}>{price.toLocaleString() || '---'}</TableCell>
            <TableCell style={tableCellStyle}>{new Date(created_at).toLocaleDateString('fa-IR')}</TableCell>
            <TableCell style={tableCellStyle}>
                <Button
                    variant="contained"
                    color="brandWarning"
                    sx={{ fontSize: '14px', height: '3.2rem', fontWeight: 'bold' }}
                    onClick={() => onSelectDetail(id)}>
                    مشاهده فاکتور
                </Button>
            </TableCell>
        </TableRow>
    );
}

const tableCellStyle = {
    borderColor: theme.main.palette.background.lightDark,
    textAlign: 'center',
    fontWeight: 300,
    fontSize: '1.2rem',
    padding: '6px 14px',
    fontFamily: `"IRANSans", "sans-serif", "serif"`,
};

export default OrderHistoryDetail;
