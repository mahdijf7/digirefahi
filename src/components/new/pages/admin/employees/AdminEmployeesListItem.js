import { TableRow } from '@mui/material';

// Components 
import DMoreButton from 'components/new/shared/DMoreButton';
import DTableCell from 'components/new/shared/DTable/DTableCell';

const AdminEmployeesListItem = (props) => {
    const { full_name, national_code, mobile, company_name, company_level } = props.employee;

    return (
        <TableRow style={props.style}>
            <DTableCell>{full_name}</DTableCell>
            <DTableCell>{national_code || '---'}</DTableCell>
            <DTableCell>{mobile || '---'}</DTableCell>
            <DTableCell>{company_name}</DTableCell>
            <DTableCell>{company_level?.name || '---'}</DTableCell>
            <DTableCell>
                <DMoreButton onClick={() => props.onShowEmployeeInfo(props.employee)} />
            </DTableCell>
        </TableRow>
    );
};

export default AdminEmployeesListItem;
