import { useState, useEffect } from 'react';
import { TableCell, TableRow, Box, IconButton } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';

//conponent
import DTableEmpty from 'components/new/shared/DTable/DTableEmpty';

// Assets
import theme from 'assets/theme';
import BarcodeCreator from 'components/Common/Barcode/BarcodeCreator';

let moment = require('moment-jalaali');

const EmployeeInfoDialogInvoicdDetailT2Body = ({
    snackBarData,
    setSnackBarData,
    style,
    trnsaction,
    open,
    handleOpen,
    handleClose,
}) => {
    const [copySuccess, setCopySuccess] = useState(false);

    const handleCopy = (value) => {
        navigator.clipboard.writeText(value);
        setCopySuccess(true);
    
    };
    const { service, codes } = trnsaction;

 

    useEffect(() => {
        if (copySuccess)
            setSnackBarData({
                show: true,
                data: {
                    text: 'کپی شد',
                    type: 'success',
                },
            });
    }, [copySuccess, setSnackBarData]);

    return (
        <>
            {codes?.length > 0 ? (
                codes?.map((item, i) => (
                    <TableRow key={i} style={style}>
                        <TableCell style={tableCellStyle}>{i + 1}</TableCell>
                        <TableCell style={tableCellStyle}>
                            {item.value || '---'}
                            <IconButton onClick={() => handleCopy(item.value)}>
                                <ContentCopyIcon sx={{ mr: '2rem' }} />
                            </IconButton>
                        </TableCell>
                        <TableCell style={tableCellStyle}>
                            <BarcodeCreator id={item.value} />
                        </TableCell>
                        <TableCell style={tableCellStyle} sx={{ color: 'primary.main' }}>
                            {item.is_used === 0 ? 'استفاده نشده' : 'استفاده شده' || '---'}
                        </TableCell>
                        <TableCell style={tableCellStyle}>
                            {item.used_date ? new Date(item.used_date).toLocaleDateString('fa-IR') : '---'}
                        </TableCell>
                    </TableRow>
                ))
            ) : (
                <DTableEmpty />
            )}
        </>
    );
};

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
const tableCellStyle = {
    borderColor: theme.main.palette.background.lightDark,
    textAlign: 'center',
    fontWeight: 300,
    fontSize: '1.2rem',
    padding: '6px 14px',
    fontFamily: `"IRANSans", "sans-serif", "serif"`,
};

const imageStyle = {
    width: '7rem ',
    height: '7rem',
};

export default EmployeeInfoDialogInvoicdDetailT2Body;
