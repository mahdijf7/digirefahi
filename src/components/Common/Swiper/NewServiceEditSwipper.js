import React, { useState, useRef, useEffect } from 'react';
import { Button, IconButton } from '@mui/material';
import { Box } from '@mui/material';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper';

// style
import 'assets/style/dashboard.scss';
import imgPrimary from 'assets/image/Group6370.png';
import { ColorBlack, ColorPrimary } from 'assets/theme/color';
import SlideshowIcon from '@mui/icons-material/Slideshow';
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ServiceEditModal from 'layout/Admin/SeviceManagement/ServiceEditing/ServiceEditingLayout/ServiceEditModal';
import CustomInputDocument from 'components/Common/Form/CustomInputDocument';

const NewServiceEditSwipper = ({ document, setDocument, serviceData, uploadImage, setUploadImage, isDocumentValid }) => {
    const swiperRef = useRef(null);
    const [selectedItemIndex, setSelectedItemIndex] = useState(null);
    const [selectedItem, setSelectedItem] = useState(null);
    const [isHovered, setIsHovered] = useState(false);
    const [open, setOpen] = useState(null);
    const [edit, setEdit] = useState(false);

    const handleClose = () => {
        setOpen(false);
    };

    const handlePrevClick = () => {
        swiperRef.current?.swiper.slidePrev();
    };

    const handleNextClick = () => {
        swiperRef.current?.swiper.slideNext();
    };

    const handleItemClick = (item, i) => {
        setSelectedItem((prev) => item);
        setSelectedItemIndex((prev) => i);
    };

    const handleRemove = () => {
        const filteredData = document.filter((item, i) => selectedItemIndex !== i);
        const filteredUpload = uploadImage.filter((item, i) => selectedItemIndex !== i);
        setUploadImage((prev) => filteredUpload);
        setDocument(filteredData);
        handleItemClick(uploadImage[0], 0);
    };

    const handleImageSelect = (file) => {
        const updatedUploadImage = [...uploadImage];

        updatedUploadImage[selectedItemIndex || 0] = file;

        setUploadImage(() => updatedUploadImage);

        const reader = new FileReader();
        reader.onload = () => {
            const documentItem = {
                id: Date.now(),
                type: file.type.includes('video') ? 'video' : 'image',
                url: reader.result,
                name: file.name,
            };
            const filteredArrayDocument = document.map((item) => {
                if (item === selectedItem) {
                    return documentItem;
                } else {
                    return item;
                }
            });
            setDocument(filteredArrayDocument);
        };
        reader.readAsDataURL(file);
    };

    useEffect(() => {
        document && setSelectedItem(document[0]);
    }, [document]);

    const buttonImageStyle = {
        zIndex: '1000',
        position: 'absolute',
        display: 'flex',
        justifyContent: 'center',
        alignItem: 'center',
        gap: '.5rem',
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

    const findItemIndex = (item) => {
        const index = document.findIndex((element) => element === item);
        setSelectedItemIndex(index);
    };

    const imageSelectedItem = isDocumentValid
        ? selectedItem?.url || process.env.REACT_APP_STORAGE_URL + '/' + selectedItem
        : imgPrimary || selectedItem?.url;

    const selectedVideo = selectedItem?.url || process.env.REACT_APP_STORAGE_URL + '/' + selectedItem;
    const shadow = ' 0px 0px 6px 2px rgba(0, 0, 0, 0.05)';
    const isVideoFile = typeof selectedItem === 'string' && selectedItem?.includes('.mp4');
    return (
        <>
            <Box position="relative">
                {selectedItem && isHovered && (
                    <Box onMouseOver={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)} sx={buttonImageStyle}>
                        <Button onClick={() => setOpen(true)}>
                            <VisibilityIcon />
                            {!edit ? 'مشاهده' : ''}
                        </Button>

                        {!edit ? (
                            <>
                                <Button onClick={() => setEdit(true)}>
                                    <EditIcon />
                                    {'  ویرایش'}
                                </Button>
                            </>
                        ) : (
                            <>
                                <CustomInputDocument
                                    sx={{ padding: '.8rem' }}
                                    onSelect={handleImageSelect}
                                    accept="image/ , video/"
                                    name="images">
                                    <EditIcon />
                                </CustomInputDocument>
                                <Button onClick={() => handleRemove()}>
                                    <DeleteIcon />
                                </Button>
                            </>
                        )}
                    </Box>
                )}
                {selectedItem?.type === 'video' || isVideoFile ? (
                    <video
                        onClick={() => findItemIndex(selectedVideo)}
                        onMouseOver={() => setIsHovered(true)}
                        onMouseLeave={() => setIsHovered(false)}
                        className="img"
                        style={{ height: '17.6rem', boxShadow: shadow }}>
                        <source src={selectedVideo} type="video/mp4" />
                    </video>
                ) : (
                    <img
                        onMouseOver={() => setIsHovered(true)}
                        onMouseLeave={() => setIsHovered(false)}
                        onClick={() => findItemIndex(imageSelectedItem)}
                        style={{ height: '17.6rem', boxShadow: shadow }}
                        className="img"
                        src={imageSelectedItem}
                        alt=""
                    />
                )}
                <Swiper
                    ref={swiperRef}
                    style={{ width: '90%' }}
                    spaceBetween={2}
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
                    {document &&
                        isDocumentValid &&
                        document.map((img, i) => {
                            const imageDocumnet = img?.url || process.env.REACT_APP_STORAGE_URL + '/' + img;
                            return (
                                <SwiperSlide key={i}>
                                    {img?.type === 'video' || (typeof img === 'string' && img?.includes('.mp4')) ? (
                                        <Box position="relative">
                                            <SlideshowIcon sx={{ position: 'absolute', top: '37%', right: '32%' }} />
                                            <video
                                                key={img.id}
                                                className="slider-item"
                                                style={{}}
                                                onClick={() => handleItemClick(img, i)}>
                                                <source src={imageDocumnet} type="video/mp4" />
                                                Your browser does not support the video tag.
                                            </video>
                                        </Box>
                                    ) : (
                                        <img
                                            className="slider-item"
                                            src={imageDocumnet}
                                            alt=""
                                            onClick={() => handleItemClick(img, i)}
                                        />
                                    )}
                                </SwiperSlide>
                            );
                        })}
                </Swiper>
                {document && isDocumentValid && (
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

            <ServiceEditModal handleClose={handleClose} open={open} url={imageSelectedItem} selectedItem={selectedItem} />
        </>
    );
};

export default NewServiceEditSwipper;

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
