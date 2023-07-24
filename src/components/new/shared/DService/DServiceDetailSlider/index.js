import React, { useRef, useState } from 'react';
import { Box } from '@mui/material';

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';

import './styles.css';

// import required modules
import { FreeMode, Navigation, Thumbs } from 'swiper';

// Components
import DBox from 'components/new/shared/DBox';

const DServiceDetailSlider = ({ medias = [] }) => {
    const [thumbsSwiper, setThumbsSwiper] = useState(null);

    return (
        <DBox sx={{ p: '20px 45px', height: '100%', display: 'flex', flexDirection: 'column' }}>
            <Swiper
                style={{
                    '--swiper-navigation-color': '#fff',
                    '--swiper-pagination-color': '#fff',
                }}
                spaceBetween={10}
                thumbs={{ swiper: thumbsSwiper }}
                modules={[FreeMode, Navigation, Thumbs]}
                className="serviceDetail-slider-main">
                {medias.map((media) => (
                    <SwiperSlide key={media}>
                        <img src={`${process.env.REACT_APP_STORAGE_URL}/${media}`} />
                    </SwiperSlide>
                ))}
            </Swiper>
            <Box sx={{ p: '0 20px' }}>
                <Swiper
                    onSwiper={setThumbsSwiper}
                    spaceBetween={10}
                    slidesPerView={4}
                    navigation={true}
                    modules={[Navigation, Thumbs]}
                    className="serviceDetail-slider-thumb">
                    {medias.map((media) => (
                        <SwiperSlide key={media}>
                            <img src={`${process.env.REACT_APP_STORAGE_URL}/${media}`} />
                        </SwiperSlide>
                    ))}
                </Swiper>
            </Box>
        </DBox>
    );
};

export default DServiceDetailSlider;
