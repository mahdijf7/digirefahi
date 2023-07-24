import { TableCell, TableHead, TableRow, TableBody, Box } from '@mui/material';
// Components
import DTableWrapper from 'components/new/shared/DTable/DTableWrapper';
import EmployeeInfoDialogInvoicdDetailT1Body from 'components/new/pages/admin/employees/EmployeeInfoDialogInvoice/EmployeeInfoDialogInvoicdDetailT1Body';

// Assets
import theme from 'assets/theme';

const EmployeeInfoDialogInvoicdDetailT1 = ({ transactions, onSelectModal, open, handleOpen, handleClose }) => {
    const tableColumns = [
        { title: 'خدمت' },
        { title: 'مبلغ (تومان)' },
        { title: 'تامین کننده' },
        { title: 'استان' },
        { title: 'تاریخ صدور' },
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
                    <EmployeeInfoDialogInvoicdDetailT1Body
                        open={open}
                        handleOpen={handleOpen}
                        handleClose={handleClose}
                        onSelectModal={onSelectModal}
                        trnsaction={transactions}
                    />
                </TableBody>
            </DTableWrapper>
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

export default EmployeeInfoDialogInvoicdDetailT1;
