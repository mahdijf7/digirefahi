import { useState, useEffect } from 'react';
import { Grid, Box } from '@mui/material';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation, Autoplay } from 'swiper';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import './styles.css';

// Utils
import dashboardService from 'service/api/dashboardService';

// Components
import DBox from 'components/new/shared/DBox';
import DLoadingWrapper from 'components/new/shared/DLoadingWrapper';

const EmpDashboardAdminBanners = () => {
    const [loading, setLoading] = useState({ initial: true });
    const [banners, setBanners] = useState(false);

    useEffect(() => {
        const controller = new AbortController();
        const signal = controller.signal;

        (async () => {
            await dashboardService
                .get(`banners?type=ADMIN`, { signal })
                .then((res) => {
                    setBanners(res.data.data);
                })
                .catch((err) => {
                    console.log('error occured!');
                });

            setLoading({ initial: false });
        })();

        return () => controller.abort();
    }, []);

    return (
        <Grid item xs={12} lg={6}>
            <DBox sx={{   overflow: 'hidden', justifyContent: 'center' }}>
                <DLoadingWrapper loading={loading.initial}>
                    {banners && (
                        <Swiper
                            autoplay={{
                                delay: 3500,
                                disableOnInteraction: false,
                            }}
                            navigation={true}
                            pagination={true}
                            modules={[Pagination, Navigation, Autoplay]}
                            className="emp-dashboard-slider">
                            {banners.map((banner, index) => (
                                <SwiperSlide key={index}>
                                    <Box
                                        sx={{
                                            position: 'relative',
                                            '&::before': {
                                                content: `''`,
                                                display: 'block',
                                                pt: '33.3333%',
                                            },

                                            height: '100%',
                                            width: '100%',
                                        }}>
                                        <Box
                                            sx={{
                                                height: '100%',
                                                position: 'absolute',
                                                right: 0,
                                                top: 0,
                                                width: '100%',
                                                '& img': { height: '100%', width: '100%', objectFit: 'cover' },
                                                display: 'flex',
                                            }}> 
                                            <img src={`${process.env.REACT_APP_STORAGE_URL}/${banner}`} />
                                        </Box>
                                    </Box>
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    )}
                </DLoadingWrapper>
            </DBox>
        </Grid>
    );
};

export { EmpDashboardAdminBanners };
