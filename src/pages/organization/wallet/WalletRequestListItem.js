import {Box, TableCell, TableRow} from '@mui/material';
import theme from 'assets/theme';
import MoreVertIcon from "@mui/icons-material/MoreVert";
import DeleteIcon from "../../../assets/icone/svg/DeleteIcon";
const WalletReportListItem = (props) => {
    const { id, price,created_at,status } = props.report;
    return (
        <TableRow style={props.style}>
            <TableCell style={tableCellStyle}>{id}</TableCell>
            <TableCell style={tableCellStyle}>{(+price).toLocaleString()}</TableCell>
            <TableCell style={tableCellStyle}>{`${new Date(created_at).toLocaleTimeString('fa-IR')} - ${new Date(created_at).toLocaleDateString('fa-IR')}`}  </TableCell>
            <TableCell style={tableCellStyle}>{status === 'INIT' ? <span>بررسی نشده</span> : status === 'ACCEPT' ? <span style={acceptStyle}>تایید شده</span> :  <span style={rejectStyle}>رد شده</span> || '---'}</TableCell>
            <TableCell style={tableCellStyle}>
                {status === 'INIT' ?
                    <Box sx={{display: 'flex', alignItems: 'center', justifyContent: "space-between"}}>
                    <Box sx={{...moreBtnStyles, marginLeft: "5px"}}
                         onClick={() => props.onShowRequestInfo(props.report)}>
                        <MoreVertIcon fontSize="large"/>
                    </Box>
                   <Box sx={{...deleteBtnStyles, marginRight: "5px"}}
                                               onClick={() => props.openDeleteDialog(props.report)}>
                        <DeleteIcon fontSize="large"/>
                    </Box>
                    </Box>
                        :
                        <Box sx={moreBtnStyles}
                             onClick={() => props.onShowRequestInfo(props.report)}>
                            <MoreVertIcon fontSize="large"/>
                        </Box>
                }

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
export default WalletReportListItem;
