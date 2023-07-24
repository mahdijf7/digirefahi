import { Box, Grid, Stack, TableBody, TableCell, TableHead, TableRow, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import theme from 'assets/theme';
import { useTranslation } from 'react-i18next';
import DLoadingWrapper from 'components/new/shared/DLoadingWrapper';
import DTableWrapper from 'components/new/shared/DTable/DTableWrapper';
import DTableEmpty from 'components/new/shared/DTable/DTableEmpty';
import DPagination from 'components/new/shared/DPagination/Index';
import adminService from 'service/api/adminService';

// Components
import DTableCell from 'components/new/shared/DTable/DTableCell';

const Services = ({ selectedId }) => {
    const { t } = useTranslation();
    const [loading, setLoading] = useState({ initial: true, refresh: false });
    const [filters, setFilters] = useState({ page: 1 });
    const [totalPage, setTotalPage] = useState(1);
    const [services, setServices] = useState([]);

    const tableColumns = [
        { title: t('supplier.services.name') },
        { title: t('supplier.services.category') },
        { title: t('supplier.services.type') },
        { title: t('supplier.services.price') },
    ];

    const getServices = async () => {
        const queryString = new URLSearchParams();
        queryString.append('suppliers[0]', selectedId);
        queryString.append('per_page', 10);
        if (filters?.page) queryString.append('page', filters.page);
        await adminService
            .getServices(queryString.toString())
            .then((res) => {
                setServices(res.data.data);
                setTotalPage(res.data.meta.last_page);
                setLoading({ initial: false, refresh: false });
            })
            .catch((err) => {
                console.log('error occured!');
            });
    };
    useEffect(() => {
        getServices();
    }, [filters]);

    const handlePageChange = (newPage) => {
        if (loading.refresh) return;
        setLoading({
            ...loading,
            refresh: true,
        });
        setFilters({ ...filters, page: newPage });
    };

    return (
        <Box className={loading.refresh && 'box--isLoading'} mt="2rem" p="26px 29px" bgcolor="common.white">
            <DLoadingWrapper loading={loading.initial}>
                <Grid container>
                    <Grid item xs={12}>
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
                                {services.length > 0 ? (
                                    services.map((service, index) => (
                                        <TableRow
                                            style={{
                                                backgroundColor: index % 2 !== 0 ? '#f2f2f2' : '#ffffff',
                                            }}>
                                            <DTableCell>
                                                <Stack direction="row">
                                                    {service.thumbnail && (
                                                        <img
                                                            src={`${process.env.REACT_APP_STORAGE_URL}/${service.thumbnail}`}
                                                            style={{ maxHeight: '30px' }}
                                                            alt={service.name}
                                                        />
                                                    )}
                                                    <Typography style={{ marginRight: '10px' }} sx={{ pt: 1 }}>
                                                        {service.name || '---'}
                                                    </Typography>
                                                </Stack>
                                            </DTableCell>
                                            <DTableCell>{service.category || '---'}</DTableCell>
                                            <DTableCell>
                                                {service.type === 'BASIC'
                                                    ? 'معمولی'
                                                    : service.type === 'COMPANY'
                                                    ? 'سازمانی'
                                                    : '---'}
                                            </DTableCell>
                                            <DTableCell>{Number(service.price | 0).toLocaleString('IRR') || '---'}</DTableCell>
                                        </TableRow>
                                    ))
                                ) : (
                                    <DTableEmpty />
                                )}
                            </TableBody>
                        </DTableWrapper>
                    </Grid>
                    <Grid item xs={12} mt="20px" sx={{ display: 'flex', justifyContent: 'center' }}>
                        {totalPage > 1 && <DPagination totalPages={totalPage} onPageChange={handlePageChange} />}
                    </Grid>
                </Grid>
            </DLoadingWrapper>
        </Box>
    );
};

const tableHeadStyle = {
    backgroundColor: theme.main.palette.primary.light,
    textAlign: 'center',
    fontWeight: 400,
    fontSize: '1.5rem',
    fontFamily: `"IRANSans", "sans-serif", "serif"`,
}; 

export default Services;
