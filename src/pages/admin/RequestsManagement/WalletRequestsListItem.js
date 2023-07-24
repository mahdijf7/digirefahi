import { Box, TableCell, TableRow } from '@mui/material';

// Components
import DTableCell from 'components/new/shared/DTable/DTableCell';

import { ColorWhite } from '../../../assets/theme/color';

const WalletReportListItem = (props) => {
    const { company, price, created_at, status, id } = props.request;
    return (
        <TableRow style={props.style}>
            <DTableCell>{company && company.name}</DTableCell>
            <DTableCell>{id}</DTableCell>
            <DTableCell>{price}</DTableCell>
            <DTableCell>
                {created_at
                    ? `${new Date(created_at).toLocaleTimeString('fa-IR')} - ${new Date(created_at).toLocaleDateString('fa-IR')}`
                    : '----'}{' '}
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
                {status === 'INIT' ? (
                    <Box sx={yellowButtonStyle} onClick={() => props.onShowRequestInfo(props.request)}>
                        <span>تغییر وضعیت</span>
                    </Box>
                ) : (
                    <Box sx={downloadBtnStyle} onClick={() => props.onShowRequestInfo(props.request)}>
                        <span>مشاهده وضعیت</span>
                    </Box>
                )}
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
    width: '70% !important ',
    margin: '0 auto',
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

const downloadBtnStyle = {
    width: '70% !important ',
    margin: '0 auto',
    height: '3rem',
    borderRadius: '5px',
    backgroundColor: '#fff',
    cursor: 'pointer',
    border: '1px solid rgba(8, 119, 189, 1)',
    fontSize: 12,
    color: '#0877BD',
    textDecoration: 'none',
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'center',
    fontFamily: `"IRANSans", "sans-serif", "serif"`,
    boxShadow: 'none',
    '&:hover': {
        boxShadow: 'none !important',
        backgroundColor: '#fff',
        color: '#0877BD',
        textDecoration: 'none',
    },
    '&:visited,&:active,& a': {
        boxShadow: 'none !important',
        backgroundColor: '#fff',
        color: '#0877BD',
        textDecoration: 'none',
    },
};
export default WalletReportListItem;
