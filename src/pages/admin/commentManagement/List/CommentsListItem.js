import { TableCell, TableRow, Box, Stack, Button } from '@mui/material';

// Assets
import theme from 'assets/theme';
import RejectDialog from './RejectDialogue';
import AcceptDialog from './AcceptDialogue';

const CommentsListItem = ({ comment, key, style, onRefresh, updateButton }) => {
    return (
        <TableRow key={key} style={style}>
            <TableCell style={tableCellStyle}>{comment?.name || '---'}</TableCell>
            <TableCell style={tableCellStyle}>{comment?.service_name || '---'}</TableCell>
            <TableCell style={tableCellStyle}>{comment?.comment || '---'}</TableCell>
            <TableCell style={tableCellStyle}>{comment?.score || '---'}</TableCell>
            <TableCell style={tableCellStyle}>
                {comment.status === 'PENDING'
                    ? 'بررسی نشده'
                    : comment.status === 'ACCEPT'
                    ? 'تایید شده'
                    : comment.status === 'REJECT'
                    ? 'رد شده'
                    : '---'}
            </TableCell>
            <TableCell style={tableCellStyle}>{new Date(comment?.created_at).toLocaleDateString('fa-IR')}</TableCell>
            <TableCell style={tableCellStyle}>
                <Stack direction="row" spacing={2} justifyContent="space-evenly">
                    <Box display="flex" gap="1.5rem">
                        <AcceptDialog
                            onChange={onRefresh}
                            refreshButton={updateButton}
                            commentId={comment.id}
                            disable={comment.status === 'ACCEPT'}
                        />
                    </Box>
                    <Box display="flex" gap="1.5rem">
                        <RejectDialog
                            onChange={onRefresh}
                            refreshButton={updateButton}
                            commentId={comment.id}
                            disable={comment.status === 'REJECT'}
                        />
                    </Box>
                </Stack>
            </TableCell>
        </TableRow>
    );
};

const tableCellStyle = {
    borderColor: theme.main.palette.background.lightDark,
    textAlign: 'center',
    fontWeight: 300,
    fontSize: '1.2rem',
    padding: '6px 14px',
    fontFamily: `"IRANSans", "sans-serif", "serif"`,
};

export default CommentsListItem;
