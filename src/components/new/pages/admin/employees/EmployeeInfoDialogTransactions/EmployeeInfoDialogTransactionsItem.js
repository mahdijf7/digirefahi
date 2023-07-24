import { TableRow } from '@mui/material';

// Components
import DTableCell from 'components/new/shared/DTable/DTableCell';

let moment = require('moment-jalaali');

const EmployeeInfoDialogTransactionsItem = ({ trnsaction, style }) => {
    const { type, price, transaction_id, category, remain, status, created_at } = trnsaction;

    const categoryDisplay = typeof category === 'string' ? category : category.name || '---';
    return (
        <TableRow style={style}>
            <DTableCell>{type === 'DEPOSIT' ? 'افزایش اعتبار' : 'کاهش اعتبار'}</DTableCell>
            <DTableCell>{price || '---'}</DTableCell>
            <DTableCell>{categoryDisplay}</DTableCell>
            <DTableCell>{remain || '---'}</DTableCell>
            <DTableCell>{transaction_id || '---'}</DTableCell>
            <DTableCell>{status === 'ACCEPT' ? 'موفق' : 'ناموفق' || '---'}</DTableCell>
            <DTableCell>{moment(created_at).format(' jYYYY/jM/jD')}</DTableCell>
            <DTableCell>{moment(created_at).format('HH:mm')}</DTableCell>
        </TableRow>
    );
};

export default EmployeeInfoDialogTransactionsItem;
