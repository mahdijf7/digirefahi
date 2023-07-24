import { TableRow, Button } from '@mui/material';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

// Components
import DTableCell from 'components/new/shared/DTable/DTableCell';

const OrgEditGroupSelectedEmployeesItem = ({ employee, onDelete, ...props }) => {
    const { id, full_name, national_code, mobile, company_level } = employee;

    let companyLevelName = '';
    if (company_level) companyLevelName = company_level?.name || company_level;
    else companyLevelName = '---';

    return (
        <TableRow style={props.style}>
            <DTableCell>{full_name || '---'}</DTableCell>
            <DTableCell>{national_code || '---'}</DTableCell>
            <DTableCell>{mobile || '---'}</DTableCell>
            <DTableCell>{companyLevelName}</DTableCell>
            <DTableCell>
                <Button sx={{ minWidth: 'auto' }} color="brandOrange" onClick={onDelete}>
                    <DeleteOutlineIcon fontSize="large" />
                </Button>
            </DTableCell>
        </TableRow>
    );
};

export default OrgEditGroupSelectedEmployeesItem;
