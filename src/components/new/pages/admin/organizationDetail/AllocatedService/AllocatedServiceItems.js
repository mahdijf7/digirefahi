import { TableRow, Box } from '@mui/material';

// Components
import DTableCell from 'components/new/shared/DTable/DTableCell';

// Assets
import theme from 'assets/theme';

const AllocatedServiceItems = ({ index, style, service, open, handleOpen, handleClose }) => {
    const { category, name, price, supplier, thumbnail, ticket_type, type, value } = service;

    return (
        <TableRow style={style}>
            <DTableCell>{index + 1}</DTableCell>
            <DTableCell>
                <Box sx={{ textAlign: 'right', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <img style={imageStyle} src={`${process.env.REACT_APP_STORAGE_URL}/${thumbnail}`} alt="" />
                    {name || '---'}
                </Box>
            </DTableCell>
            <DTableCell>{category || '---'}</DTableCell>
            <DTableCell>{type === 'BASIC' ? 'عمومی' : 'سازمانی' || '---'}</DTableCell>
            <DTableCell>{ticket_type || '---'}</DTableCell>
            <DTableCell>{supplier || '---'}</DTableCell>
            <DTableCell>{price || '---'}</DTableCell>
        </TableRow>
    );
};

const imageStyle = { width: '4.8rem', height: '3.2rem', borderRadius: '.5rem' };

export default AllocatedServiceItems;
