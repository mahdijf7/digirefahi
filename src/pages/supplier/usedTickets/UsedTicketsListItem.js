import {Box, TableCell, TableRow} from '@mui/material';
import theme from 'assets/theme';
import {ColorWhite} from "../../../assets/theme/color";

const UsedTicketsListItem = ({ props, style,report,onShow }) => {
    const {created_at } = report;
    return (
        <TableRow style={style}>
            <TableCell style={tableCellStyle}>{report.service.name}</TableCell>
            <TableCell style={tableCellStyle}>{report.employee.full_name}</TableCell>
            <TableCell style={tableCellStyle}>{report.employee.national_code}</TableCell>
            <TableCell style={tableCellStyle}>{report.company_name}</TableCell>
            <TableCell style={tableCellStyle}>{report.price}</TableCell>
            <TableCell style={tableCellStyle}>{`${new Date(created_at).toLocaleTimeString('fa-IR')} - ${new Date(created_at).toLocaleDateString('fa-IR')}`}  </TableCell>
            <TableCell style={tableCellStyle}>
                <Box sx={yellowButtonStyle} onClick={() => {
                                                    onShow(report)
                                                   }}
            >
                <span> مشاهده</span>
            </Box>  </TableCell>
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
const yellowButtonStyle = {
    width: '70% !important ',
    margin:"0 auto",
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
export default UsedTicketsListItem;
