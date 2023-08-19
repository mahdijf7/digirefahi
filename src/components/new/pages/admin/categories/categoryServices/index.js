import { forwardRef, useEffect, useState, useImperativeHandle } from 'react';
import { useTranslation } from 'react-i18next';
import { Box, TableCell, TableHead, TableRow, TableBody, Typography, Grid } from '@mui/material';

// Utils
import adminService from 'service/api/adminService';
import theme from 'assets/theme';

// Components
import DBox from 'components/new/shared/DBox';
import DTableWrapper from 'components/new/shared/DTable/DTableWrapper';
import DLoadingWrapper from 'components/new/shared/DLoadingWrapper';
import DPagination from 'components/new/shared/DPagination/Index';
import CategoryServicesItem from './CategoryServicesItem';

// Assets
import noServiceImage from 'assets/image/admin/category-services-empty.png';

const systemColors = theme.main.palette;
const tableColumns = [{ title: 'عنوان خدمت' }, { title: 'تامین کننده' }, { title: 'قیمت (تومان)' }];

const CategoryServices = ({ category }, ref) => {
    const [loading, setLoading] = useState({ initial: true, refresh: false });
    const [filters, setFilters] = useState({ page: 1 });
    const [totalPage, setTotalPage] = useState(1);
    const [services, setServices] = useState([]);

    const handlePageChange = (newPage) => {
        if (loading.refresh) return;
        setLoading({
            ...loading,
            refresh: true,
        });
        setFilters({ ...filters, page: newPage });
    };
    const getServices = async () => {
        if (category) {
            const queryString = new URLSearchParams();
            if (filters?.page) queryString.append('page', filters.page);
            if (category?.id) queryString.append('category', category.id);

            await adminService
                .getServices(queryString)
                .then((res) => { 
                    setServices(res.data.data);
                    setTotalPage(res.data.meta.last_page);
                    setLoading({ initial: false, refresh: false });
                })
                .catch((err) => {
                  
                });
        }
    };

    useEffect(() => {
        getServices();
    }, [filters]);
 
    return (
        <DBox sx={{ marginTop: '32px' }}>
            <Box
                sx={{
                    display: 'flex',
                    padding: '12px 30px',
                    borderBottom: `1px solid ${systemColors.text.light}`,
                }}>
                <Box sx={{ display: 'flex', gap: '6px' }}>
                    <Typography component="span">لیست خدمات در زیرمجموعه</Typography>
                    <Typography component="span" color={category ? systemColors.primary.main : systemColors.text.main}>
                        {category ? category.name : 'نام زیرمجموعه'}
                    </Typography>
                </Box>
            </Box>

            <Box sx={{ display: 'flex', padding: '24px 30px', width: '100%' }} className={loading.refresh && 'box--isLoading'}>
                <DLoadingWrapper loading={loading.initial}>
                    <>
                        <Grid container>
                            {services.length === 0 ? (
                                <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center', padding: '20px 0 40px 0' }}>
                                    <img src={noServiceImage} style={{ width: '50%' }} />
                                </Grid>
                            ) : (
                                <>
                                    <Grid item xs={12}>
                                        <DTableWrapper loading={loading}>
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
                                                {services.map((service, index) => (
                                                    <CategoryServicesItem
                                                        service={service}
                                                        key={service.id}
                                                        style={{
                                                            backgroundColor: index % 2 !== 0 ? '#f2f2f2' : '#ffffff',
                                                        }}
                                                    />
                                                ))}
                                            </TableBody>
                                        </DTableWrapper>
                                    </Grid>
                                    <Grid item xs={12} mt="20px" sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                                        {totalPage > 1 && <DPagination totalPages={totalPage} onPageChange={handlePageChange} />}
                                    </Grid>
                                </>
                            )}
                        </Grid>
                    </>
                </DLoadingWrapper>
            </Box>
        </DBox>
    );
};
const tableHeadStyle = {
    backgroundColor: theme.main.palette.primary.light,
    textAlign: 'center',
    fontWeight: 400,
    fontSize: '1.5rem',
    fontFamily: `"IRANSans", "sans-serif", "serif"`,
};
export default CategoryServices;
