import { useContext } from 'react';
import { Grid, Box, Typography } from '@mui/material';
import { useFormikContext } from 'formik';

// Utils
import AuthContext from 'store/Auth-context';

const OrgAllocateCreditStats = ({ employeeCount }) => {
    const { values } = useFormikContext();
    const { account } = useContext(AuthContext);

    return (
        <Grid item xs={12} mt="30px">
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
                                {values?.budgets
                                    .reduce((f, c) => {
                                        if (+c.amount) f += +c.amount;
                                        return f;
                                    }, 0)
                                    .toLocaleString()}{' '}
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
                            موجودی کیف پول:{' '}
                            <Typography component="span" sx={{ color: 'rgba(8, 119, 189, 1)', fontWeight: 600 }}>
                                {account?.wallet?.remain.toLocaleString()} تومان
                            </Typography>
                        </Typography>
                    </Box>
                </Grid>
            </Grid>
        </Grid>
    );
};

export { OrgAllocateCreditStats };
