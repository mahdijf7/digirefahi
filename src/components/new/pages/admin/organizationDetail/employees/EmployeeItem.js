import { TableRow } from '@mui/material';

// Assets
import DTableCell from 'components/new/shared/DTable/DTableCell';

const EmployeeItem = ({ employee, ...props }) => {
    const { full_name, national_code, phone, company_level } = employee;

    return (
        <TableRow style={props.style}>
            <DTableCell>{full_name || '---'}</DTableCell>
            <DTableCell>{national_code || '---'}</DTableCell>
            <DTableCell>{phone || '---'}</DTableCell>
            <DTableCell>{company_level?.name ? company_level.name : company_level}</DTableCell>
        </TableRow>
    );
};

export default EmployeeItem;
