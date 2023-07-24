import { TableContainer, Table } from '@mui/material';

// Assets
import 'assets/style/components/shared/_d_table.scss';

const DTableWrapper = ({sx, children }) => {
    return <TableContainer className="d-table-wrapper" sx={sx}>
        <Table className="d-table" aria-label="simple table">
            {children}
        </Table>
    </TableContainer>;
};

export default DTableWrapper;
