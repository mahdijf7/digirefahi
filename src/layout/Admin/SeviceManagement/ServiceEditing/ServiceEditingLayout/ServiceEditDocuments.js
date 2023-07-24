import React, { useEffect, useState } from 'react';
import { Box } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useFormikContext } from 'formik';

//styled
import 'assets/style/dashboard.scss';
import ImageIcon from 'assets/icone/svg/Admin/ImageIcon';
import VideoIcon from 'assets/icone/svg/Admin/VideoIcon';
import { ColorBlack, ColorWhite, ColorPrimary, ColorGreyLightDark } from 'assets/theme/color';
// import NewServiceSwiper from 'components/Common/Swiper/NewServiceSwiper';
import CustomInputDocument from 'components/Common/Form/CustomInputDocument';
import NewServiceEditSwipper from 'components/Common/Swiper/NewServiceEditSwipper';

const ServiceEditDocuments = ({ uploadImage, setUploadImage, serviceData, ...props }) => {
    const formik = useFormikContext();
    const customInputDocumentValue = formik.values.images;

    const { t } = useTranslation();

    const [document, setDocument] = useState([]);
    const isDocumentValid = document?.length > 0;

    const ButtonUpload = {
        height: '2.8rem !important',
        fontSize: '.9rem',
        width: '100%',
        borderRadius: '.6rem',
        display: 'flex',
        gap: '1.5rem',
        justifyContent: 'center',
        alignItems: 'center',
        color: isDocumentValid ? ColorWhite : ColorBlack,
        backgroundColor: isDocumentValid ? ColorPrimary : ColorGreyLightDark,
        '&:hover': {
            backgroundColor: isDocumentValid ? ColorPrimary : ColorGreyLightDark,
        },
        '& span': {
            display: 'flex',
            '& svg': {
                stroke: isDocumentValid ? ColorWhite : ColorBlack,
            },
        },
    };

    const handleImageSelect = (file) => {
        setUploadImage((prev) => [...prev, file]);
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                const documentItem = {
                    id: Date.now(),
                    type: file.type.includes('video') ? 'video' : 'image',
                    url: reader.result,
                };
                setDocument([...document, documentItem]);
            };
            reader.readAsDataURL(file);
        }
    };

    useEffect(() => {
        if (serviceData) {
            setDocument(serviceData.images);
        }
    }, []);

    return (
        <Box>
            <NewServiceEditSwipper
                isDocumentValid={isDocumentValid}
                uploadImage={uploadImage}
                setUploadImage={setUploadImage}
                document={document}
                setDocument={setDocument}
                serviceData={serviceData}
            />

            <Box mt="1rem" className="flex" gap="5%" justifyContent="space-between">
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

export default ServiceEditDocuments;
