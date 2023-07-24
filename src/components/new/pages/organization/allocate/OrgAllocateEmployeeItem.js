import { TableRow, Checkbox } from '@mui/material';

// Assets
import VerticalDots from 'assets/icone/svg/VerticalDots';
import theme from 'assets/theme';
import DTableCell from 'components/new/shared/DTable/DTableCell';

const OrgAllocateEmployeeItem = ({ employee, style, selected, onCheckBoxToggled }) => {
    const { full_name, national_code, mobile, company_level, group, gender } = employee;
    let groupLabel = '';
    if (group.length > 1) {
        groupLabel = `${group[0].name} و ${group.length - 1} گروه دیگر`;
    } else if (group.length === 1) {
        groupLabel = `${group[0].name}`;
    }

    return (
        <TableRow style={style}>
            <DTableCell>
                <Checkbox
                    checked={selected}
                    onChange={() => onCheckBoxToggled(employee)}
                    sx={{ padding: '5px', '& .MuiSvgIcon-root': { fontSize: 20 } }}
                />
            </DTableCell>
            <DTableCell>{full_name}</DTableCell>
            <DTableCell>{national_code || '---'}</DTableCell>
            <DTableCell>{mobile || '---'}</DTableCell>
            <DTableCell>{gender ? genders[gender] : '---'}</DTableCell>
            <DTableCell>{groupLabel || '---'}</DTableCell>
            <DTableCell>{company_level ? company_level?.name || company_level : '---'}</DTableCell>
        </TableRow>
    );
};
const genders = { MALE: 'آقا', FEMALE: 'خانم' };
export default OrgAllocateEmployeeItem;
