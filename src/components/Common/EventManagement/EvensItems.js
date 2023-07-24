import { IconButton, Stack, TableRow } from '@mui/material';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

// Components
import DMoreButton from 'components/new/shared/DMoreButton';
import DTableCell from 'components/new/shared/DTable/DTableCell';

const EventsItem = ({
    comment,
    key,
    style,
    handleDelete,
    setSnackBarData,
    eventId,
    setEventId,
    getEvents,
    eventAdd,
    setEventAdd,
}) => {
    const handleEditEvent = (id) => {
        setEventId(id);
        setEventAdd({ isOpen: true, update: true });
    };

    return (
        <TableRow key={key} style={style}>
            <DTableCell>{comment?.name || '---'}</DTableCell>
            <DTableCell>{new Date(comment?.date).toLocaleDateString('fa-IR')}</DTableCell>
            <DTableCell>
                <Stack direction="row" justifyContent="center" alignItems="center" gap="1.5rem">
                    <DMoreButton onClick={() => handleEditEvent(comment?.id)} />

                    <IconButton onClick={() => handleDelete(comment?.id)}>
                        <DeleteOutlineIcon fontSize="large" sx={{ color: '#F77A06', cursor: 'pointer' }} />
                    </IconButton>
                </Stack>
            </DTableCell>
        </TableRow>
    );
};

export default EventsItem;
