import { TableCell, TableRow, IconButton } from '@mui/material';

// Assets
import VerticalDots from 'assets/icone/svg/VerticalDots';
import theme from 'assets/theme';

const EmployeesListItem = ({ employee, style, onShowEmployeeInfo }) => {
    const { full_name, national_code, mobile, company_level } = employee;

    return (
        <TableRow style={style}>
            <TableCell style={tableCellStyle}>{full_name}</TableCell>
            <TableCell style={tableCellStyle}>{national_code || '---'}</TableCell>
            <TableCell style={tableCellStyle}>{mobile || '---'}</TableCell>
            <TableCell style={tableCellStyle}>{false || '---'}</TableCell>
            <TableCell style={tableCellStyle}>{company_level?.name || company_level}</TableCell>
            <TableCell style={tableCellStyle}>
                <IconButton onClick={() => onShowEmployeeInfo(employee)}>
                    <VerticalDots />
                </IconButton>
            </TableCell>
        </TableRow>
    );
};

const tableCellStyle = {
    borderColor: theme.main.palette.background.lightDark,
    textAlign: 'center',
    fontWeight: 300,
    fontSize: '1.2rem',
    padding: '1px 1px',
    fontFamily: `"IRANSans", "sans-serif", "serif"`,
};

export default EmployeesListItem;
