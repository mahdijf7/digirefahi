import { TableRow, Checkbox, Typography } from '@mui/material';

// Components
import DTableCell from 'components/new/shared/DTable/DTableCell';

const OrgEditGroupEmployeeItem = ({ employee, selected = false, onCheckBoxToggled, ...props }) => {
    const { id, full_name, national_code, mobile, company_level, group } = employee;
    let groupLabel = ''
    if(group.length > 1){
        groupLabel = `${group[0].name} و ${group.length-1} گروه دیگر`
    }else if(group.length===1) {
        groupLabel = `${group[0].name}`
    }

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
            <DTableCell>
                {groupLabel || '---'}
            </DTableCell>
            <DTableCell>{company_level?.name || '---'}</DTableCell>
        </TableRow>
    );
};

export default OrgEditGroupEmployeeItem;
