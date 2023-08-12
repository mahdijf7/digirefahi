import { useState } from 'react';
import { Box, Typography, TableBody, TableCell, TableHead, TableRow, IconButton } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import QRCode from 'react-qr-code';

// Components
import DTableWrapper from 'components/new/shared/DTable/DTableWrapper';
import DTableCell from 'components/new/shared/DTable/DTableCell';
import DSnackbar from 'components/new/shared/DSnackbar';

// Assets
import theme from 'assets/theme';

function EmpSuccessPaymentCodes({ codes, ticketType }) {
    const [snackBarData, setSnackBarData] = useState({
        show: false,
        data: {},
    });

    const copyCodeHandler = (value) => {
        navigator.clipboard.writeText(value);
        setSnackBarData({
            show: true,
            data: {
                text: 'کد رهگیری با موفقیت کپی شد.',
                type: 'success',
            },
        });
    };

    const columns = [
        { title: 'شماره خرید' },
        { title: ticketType === 'discount' ? 'کد تخفیف' : 'کد رهگیری' },
        { title: 'بارکد' },
    ];

    return (
        <Box sx={{ mt: '30px' }}>
            <DTableWrapper>
                <TableHead>
                    <TableRow>
                        {columns.map((column, index) => (
                            <TableCell style={tableHeadStyle} key={`table-column-${index}`}>
                                {column.title}
                            </TableCell>
                        ))}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {codes.map((code, index) => (
                        <TableRow key={`code-${index}`}>
                            <DTableCell>{index + 1}</DTableCell>
                            <DTableCell>
                                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px' }}>
                                    <Typography>{code.value}</Typography>
                                    <IconButton onClick={() => copyCodeHandler(code.value)}>
                                        <ContentCopyIcon />
                                    </IconButton>
                                </Box>
                            </DTableCell>
                            <DTableCell>
                                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    <QRCode value={code.value} style={{ width: '70px ', height: '70px' }} />
                                </Box>
                            </DTableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </DTableWrapper>
            <DSnackbar
                open={snackBarData.show}
                info={snackBarData.data}
                onClose={() => setSnackBarData({ ...snackBarData, show: false })}
            />
        </Box>
    );
}

const tableHeadStyle = {
    backgroundColor: theme.main.palette.primary.light,
    textAlign: 'center',
    fontWeight: 400,
    fontSize: '1.2rem',
    fontFamily: `"IRANSans", "sans-serif", "serif"`,
};
export { EmpSuccessPaymentCodes };
