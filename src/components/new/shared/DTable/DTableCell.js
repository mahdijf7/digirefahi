import { TableCell } from '@mui/material';

// Assets
import theme from 'assets/theme';

const DTableCell = ({ border = {}, children, ...props }) => {
    let customizedBorder = border || {
        borderBottom: '1px solid rgb(217, 217, 217)',
    };
    const tableCellStyle = {
        borderColor: theme.main.palette.background.lightDark,
        textAlign: 'center',
        fontWeight: 300,
        fontSize: '1.2rem',
        padding: '6px 14px',
        fontFamily: `"IRANSans", "sans-serif", "serif"`,
        ...customizedBorder,
    };
    return (
        <TableCell style={tableCellStyle} {...props}>
            {children}
        </TableCell>
    );
};

export default DTableCell;
