import { useState } from 'react';
import { TableCell, TableHead, TableRow, TableBody, Box } from '@mui/material';
import { useTranslation } from 'react-i18next';

// Utils

// Components
import DTableWrapper from 'components/new/shared/DTable/DTableWrapper';
import EmployeeInfoDialogInvoicdDetailT2Body from 'components/new/pages/admin/employees/EmployeeInfoDialogInvoice/EmployeeInfoDialogInvoicdDetailT2Body';
import DSnackbar from 'components/new/shared/DSnackbar';

// Assets
import theme from 'assets/theme';

const EmployeeInfoDialogInvoicdDetailT2 = ({ transactions, employeeId, onSelectModal, open, handleOpen, handleClose }) => {
    const [snackBarData, setSnackBarData] = useState({
        show: false,
        data: {},
    });

    const { t } = useTranslation();

    const tableColumns = [
        { title: 'ردیف خرید' },
        { title: 'کد رهگیری / بن تخفیف' },
        { title: 'بارکد' },
        { title: 'وضعیت' },
        { title: 'تاریخ استفاده' },
    ];

    return (
        <Box sx={wrapperStyles}>
            <DTableWrapper>
                <TableHead>
                    <TableRow>
                        {tableColumns.map((column, index) => {
                            return (
                                <TableCell style={tableHeadStyle} key={`table-column-${index}`}>
                                    {column.title}
                                </TableCell>
                            );
                        })}
                    </TableRow>
                </TableHead>
                <TableBody>
                    <EmployeeInfoDialogInvoicdDetailT2Body
                        snackBarData={snackBarData}
                        setSnackBarData={setSnackBarData}
                        open={open}
                        handleOpen={handleOpen}
                        handleClose={handleClose}
                        onSelectModal={onSelectModal}
                        trnsaction={transactions}
                        // key={transactions.id}
                        // style={{
                        //     backgroundColor: index % 2 !== 0 ? '#f2f2f2' : '#ffffff',
                        // }}
                    />
                </TableBody>
            </DTableWrapper>
            <DSnackbar
                open={snackBarData.show}
                info={snackBarData.data}
                onClose={() => setSnackBarData({ ...snackBarData, show: false })}
            />
        </Box>
    );
};

const wrapperStyles = {
    display: 'flex',
    flexDirection: 'column',
    marginTop: '30px',
    padding: '0 30px',
};
const tableHeadStyle = {
    backgroundColor: theme.main.palette.primary.light,
    textAlign: 'center',
    fontWeight: 400,
    fontSize: '1.5rem',
    fontFamily: `"IRANSans", "sans-serif", "serif"`,
};

export default EmployeeInfoDialogInvoicdDetailT2;
