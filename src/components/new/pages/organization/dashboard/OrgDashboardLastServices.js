import { Grid, Box, TableCell, TableHead, TableRow, TableBody } from '@mui/material';

// Components
import DTableWrapper from 'components/new/shared/DTable/DTableWrapper';
import DTableEmpty from 'components/new/shared/DTable/DTableEmpty';
import DTableHeader from 'components/new/shared/DTable/DTableHeader';
import OrgDashboardLastServicesItem from './OrgDashboardLastServicesItem';

// Assets
import theme from 'assets/theme';

const tableColumns = [{ title: 'نام خدمت' }, { title: 'نام کارمند' }, { title: 'قیمت( تومان )' }, { title: 'تاریخ' }];

const OrganizationDashboardLastEmployeeServices = ({ orders }) => {
    return (
        <Grid item xs={12}   lg={9}>
            <Box
                p="26px 29px"
                bgcolor="common.white"
                borderRadius="14px"
                flex="1"
                boxShadow="0px 0px 12px 3px rgba(0, 0, 0, 0.05)">
                <DTableHeader title="آخرین خدمات دریافتی کارکنان" />

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
                        {orders.length > 0 ? (
                            orders.map((order, index) => (
                                <OrgDashboardLastServicesItem
                                    order={order}
                                    key={order.id}
                                    style={{
                                        backgroundColor: index % 2 !== 0 ? '#f2f2f2' : '#ffffff',
                                    }}
                                />
                            ))
                        ) : (
                            <DTableEmpty />
                        )}
                    </TableBody>
                </DTableWrapper>
            </Box>
        </Grid>
    );
};

const tableHeadStyle = {
    backgroundColor: theme.main.palette.primary.light,
    textAlign: 'center',
    fontWeight: 400,
    fontSize: '1.5rem',
    fontFamily: `"IRANSans", "sans-serif", "serif"`,
};

export default OrganizationDashboardLastEmployeeServices;
