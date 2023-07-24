import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { TableCell, TableHead, TableRow, TableBody, Box, Button } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { Formik, Form } from 'formik';

// Utils
import adminService from 'service/api/adminService';

// Components
import DTableWrapper from 'components/new/shared/DTable/DTableWrapper';
import DTableEmpty from 'components/new/shared/DTable/DTableEmpty';
import DPagination from 'components/new/shared/DPagination/Index';
import CustomInputSearch from 'components/Common/Form/CustomInputSearch';
import DLoadingWrapper from 'components/new/shared/DLoadingWrapper';
import AllocatedServiceItems from './AllocatedServiceItems';

// Assets
import theme from 'assets/theme';

const AllocatedService = ({ open, handleOpen, handleClose }) => {
    const [loading, setLoading] = useState({ initial: true, refresh: false });
    const [filters, setFilters] = useState({ page: 1, name: '' });
    const [totalPage, setTotalPage] = useState(1);
    const [services, setServices] = useState([]);
    const [invoiceId, setInvoiceId] = useState(null);
    const { companyId } = useParams();

    const { t } = useTranslation();

    const Initial_Values = {
        name: '',
    };
    const handleSubmit = async (values) => {
     
        const name = values.name;

        setFilters({ ...filters, name });
    };

    const tableColumns = [
        { title: 'ردیف' },
        { title: 'عنوان خدمت' },
        { title: 'دسته بندی' },
        { title: 'نوع خدمت' },
        { title: 'نوع بلیط' },
        { title: 'تامین کننده' },
        { title: 'قیمت (تومان)' },
    ];

    const handlePageChange = (newPage) => {
        if (loading.refresh) return;
        setLoading({
            ...loading,
            refresh: true,
        });
        setFilters({ ...filters, page: newPage });
    };
    const queryString = new URLSearchParams();
    queryString.append('page', filters.page);
    queryString.append('name', filters.name);
    queryString.append('company_id', companyId);

    const getAllocationServiceData = async (newpage = 1) => {
        
        setLoading({
            ...loading,
            refresh: true,
        });
        await adminService
            .getAllocationService(queryString)
            .then((res) => {
            
                setLoading({
                    initial: false,
                    refresh: false,
                });

                setServices(res.data.data);
                setTotalPage(res.data.meta.last_page);
            })
            .catch((err) => {
             
                setLoading({
                    initial: false,
                    refresh: false,
                });
            });
    };

    useEffect(() => {
        getAllocationServiceData();
    }, [filters]);

  

    return (
        <Box>
            <DLoadingWrapper loading={loading.initial}>
                <Box sx={wrapperStyles} className={loading.refresh && 'box--isLoading'}>
                    <Formik initialValues={Initial_Values} onSubmit={handleSubmit}>
                        <Form>
                            <Box width="31%" mb="1.3rem">
                                <CustomInputSearch
                                    sx={{ width: '100% !important' }}
                                    placeholder={'جستجوی عنوان خدمت'}
                                    name="name"
                                />
                            </Box>
                        </Form>
                    </Formik>
                    <>
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
                                        <AllocatedServiceItems
                                            open={open}
                                            handleOpen={handleOpen}
                                            handleClose={handleClose}
                                            service={service}
                                            index={index}
                                            key={service.id}
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

                        {totalPage > 1 && (
                            <Box
                                sx={{
                                    display: 'flex',
                                    justifyContent: 'flex-end',
                                    marginTop: '30px',
                                }}>
                                <DPagination totalPages={totalPage} onPageChange={handlePageChange} />
                            </Box>
                        )}

                        <Box
                            sx={{
                                display: 'flex',
                                justifyContent: 'flex-end',
                                marginTop: '30px',
                            }}>
                            <Button sx={{ fontSize: '14px' }} variant="outlined" component={Link} to="/app/admin/companies/">
                                بازگشت به لیست سازمان‌ها
                            </Button>
                        </Box>
                    </>
                </Box>
            </DLoadingWrapper>
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

export default AllocatedService;
