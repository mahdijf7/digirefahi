import { useEffect, useState } from 'react';
import { Grid, Box, Checkbox, TextField, Button, Radio, FormControlLabel, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useField, Formik, FieldArray } from 'formik';

// Utils
import OrganizationService from 'service/api/organization.service';

// Components
import DLoadingWrapper from 'components/new/shared/DLoadingWrapper';
import DServiceBox from 'components/new/shared/DServiceBox';
import DPagination from 'components/new/shared/DPagination/Index';
import { OrgAllocateServiceStats } from 'components/new/pages/organization/allocate/OrgAllocateServiceStats';
import CustomInputBase from 'components/Common/Form/CustomInputBase';
import CustomCheckbox from 'components/Common/Form/CustomChekbox';

// Assets
import theme from 'assets/theme';

const OrgAllocateService = ({ values, employeeCount }) => {
    const [loading, setLoading] = useState({ initial: true, page: false });
    const [services, setServices] = useState([]);
    const [totalPage, setTotalPage] = useState(1);
    const [page, setPage] = useState(1);
    const [serviceCount, setServiceCount] = useState(0);
    const { t } = useTranslation();
    const [field, meta, helpers] = useField({ name: 'selectedService' });

    const handlePageChange = (newPage) => {
        if (loading.page) return;
        setLoading({
            ...loading,
            page: true,
        });
        setPage(newPage);
    };
    const serviceSelected = (service) => {
        const serviceAlreadySelected = field.value && field.value.id === service.id;
        helpers.setValue(serviceAlreadySelected ? undefined : service);
    };

    useEffect(() => {
        const params = new URLSearchParams();
        params.append('page', page);
        params.append('per_page', 6);
        params.append('type', 'COMPANY');
        params.append('assign', 1);

        (async () => {
            await OrganizationService.getServices(params.toString())
                .then((res) => {
                    setServices(res.data.data);
                    setTotalPage(res.data.meta.last_page);
                    setServiceCount(res.data.meta.total);
                })
                .catch((err) => {
                    console.log(5555555);
                });

            setLoading({
                ...loading,
                initial: false,
                filter: false,
                page: false,
            });
        })();
    }, [page]);

    return (
        <Grid container sx={{ p: '0 22px 50px 22px', borderBottom: '1px solid #D9D9D9', mb: '40px' }}>
            <Grid item xs={12}>
                <Box>
                    <FormControlLabel
                        sx={{
                            mr: 0,
                            '& .MuiTypography-root': {
                                fontSize: '20px',
                                color: values.type === 'service' ? '#000' : 'rgba(119, 119, 119, 1)',
                            },
                        }}
                        value="service"
                        control={<Radio />}
                        label="تخصیص خدمات سازمانی"
                    />
                </Box>
            </Grid>
            <Grid item xs={12} mt="30px" px="36px">
                <DLoadingWrapper loading={loading.initial}>
                    <Grid container spacing="30px" className={loading.page || values.type === 'credit' ? 'box--isLoading' : ''}>
                        
                        {services && services.length === 0 && <Typography>سرویسی برای نمایش وجود ندارد.</Typography>}
                        {services.map((service) => (
                            <Grid item md={3} xl={2} key={service.id}>
                                <DServiceBox
                                small
                                    isActive={values.selectedService && values.selectedService.id === service.id}
                                    isDisabled={service.company_value === 0}
                                    service={service}
                                    tag="box"
                                    onBoxClicked={serviceSelected}
                                />
                            </Grid>
                        ))}

                        {totalPage > 1 && (
                            <Grid item xs={12} mt="0px" sx={{ display: 'flex', justifyContent: 'center' }}>
                                <DPagination current={page} totalPages={totalPage} onPageChange={handlePageChange} />
                            </Grid>
                        )}
                    </Grid>
                </DLoadingWrapper>
            </Grid>

            <OrgAllocateServiceStats employeeCount={employeeCount} serviceCount={serviceCount} />
        </Grid>
    );
};
export { OrgAllocateService };
