import { TableRow } from '@mui/material';
import theme from 'assets/theme';
import LoadingButton from '@mui/lab/LoadingButton';

// Components
import DTableCell from 'components/new/shared/DTable/DTableCell';
import DMoreButton from 'components/new/shared/DMoreButton';

const TicketListItem = (props) => {
    const { id, title, owner, company_name, owner_type, created_at, status, update_at } = props.ticket;
    return (
        <TableRow style={props.style}>
            <DTableCell>{id}</DTableCell>
            <DTableCell>{title}</DTableCell>
            <DTableCell>{owner}</DTableCell>
            <DTableCell>{company_name || '----'}</DTableCell>
            <DTableCell>{owner_type}</DTableCell>
            <DTableCell>{status === 'OPEN' ? <span style={acceptStyle}>باز</span> : <span>بسته شده</span> || '---'}</DTableCell>
            <DTableCell>
                {update_at
                    ? `${new Date(update_at).toLocaleTimeString('fa-IR')} - ${new Date(update_at).toLocaleDateString('fa-IR')}`
                    : `${new Date(created_at).toLocaleTimeString('fa-IR')} - ${new Date(created_at).toLocaleDateString(
                          'fa-IR'
                      )}`}{' '}
            </DTableCell>
            <DTableCell>
                <LoadingButton
                    variant="contained"
                    sx={blueBtnStyle}
                    color="error"
                    disabled={status !== 'OPEN'}
                    // loading={loading}
                    onClick={() => props.closeTicket(id)}>
                    بستن
                </LoadingButton>
            </DTableCell>
            <DTableCell>
                <DMoreButton tag="a" to={`${props.baseUrl}${id}`} />
            </DTableCell>
        </TableRow>
    );
};

const acceptStyle = {
    color: 'rgba(8, 189, 113, 1)',
};
const blueBtnStyle = {
    padding: '4px 35px',
    backgroundColor: 'rgba(8, 119, 189, 1)',
    border: '1px solid rgba(8, 119, 189, 1)',
    borderRadius: '5px',
    fontSize: 12,
    color: '#fff',
    textDecoration: 'none',
    fontFamily: `"IRANSans", "sans-serif", "serif"`,
    margin: '0 5px',
    boxShadow: 'none',
    '&:hover': {
        boxShadow: 'none !important',
        backgroundColor: 'rgba(8, 119, 189, 1)',
        color: '#fff',
        textDecoration: 'none',
    },
    '&:visited,&:active,& a': {
        boxShadow: 'none !important',
        backgroundColor: 'rgba(8, 119, 189, 1)',
        color: '#fff',
        textDecoration: 'none',
    },
};

export default TicketListItem;
