import { Box, TableRow } from '@mui/material';
import theme from 'assets/theme';
import { ColorWhite } from '../../../assets/theme/color';

// Components
import DTableCell from 'components/new/shared/DTable/DTableCell';

const OrganizationRequestListItem = (props) => {
    const { id, service, created_at, company, status, count } = props.report;

    return (
        <TableRow style={props.style}>
            <DTableCell>{company.name}</DTableCell>
            <DTableCell>{service.name}</DTableCell>
            <DTableCell>{service.supplier}</DTableCell>
            <DTableCell>{(+service.price).toLocaleString()}</DTableCell>
            <DTableCell>{count.toLocaleString()}</DTableCell>
            <DTableCell>{(service.price * +count).toLocaleString()}</DTableCell>
            <DTableCell>
                {`${new Date(created_at).toLocaleTimeString('fa-IR')} - ${new Date(created_at).toLocaleDateString('fa-IR')}`}{' '}
            </DTableCell>
            <DTableCell>
                {status === 'INIT' ? (
                    <span>بررسی نشده</span>
                ) : status === 'ACCEPT' ? (
                    <span style={acceptStyle}>تایید شده</span>
                ) : (
                    <span style={rejectStyle}>رد شده</span> || '---'
                )}
            </DTableCell>
            <DTableCell>
                <Box
                    sx={yellowButtonStyle}
                    onClick={
                        // console.log('click')
                        () => props.onShow(props.report)
                    }>
                    <span> تغییر وضعیت</span>
                </Box>
            </DTableCell>
        </TableRow>
    );
};

const acceptStyle = {
    color: 'rgba(8, 189, 113, 1)',
};

const rejectStyle = {
    color: 'rgba(229, 41, 41, 1)',
};

const yellowButtonStyle = {
    height: '3rem',
    borderRadius: '5px',
    backgroundColor: 'rgba(247, 201, 6, 1)',
    color: '#000',
    fontWeight: 500,
    fontSize: '1.2rem',
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'center',
    boxShadow: 'none !important',
    cursor: 'pointer',
    '&:hover': {
        boxShadow: 'none !important',
        backgroundColor: 'rgba(247, 201, 6, 1)',
        color: '#000',
    },
    '&:disabled': {
        bgcolor: '#B4B4B4',
        color: ColorWhite,
    },
};

export default OrganizationRequestListItem;
