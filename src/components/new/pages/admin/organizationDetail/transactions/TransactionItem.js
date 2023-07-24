import { TableRow, Typography } from '@mui/material';

// Components
import DTableCell from 'components/new/shared/DTable/DTableCell';

let moment = require('moment-jalaali');

const AdminCompanyEmployeesItem = ({ transaction, ...props }) => {
    const { type, price, category, transaction_id, status, created_at, employee } = transaction;

    const convertStatus = status === 'ACCEPT' ? 'موفق' : 'ناموفق';
    const acceptStatus = status === 'ACCEPT';
    const categoryDisplay = typeof category === 'string' ? category : category.name || '---';

    return (
        <TableRow style={props.style}>
            <DTableCell>{type === 'DEPOSIT' ? 'افزایش اعتبار' : 'کاهش اعتبار' || '---'}</DTableCell>
            <DTableCell>{price || '---'}</DTableCell>
            <DTableCell>{categoryDisplay || '---'}</DTableCell>
            <DTableCell>{employee || '---'}</DTableCell>
            <DTableCell>{transaction_id || '---'}</DTableCell>
            <DTableCell>
                <Typography sx={{ color: acceptStatus ? 'black' : 'red' }}>{convertStatus || '---'}</Typography>
            </DTableCell>
            <DTableCell>{moment(created_at).format(' jYYYY/jM/jD') || '---'}</DTableCell>
            <DTableCell>{moment(created_at).format('HH:mm') || '---'}</DTableCell>
        </TableRow>
    );
};

export default AdminCompanyEmployeesItem;
