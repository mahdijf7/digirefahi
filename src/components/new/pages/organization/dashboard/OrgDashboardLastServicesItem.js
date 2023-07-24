import { TableRow } from '@mui/material';

// Components
import DTableCell from 'components/new/shared/DTable/DTableCell';

const OrgDashboardLastServicesItem = (props) => {
    const { service, employee, price, created_at } = props.order;

    return (
        <TableRow style={props.style}>
            <DTableCell>{service?.name || '---'}</DTableCell>
            <DTableCell>{employee?.full_name || '---'}</DTableCell>
            <DTableCell>{price.toLocaleString() || '---'}</DTableCell>
            <DTableCell>{new Date(created_at).toLocaleDateString('fa-IR')}</DTableCell>
        </TableRow>
    );
};

export default OrgDashboardLastServicesItem;
