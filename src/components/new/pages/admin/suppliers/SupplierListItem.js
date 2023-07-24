import { TableRow } from '@mui/material';

// Components
import DMoreButton from 'components/new/shared/DMoreButton';
import DTableCell from 'components/new/shared/DTable/DTableCell';

const SupplierListItem = (props) => {
    const { name, type, agent_phone, ceo_name, created_at, id } = props.supplier;

    return (
        <TableRow style={props.style}>
            <DTableCell>{name || '---'}</DTableCell>
            <DTableCell>{type || '---'}</DTableCell>
            <DTableCell>{agent_phone || '---'}</DTableCell>
            <DTableCell>{ceo_name || '---'}</DTableCell>
            <DTableCell>{new Date(created_at).toLocaleDateString('fa-IR')}</DTableCell>
            <DTableCell>
                <DMoreButton onClick={props.onShowSupplierInfo} />
            </DTableCell>
        </TableRow>
    );
};

export default SupplierListItem;
