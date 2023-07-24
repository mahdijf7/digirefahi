import { TableCell, TableRow, Box } from '@mui/material';

// Assets
import theme from 'assets/theme';

const CategoryServicesItem = (props) => {
    const { supplier, name, price } = props.service;

    return (
        <TableRow style={props.style}>
            <TableCell style={tableCellStyle}>{name}</TableCell>
            <TableCell style={tableCellStyle}>{supplier || '---'}</TableCell>
            <TableCell style={tableCellStyle}>{price ? parseFloat(price).toLocaleString() : '---'}</TableCell>
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

export default CategoryServicesItem;
