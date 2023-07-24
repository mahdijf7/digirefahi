import React, { useState, useRef } from 'react';
import { Button } from '@mui/material';
import { Box } from '@mui/material';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper';

// style
import 'assets/style/dashboard.scss';
import imgPrimary from 'assets/image/Group6370.png';
import { ColorBlack, ColorPrimary } from 'assets/theme/color';
import SlideshowIcon from '@mui/icons-material/Slideshow';

import DeleteIcon from '@mui/icons-material/Delete';

const NewServiceSwiper = ({ document, setDocument, serviceData, uploadImage, setUploadImage }) => {
    const swiperRef = useRef(null);
    const [selectedItem, setSelectedItem] = useState(null);
    const [selectedItemIndex, setSelectedItemIndex] = useState(null);
    const [isHovered, setIsHovered] = useState(false);

    const handlePrevClick = () => {
        swiperRef.current?.swiper.slidePrev();
    };

    const handleNextClick = () => {
        swiperRef.current?.swiper.slideNext();
    };

    const handleItemClick = (item, i) => {
        console.log(item, i);
        setSelectedItem((prev) => item);
        setSelectedItemIndex((prev) => i);
    };

    const handleRemove = () => {
        if (selectedItem) {
            const filteredData = document.filter((item, i) => selectedItemIndex !== i);

            const filteredUpload = uploadImage.filter((item, i) => selectedItemIndex !== i);
            setUploadImage((prev) => filteredUpload);
            setDocument(filteredData);
            handleItemClick(uploadImage[0], 0);
        }
    };

    return (
        <Box position="relative">
            {selectedItem && isHovered && (
                <Box onMouseOver={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)} sx={{ ...buttonImageStyle }}>
                    <Button onClick={handleRemove}>
                        <DeleteIcon />
                    </Button>
                </Box>
            )}

            {selectedItem?.type === 'video' ? (
                <video
                    onMouseOver={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                    style={{ height: '17.6rem', border: '1px solid black ' }}
                    className="img"
                    controls>
                    <source src={selectedItem.url || document[0]?.url} type="video/mp4" />
                    <SlideshowIcon />
                    Your browser does not support the video tag.
                </video>
            ) : (
                <img
                    onMouseOver={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                    style={{ height: '17.6rem', border: '1px solid black ' }}
                    className="img"
                    src={selectedItem?.url || document[0]?.url || imgPrimary}
                    alt=""
                />
            )}
            <Swiper
                ref={swiperRef}
                style={{ width: '90%' }}
                spaceBetween={-30}
                slidesPerView={2}
                effect="fade"
                navigation={{
                    prevEl: '.swiper-button-prev',
                    nextEl: '.swiper-button-next',
                }}
                modules={[Navigation]}
                onSlideChange={(swiper) => {
                    const { activeIndex } = swiper;
                    const item = document[activeIndex];
                    setSelectedItem(item);
                }}>
                {document.map((img, i) => {
                    return (
                        <SwiperSlide key={img.id}>
                            {img.type === 'video' ? (
                                <video key={img.id} className="slider-item" style={{}} onClick={() => handleItemClick(img)}>
                                    <source src={img.url} type="video/mp4" />
                                    Your browser does not support the video tag.
                                </video>
                            ) : (
                                <img className="slider-item" src={img.url} alt="" onClick={() => handleItemClick(img, i)} />
                            )}
                        </SwiperSlide>
                    );
                })}
            </Swiper>
            {document[0] && (
                <>
                    <Button
                        type="button"
                        className="swiper-button-next"
                        onClick={handlePrevClick}
                        sx={{
                            right: '-2%',
                            ...buttonStyle,
                        }}
                    />
                    <Button
                        type="button"
                        className="swiper-button-prev"
                        onClick={handleNextClick}
                        sx={{ right: '98% ', ...buttonStyle }}
                    />
                </>
            )}
        </Box>
    );
};

export default NewServiceSwiper;

const buttonImageStyle = {
    zIndex: '1000',
    position: 'absolute',
    display: 'flex',
    justifyContent: 'center',
    alignItem: 'center',
    gap: '.5rem',
    // backgroundColor: 'yellow',
    top: '8rem',
    right: '25%',
    width: '50%',
    height: '3.2rem',

    '& button': {
        color: ColorPrimary,
        backgroundColor: 'white',
        maxWidth: '3.2rem',
        minWidth: '3.2rem',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItem: 'center',
        border: `.1rem solid  ${ColorPrimary} `,
        fontSize: '.7rem',
        '&:hover': {
            color: ColorPrimary,
            backgroundColor: 'white',
        },
    },
};
const buttonStyle = {
    position: 'absolute',
    top: '20rem !important',
    transform: 'scale(.7)',
    zIndex: '0',
    margin: '0 !important',
    padding: '0 !important',
    minWidth: '1rem',
    bgcolor: 'white',

    '&:hover': {},
    '& svg': {
        color: ColorBlack,
    },
};
//import React, { useState, useRef, useEffect } from 'react';
// import { Button, IconButton } from '@mui/material';
// import { Box } from '@mui/material';
// import { Swiper, SwiperSlide } from 'swiper/react';
// import { Navigation } from 'swiper';

// // style
// import 'assets/style/dashboard.scss';
// import imgPrimary from 'assets/image/Group6370.png';
// import { ColorBlack, ColorPrimary } from 'assets/theme/color';
// import SlideshowIcon from '@mui/icons-material/Slideshow';
// import VisibilityIcon from '@mui/icons-material/Visibility';
// import EditIcon from '@mui/icons-material/Edit';
// import DeleteIcon from '@mui/icons-material/Delete';
// import ServiceEditModal from 'layout/Admin/SeviceManagement/ServiceEditing/ServiceEditingLayout/ServiceEditModal';
// import CustomInputDocument from 'components/Common/Form/CustomInputDocument';

// const NewServiceEditSwipper = ({ document, setDocument, serviceData, uploadImage, setUploadImage }) => {
//     const swiperRef = useRef(null);
//     const [selectedItem, setSelectedItem] = useState(null);
//     const [open, setOpen] = useState(null);
//     const [edit, setEdit] = useState(false);

//     const handleClose = () => {
//         setOpen(false);
//     };

//     const handlePrevClick = () => {
//         swiperRef.current?.swiper.slidePrev();
//     };

//     const handleNextClick = () => {
//         swiperRef.current?.swiper.slideNext();
//     };

//     const handleItemClick = (item, index) => {
//         setEdit(false);
//         setSelectedItem(item);
//     };

//     const handleRemove = () => {
//         setEdit(false);
//         const filteredData = document.filter((item, i) => selectedItem !== item);
//         setUploadImage(filteredData);
//         setDocument(filteredData);
//         console.log(filteredData);
//     };

//     const handleImageSelect = (file) => {
//         const filteredArray = uploadImage.map((item) => {
//             if (item === selectedItem) {
//                 return file;
//             } else {
//                 return item;
//             }
//         });

//         setUploadImage(filteredArray);
//         if (file) {
//             const reader = new FileReader();
//             reader.onload = () => {
//                 const documentItem = {
//                     id: Date.now(),
//                     type: file.type.includes('video') ? 'video' : 'image',
//                     url: reader.result,
//                 };
//                 const filteredArrayDocument = uploadImage.map((item) => {
//                     if (item === selectedItem) {
//                         return documentItem;
//                     } else {
//                         return item;
//                     }
//                 });
//                 setDocument(filteredArrayDocument);
//             };
//             reader.readAsDataURL(file);
//             if (file.type.includes('image')) {
//             } else if (file.type.includes('video')) {
//             }
//         }

//         setDocument(filteredArray);
//     };

//     useEffect(() => {
//         setSelectedItem(document[0]);
//     }, [document]);

//     const buttonImageStyle = {
//         zIndex: '1000',
//         position: 'absolute',
//         display: 'flex',
//         justifyContent: 'center',
//         alignItem: 'center',
//         gap: '.5rem',
//         // backgroundColor: 'yellow',
//         top: '8rem',
//         right: '25%',
//         width: '50%',
//         height: '3.2rem',

//         '& button': {
//             color: ColorPrimary,
//             backgroundColor: 'white',
//             maxWidth: '3.2rem',
//             minWidth: '3.2rem',
//             display: 'flex',
//             flexDirection: 'column',
//             justifyContent: 'center',
//             alignItem: 'center',
//             border: `.1rem solid  ${ColorPrimary} `,
//             fontSize: '.7rem',
//             '&:hover': {
//                 color: ColorPrimary,
//                 backgroundColor: 'white',
//             },
//         },
//     };
//     const imageSelectedItem = document[0]
//         ? selectedItem?.url || process.env.REACT_APP_STORAGE_URL + '/' + selectedItem
//         : imgPrimary || selectedItem?.url;
//     const shadow = ' 0px 0px 6px 2px rgba(0, 0, 0, 0.05)';
//     return (
//         <>
//             {document && (
//                 <Box position="relative">
//                     {document[0] && (
//                         <Box sx={buttonImageStyle}>
//                             <Button onClick={handleRemove}>
//                                 <DeleteIcon />
//                             </Button>
//                         </Box>
//                     )}
//                     {selectedItem?.type === 'video' ? (
//                         <video className="img" style={{ height: '17.6rem', boxShadow: shadow }}>
//                             <source src={selectedItem?.url} type="video/mp4" />
//                             Your browser does not support the video tag.
//                         </video>
//                     ) : (
//                         <img style={{ height: '17.6rem', boxShadow: shadow }} className="img" src={imageSelectedItem} alt="" />
//                     )}
//                     <Swiper
//                         ref={swiperRef}
//                         style={{ width: '90%' }}
//                         spaceBetween={2}
//                         slidesPerView={2}
//                         effect="fade"
//                         navigation={{
//                             prevEl: '.swiper-button-prev',
//                             nextEl: '.swiper-button-next',
//                         }}
//                         modules={[Navigation]}
//                         onSlideChange={(swiper) => {
//                             const { activeIndex } = swiper;
//                             const item = document[activeIndex];
//                             setSelectedItem(item);
//                         }}>
//                         {document.map((img, i) => {
//                             const imageDocumnet = img?.url || process.env.REACT_APP_STORAGE_URL + '/' + img;
//                             return (
//                                 <SwiperSlide key={img.id}>
//                                     {img.type === 'video' ? (
//                                         <Box position="relative">
//                                             <SlideshowIcon sx={{ position: 'absolute', top: '37%', right: '32%' }} />
//                                             <video
//                                                 key={img.id}
//                                                 className="slider-item"
//                                                 style={{}}
//                                                 onClick={() => handleItemClick(img, i)}>
//                                                 <source src={imageDocumnet} type="video/mp4" />
//                                                 Your browser does not support the video tag.
//                                             </video>
//                                         </Box>
//                                     ) : (
//                                         <img
//                                             className="slider-item"
//                                             src={imageDocumnet}
//                                             alt=""
//                                             onClick={() => handleItemClick(img, i)}
//                                         />
//                                     )}
//                                 </SwiperSlide>
//                             );
//                         })}
//                     </Swiper>
//                     {document[0] && (
//                         <>
//                             <Button
//                                 type="button"
//                                 className="swiper-button-next"
//                                 onClick={handlePrevClick}
//                                 sx={{
//                                     right: '-2%',
//                                     ...buttonStyle,
//                                 }}
//                             />
//                             <Button
//                                 type="button"
//                                 className="swiper-button-prev"
//                                 onClick={handleNextClick}
//                                 sx={{ right: '98% ', ...buttonStyle }}
//                             />
//                         </>
//                     )}
//                 </Box>
//             )}
//             <ServiceEditModal handleClose={handleClose} open={open} url={imageSelectedItem} selectedItem={selectedItem} />
//         </>
//     );
// };

// export default NewServiceEditSwipper;

// const buttonStyle = {
//     position: 'absolute',
//     top: '20rem !important',
//     transform: 'scale(.7)',
//     zIndex: '0',
//     margin: '0 !important',
//     padding: '0 !important',
//     minWidth: '1rem',
//     bgcolor: 'white',

//     '&:hover': {},
//     '& svg': {
//         color: ColorBlack,
//     },
// };
