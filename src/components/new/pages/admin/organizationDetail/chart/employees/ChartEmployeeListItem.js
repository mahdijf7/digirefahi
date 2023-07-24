import { TableCell, TableRow } from '@mui/material';

// Assets
import theme from 'assets/theme';

const CompanyListItem = (props) => {
    const { full_name, national_code, mobile, company_level } = props.employee;

    return (
        <TableRow style={props.style}>
            <TableCell style={tableCellStyle}>{full_name || '---'}</TableCell>
            <TableCell style={tableCellStyle}>{national_code || '---'}</TableCell>
            <TableCell style={tableCellStyle}>{mobile || '---'}</TableCell>
            <TableCell style={tableCellStyle}>{company_level?.name}</TableCell>
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

export default CompanyListItem;
