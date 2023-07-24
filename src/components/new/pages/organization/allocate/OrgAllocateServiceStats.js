import { Grid, Box, Typography } from '@mui/material';
import { useFormikContext } from 'formik';

const OrgAllocateServiceStats = ({ employeeCount, serviceCount }) => {
    const { values } = useFormikContext();

    return (
        <Grid item xs={12} mt="30px" px="36px">
            <Grid container spacing="37px">
                <Grid item xs={4}>
                    <Box
                        sx={{
                            backgroundColor: 'rgba(242, 242, 247, 1)',
                            border: '1px solid rgba(209, 209, 214, 1)',
                            borderRadius: '8px',
                            height: '48px',
                            display: 'flex',
                            alignItems: 'center',
                            padding: '0 14px',
                        }}>
                        <Typography sx={{ fontSize: '14px' }}>
                            تعداد کارمندان انتخاب شده:{' '}
                            <Typography component="span" sx={{ color: 'rgba(8, 119, 189, 1)', fontWeight: 600 }}>
                                {employeeCount} نفر
                            </Typography>{' '}
                            <Typography component="span" sx={{ color: 'rgba(8, 119, 189, 1)', fontSize: '12px' }}>
                                (بر اساس فیلترها)
                            </Typography>
                        </Typography>
                    </Box>
                </Grid>
                <Grid item xs={4}>
                    <Box
                        sx={{
                            backgroundColor: 'rgba(242, 242, 247, 1)',
                            border: '1px solid rgba(209, 209, 214, 1)',
                            borderRadius: '8px',
                            height: '48px',
                            display: 'flex',
                            alignItems: 'center',
                            padding: '0 14px',
                        }}>
                        <Typography sx={{ fontSize: '14px' }}>
                            مجموع مبلغ تخصیص یافته:{' '}
                            <Typography component="span" sx={{ color: 'rgba(8, 119, 189, 1)', fontWeight: 600 }}>
                                {values.selectedService ? (values.selectedService.price * employeeCount).toLocaleString() : 0}{' '}
                                تومان
                            </Typography>
                        </Typography>
                    </Box>
                </Grid>
                <Grid item xs={4}>
                    <Box
                        sx={{
                            backgroundColor: 'rgba(242, 242, 247, 1)',
                            border: '1px solid rgba(209, 209, 214, 1)',
                            borderRadius: '8px',
                            height: '48px',
                            display: 'flex',
                            alignItems: 'center',
                            padding: '0 14px',
                        }}>
                        <Typography sx={{ fontSize: '14px' }}>
                            موجودی خدمت سازمانی:{' '}
                            <Typography component="span" sx={{ color: 'rgba(8, 119, 189, 1)', fontWeight: 600 }}>
                                {values?.selectedService
                                    ? `${values.selectedService.company_value} عدد`
                                    : 'سرویسی انتخاب نشده است!'}
                            </Typography>
                        </Typography>
                    </Box>
                </Grid>
            </Grid>
        </Grid>
    );
};

export { OrgAllocateServiceStats };
