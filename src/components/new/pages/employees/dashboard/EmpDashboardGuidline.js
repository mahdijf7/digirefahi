import { Grid, Box, Typography, Divider } from '@mui/material';

// Components
import DBox from 'components/new/shared/DBox';

const EmpDashboardGuidline = () => {
    return (
        <Grid item xs={12}>
            <DBox sx={wrapperStyles}>
                <Typography sx={{ fontSize: '20px', mb: '20px' }}>راهنمای پنل</Typography>

                <Box sx={{ ...boxStyles, borderBottom: '1px solid #EEEEEE' }}>
                    <Typography varinat="h4" color="common.black" sx={{ fontSize: '15px' }}>
                        خدمات رفاهی چیست؟
                    </Typography>
                    <Typography color="primary.lightDark" sx={{ fontSize: '12px' }}>
                        خدماتی است که شما با استفاده از اعتبار کیف پول و همچنین افزایش اعتبار می توانید دریافت کنید.
                    </Typography>
                </Box>
                <Box sx={{ ...boxStyles, borderBottom: '1px solid #EEEEEE' }}>
                    <Typography varinat="h4" color="common.black" sx={{ fontSize: '15px' }}>
                        خدمات سازمانی من چیست؟
                    </Typography>
                    <Typography color="primary.lightDark" sx={{ fontSize: '12px' }}>
                        خدماتی است که سازمان شما هزینه آن را پرداخت کرده است و شما برای دریافت آن باید آن را به خود تخصیص دهید.
                    </Typography>
                </Box>
                <Box sx={{ ...boxStyles }}>
                    <Typography varinat="h4" color="common.black" sx={{ fontSize: '15px' }}>
                        نحوه استفاده از خدمت خریداری شده:
                    </Typography>
                    <Typography color="primary.lightDark" sx={{ fontSize: '12px' }}>
                        سه نوع خدمت وجود دارد:
                        <br />
                        کدرهگیری به شما داده می شود که باید برای استفاده، آن را به تامین کننده بدهید.
                        <br />
                        کدتخفیف دریافت می کنید که باید به صورت آنلاین از آن استفاده کنید.
                        <br />
                        اعتبار شما نزد تامین کننده مستقیم شارژ می شود.
                        <br />
                    </Typography>
                </Box>
            </DBox>
        </Grid>
    );
};
const wrapperStyles = {
    p: '16px 30px 20px 20px',
};
const boxStyles = {
    pb: '20px',
    mb: '20px',
    display: 'grid',
    gap: '4px',
};
export { EmpDashboardGuidline };
