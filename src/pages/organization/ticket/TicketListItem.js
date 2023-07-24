import {Box, TableCell, TableRow} from '@mui/material';
import theme from 'assets/theme';
import MoreVertIcon from "@mui/icons-material/MoreVert";
import DeleteIcon from "../../../assets/icone/svg/DeleteIcon";
import LoadingButton from "@mui/lab/LoadingButton";
import { Link } from 'react-router-dom';
const TicketListItem = (props) => {
    const { id, title,owner,owner_national_code,type,created_at,status,update_at } = props.ticket;
    return (
        <TableRow style={props.style}>
            <TableCell style={tableCellStyle}>{id}</TableCell>
            <TableCell style={tableCellStyle}>{title}</TableCell>
            <TableCell style={tableCellStyle}>{owner}</TableCell>
            <TableCell style={tableCellStyle}>{owner_national_code || "----"}</TableCell>
            <TableCell style={tableCellStyle}>{type}</TableCell>
            <TableCell style={tableCellStyle}>{status === 'OPEN'  ? <span style={acceptStyle}>باز</span> :  <span >بسته شده</span> || '---'}</TableCell>
            <TableCell style={tableCellStyle}>{update_at ? `${new Date(update_at).toLocaleTimeString('fa-IR')} - ${new Date(update_at).toLocaleDateString('fa-IR')}` :`${new Date(created_at).toLocaleTimeString('fa-IR')} - ${new Date(created_at).toLocaleDateString('fa-IR')}`}  </TableCell>
            <TableCell style={tableCellStyle}>

                <LoadingButton
                    variant="contained"
                    sx={blueBtnStyle}
                    color="error"
                    disabled={status !== 'OPEN'}
                    // loading={loading}
                    onClick={()=>props.closeTicket(id)}
                >
                    بستن
                </LoadingButton>
            </TableCell>
            <TableCell style={tableCellStyle}>
                <Link style={{ textDecoration: 'none',width: '100%',display: 'grid' }} to={`${props.baseUrl}${id}`}>
                        <Box sx={moreBtnStyles}>
                            <MoreVertIcon fontSize="large"/>
                        </Box>
                </Link>
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
color:"rgba(8, 189, 113, 1)"
};

const rejectStyle = {
color:"rgba(229, 41, 41, 1)"

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
const  blueBtnStyle = {
    padding: "4px 35px",
    backgroundColor:"rgba(8, 119, 189, 1)",
    border:"1px solid rgba(8, 119, 189, 1)",
    borderRadius:"5px",
    fontSize: 12,
    color: "#fff",
    textDecoration:"none",
    fontFamily: `"IRANSans", "sans-serif", "serif"`,
    margin:"0 5px",
    boxShadow: 'none',
    '&:hover': {
        boxShadow: 'none !important',
        backgroundColor:"rgba(8, 119, 189, 1)",
        color: "#fff",
        textDecoration:"none"
    },
    '&:visited,&:active,& a': {
        boxShadow: 'none !important',
        backgroundColor:"rgba(8, 119, 189, 1)",
        color: "#fff",
        textDecoration:"none",
    },
}


export default TicketListItem;
