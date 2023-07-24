import { TableRow, Checkbox } from '@mui/material';

// Components
import DTableCell from 'components/new/shared/DTable/DTableCell';

// Assets
import theme from 'assets/theme';

const AdminOrgEditGroupEmployeeItem = ({ employee, selected = false, onCheckBoxToggled, ...props }) => {
    const { id, full_name, national_code, mobile, company_level } = employee;

    return (
        <TableRow style={props.style}>
            <DTableCell>
                <Checkbox
                    checked={selected}
                    onChange={() => onCheckBoxToggled(employee)}
                    sx={{ padding: '5px', '& .MuiSvgIcon-root': { fontSize: 20 } }}
                />
            </DTableCell>
            <DTableCell>{full_name || '---'}</DTableCell>
            <DTableCell>{national_code || '---'}</DTableCell>
            <DTableCell>{mobile || '---'}</DTableCell>
            <DTableCell>{'---'}</DTableCell>
            <DTableCell>{company_level?.name || '---'}</DTableCell>
        </TableRow>
    );
};

export default AdminOrgEditGroupEmployeeItem;
