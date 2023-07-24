import { TableRow, Box } from '@mui/material';

// Components
import DMoreButton from 'components/new/shared/DMoreButton';
import DTableCell from 'components/new/shared/DTable/DTableCell';

let moment = require('moment-jalaali');

const CompanyListItem = (props) => {
    const { name, logo, agent_phone, ceo_name, employees_count, created_at, id } = props.company;

    return (
        <TableRow style={props.style}>
            <DTableCell>
                {logo && (
                    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                        <img src={`${process.env.REACT_APP_STORAGE_URL}/${logo}`} style={{ maxHeight: '30px' }} />
                    </Box>
                )}
            </DTableCell>
            <DTableCell>{name || '---'}</DTableCell>
            <DTableCell>{agent_phone || '---'}</DTableCell>
            <DTableCell>{ceo_name || '---'}</DTableCell>
            <DTableCell>{employees_count}</DTableCell>
            <DTableCell>{moment(created_at).format(' jYYYY/jM/jD')}</DTableCell>
            <DTableCell>
                <DMoreButton tag="a" to={`/app/admin/companies/${id}`} />
            </DTableCell>
        </TableRow>
    );
};

export default CompanyListItem;
