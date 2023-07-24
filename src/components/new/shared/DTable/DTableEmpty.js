import { TableCell, TableRow, Typography } from '@mui/material';

const DTableEmpty = ({ message }) => {
    return (
        <TableRow
            style={{
                backgroundColor: '#ffffff',
            }}>
            <TableCell colSpan="9999">
                <Typography textAlign="center"> {message || 'موردی برای نمایش وجود ندارد.'} </Typography>
            </TableCell>
        </TableRow>
    );
};

export default DTableEmpty;
