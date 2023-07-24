import {Box, TableCell, TableRow} from '@mui/material';
import theme from 'assets/theme';
import {ColorWhite} from "../../../assets/theme/color";

const OrganizationRequestListItem = (props) => {
    const {id, service, created_at, company, status, count} = props.report;

    return (
        <TableRow style={props.style}>
            <TableCell style={tableCellStyle}>{service.name}</TableCell>
            <TableCell style={tableCellStyle}>{company.name}</TableCell>
            <TableCell style={tableCellStyle}>{(service.price).toLocaleString()}</TableCell>
            <TableCell style={tableCellStyle}>{(count).toLocaleString()}</TableCell>
            <TableCell style={tableCellStyle}>{(service.price).toLocaleString()}</TableCell>
            <TableCell
                style={tableCellStyle}>{`${new Date(created_at).toLocaleTimeString('fa-IR')} - ${new Date(created_at).toLocaleDateString('fa-IR')}`}  </TableCell>
            <TableCell style={tableCellStyle}>{status === 'INIT' ? <span>بررسی نشده</span> : status === 'ACCEPT' ?
                <span style={acceptStyle}>تایید شده</span> :
                <span style={rejectStyle}>رد شده</span> || '---'}</TableCell>
            <TableCell style={tableCellStyle}>
                <Box sx={yellowButtonStyle}
                     onClick={
                        
                         () => props.onShow(props.report)
                     }
                >
                    <span> تغییر وضعیت</span>
                </Box>


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
const acceptStyle = {
    color: "rgba(8, 189, 113, 1)"
};

const rejectStyle = {
    color: "rgba(229, 41, 41, 1)"

}
const moreBtnStyles = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '24px',
    border: `1px solid ${theme.main.palette.primary.main}`,
    color: theme.main.palette.primary.main,
    borderRadius: '5px',
    margin: '0 auto',
    cursor: 'pointer',
};
const yellowButtonStyle = {
    height: '3rem',
    borderRadius: "5px",
    backgroundColor: 'rgba(247, 201, 6, 1)',
    color: '#000',
    fontWeight: 500,
    fontSize: '1.2rem',
    alignItems: "center",
    display: "flex",
    justifyContent: "center",
    boxShadow: 'none !important',
    cursor: "pointer",
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
const deleteBtnStyles = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '24px',
    color: theme.main.palette.primary.main,
    borderRadius: '5px',
    margin: '0 auto',
    cursor: 'pointer',
};
export default OrganizationRequestListItem;
