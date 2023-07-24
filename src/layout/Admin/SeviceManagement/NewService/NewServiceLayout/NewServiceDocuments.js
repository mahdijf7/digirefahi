import React, { useState } from 'react';
import { Box } from '@mui/material';
import { useTranslation } from 'react-i18next';

//styled
import 'assets/style/dashboard.scss';
import ImageIcon from 'assets/icone/svg/Admin/ImageIcon';
import VideoIcon from 'assets/icone/svg/Admin/VideoIcon';
import { ColorBlack, ColorWhite, ColorPrimary, ColorGreyLightDark } from 'assets/theme/color';
import NewServiceSwiper from 'components/Common/Swiper/NewServiceSwiper';
import CustomInputDocument from 'components/Common/Form/CustomInputDocument';

// Accessing the value of CustomInputDocument

const NewServiceDocuments = ({ uploadImage, setUploadImage, onSelect, document, setDocument, ...props }) => {
    const { t } = useTranslation();

    const [selectedImage, setSelectedImage] = useState(null);
    const [selectedVideo, setSelectedVideo] = useState(null);

    const ButtonUpload = {
        mt: '-1.5rem',
        height: '2.8rem !important',
        fontSize: '.9rem',
        width: '100%',
        borderRadius: '.6rem',
        display: 'flex',
        gap: '1.5rem',
        justifyContent: 'center',
        alignItems: 'center',
        color: document[0]?.url ? ColorWhite : ColorBlack,
        backgroundColor: document[0]?.url ? ColorPrimary : ColorGreyLightDark,
        '&:hover': {
            backgroundColor: document[0]?.url ? ColorPrimary : ColorGreyLightDark,
        },
        '& span': {
            display: 'flex',
            '& svg': {
                stroke: document[0]?.url ? ColorWhite : ColorBlack,
            },
        },

        helper: {
            textAlign: 'right',
            top: '2rem',
            left: '-5rem',
            width: '10rem',
            backgroundColor: 'green !important',
        },
    };

    const handleImageSelect = (file) => {
        setSelectedImage(file);
        uploadImage && setUploadImage([...uploadImage, file]);
        !uploadImage && setUploadImage([file]);

        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                const documentItem = {
                    id: Date.now(),
                    type: file.type.includes('video') ? 'video' : 'image',
                    url: reader.result,
                };

                setDocument((prevDocument) => [...prevDocument, documentItem]);
            };
            reader.readAsDataURL(file);

            if (file.type.includes('image')) {
                setSelectedVideo(null);
            } else if (file.type.includes('video')) {
                setSelectedImage(null);
            }
        }
    };

    return (
        <Box>
            <NewServiceSwiper
                uploadImage={uploadImage}
                setUploadImage={setUploadImage}
                setDocument={setDocument}
                document={document}
            />
            <Box mt="2rem" className="flex" gap="5%" justifyContent="space-between">
                <CustomInputDocument sx={ButtonUpload} onSelect={handleImageSelect} accept="image/*" name="images">
                    <span>
                        <ImageIcon />
                    </span>
                    {t('newService.addImage')}
                </CustomInputDocument>
                <CustomInputDocument sx={ButtonUpload} onSelect={handleImageSelect} accept="video/*" name="images">
                    <span>
                        <VideoIcon />
                    </span>
                    {t('newService.addVideo')}
                </CustomInputDocument>
            </Box>
        </Box>
    );
};

export default NewServiceDocuments;
// if (file) {
//   setMultipleImage((prevImages) => {
//       if (prevImages && Array.isArray(prevImages)) {
//           return [...prevImages, file];
//       } else {
//           return [file];
//       }
//   });
