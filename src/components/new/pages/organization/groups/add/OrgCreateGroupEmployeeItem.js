import { TableCell, TableRow, Checkbox } from '@mui/material';

// Assets
import theme from 'assets/theme';

const OrgCreateGroupEmployeeItem = ({ employee, selected = false, onCheckBoxToggled, ...props }) => {
    const { id, full_name, national_code, mobile, company_level } = employee;

    return (
        <TableRow style={props.style}>
            <TableCell style={tableCellStyle}>
                <Checkbox
                    checked={selected}
                    onChange={onCheckBoxToggled}
                    name={id}
                    sx={{ padding: '5px', '& .MuiSvgIcon-root': { fontSize: 20 } }}
                />
            </TableCell>
            <TableCell style={tableCellStyle}>{full_name || '---'}</TableCell>
            <TableCell style={tableCellStyle}>{national_code || '---'}</TableCell>
            <TableCell style={tableCellStyle}>{mobile || '---'}</TableCell>
            <TableCell style={tableCellStyle}>{company_level?.name || '---'}</TableCell>
        </TableRow>
    );
};

const tableCellStyle = {
    borderColor: theme.main.palette.background.lightDark,
    textAlign: 'center',
    fontWeight: 300,
    fontSize: '1.2rem',
    padding: '5px 6px',
    fontFamily: `"IRANSans", "sans-serif", "serif"`,
};

export default OrgCreateGroupEmployeeItem;
