import { TableCell, TableRow, Box } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';

// Assets
import theme from 'assets/theme';

let moment = require('moment-jalaali');

const InvoiceTableDetail = ({ onSelectDetail, style, trnsaction }) => {
    const { id, number, service, created_at, price } = trnsaction;
    const { name } = service;

    return (
        <TableRow style={style}>
            <TableCell style={tableCellStyle}>{number}</TableCell>
            <TableCell style={tableCellStyle}>{name || '---'}</TableCell>
            <TableCell style={tableCellStyle}>{price.toLocaleString() || '---'}</TableCell>
            <TableCell style={tableCellStyle}>{moment(created_at).format(' jYYYY/jM/jD')}</TableCell>
            <TableCell style={tableCellStyle}>{moment(created_at).format('HH:mm')}</TableCell>
            <TableCell style={tableCellStyle}>
                <Box onClick={() => onSelectDetail(id)} sx={moreBtnStyles}>
                    <MoreVertIcon fontSize="large" />
                </Box>
            </TableCell>
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

export default InvoiceTableDetail;
