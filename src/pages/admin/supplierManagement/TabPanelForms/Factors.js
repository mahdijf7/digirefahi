import {
    Box,
    Button,
    Dialog,
    Grid,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import theme from 'assets/theme';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import DLoadingWrapper from 'components/new/shared/DLoadingWrapper';
import DTableWrapper from 'components/new/shared/DTable/DTableWrapper';
import DTableEmpty from 'components/new/shared/DTable/DTableEmpty';
import DPagination from 'components/new/shared/DPagination/Index';
import { isEmpty } from 'lodash';
import adminService from 'service/api/adminService';
import FactorDetailDialog from '../FactorDetailDialog';

const Factors = ({ selectedId, props }) => {
    const { t } = useTranslation();
    const [loading, setLoading] = useState({ initial: true, refresh: false });
    const [filters, setFilters] = useState({ page: 1 });
    const [totalPage, setTotalPage] = useState(1);
    const [factors, setFactors] = useState([]);
    const [detailConfig, setDetailConfig] = useState({ isOpen: false, factorId: null });

    const getServices = async () => {
        const queryString = new URLSearchParams();
        queryString.append('supplier_id', selectedId);
        if (filters?.page) queryString.append('page', filters.page);
        await adminService
            .getOrders(queryString.toString())
            .then((res) => {
                setFactors(res.data.data);
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

    const tableColumns = [
        { title: t('supplier.factors.factorNo') },
        { title: t('supplier.factors.serviceName') },
        { title: t('supplier.factors.buyer') },
        { title: t('supplier.factors.organizationName') },
        { title: t('supplier.factors.price') },
        { title: t('supplier.factors.date') },
        { title: t('supplier.factors.detail') },
    ];

    const handlePageChange = (newPage) => {
        if (loading.refresh) return;
        setLoading({
            ...loading,
            refresh: true,
        });
        setFilters({ ...filters, page: newPage });
    };

    return (
        <>
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
                                    {factors.length > 0 ? (
                                        factors.map((factor, index) => (
                                            <TableRow
                                                style={{
                                                    backgroundColor: index % 2 !== 0 ? '#f2f2f2' : '#ffffff',
                                                }}>
                                                <TableCell style={tableCellStyle}>{factor.number || '---'}</TableCell>
                                                <TableCell style={tableCellStyle}>{factor.service.name || '---'}</TableCell>
                                                <TableCell style={tableCellStyle}>{factor.employee.full_name || '---'}</TableCell>
                                                <TableCell style={tableCellStyle}>{factor.company_name || '---'}</TableCell>
                                                <TableCell style={tableCellStyle}>
                                                    {Number(factor.price | 0).toLocaleString('IRR') || '---'}
                                                </TableCell>
                                                <TableCell style={tableCellStyle}>
                                                    {!isEmpty(factor.created_at)
                                                        ? new Date(factor.created_at).toLocaleDateString('fa-IR')
                                                        : '---'}
                                                </TableCell>
                                                <TableCell style={tableCellStyle}>
                                                    <Box
                                                        sx={moreBtnStyles}
                                                        onClick={() => setDetailConfig({ isOpen: true, factorId: factor?.id })}>
                                                        <MoreVertIcon fontSize="large" />
                                                    </Box>
                                                </TableCell>
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
            <FactorDetailDialog open={detailConfig.isOpen} factorId={detailConfig.factorId} handleClose={()=>{setDetailConfig({isOpen: false, factorId: null})}} />
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

const tableHeadStyle = {
    backgroundColor: theme.main.palette.primary.light,
    textAlign: 'center',
    fontWeight: 400,
    fontSize: '1.5rem',
    fontFamily: `"IRANSans", "sans-serif", "serif"`,
};
const tableCellStyle = {
    borderColor: theme.main.palette.background.lightDark,
    textAlign: 'center',
    fontWeight: 300,
    fontSize: '1.2rem',
    padding: '6px 14px',
    fontFamily: `"IRANSans", "sans-serif", "serif"`,
};

export default Factors;
