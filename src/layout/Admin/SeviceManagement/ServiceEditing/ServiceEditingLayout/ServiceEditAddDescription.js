import React from 'react';
import { Divider, Box } from '@mui/material';
import { useTranslation } from 'react-i18next';

import Card from 'components/Common/Card/Card';
import CardNewService from 'components/Common/Card/Admin/NewService/CardNewService';
import CustomInputAutosize from 'components/Common/Form/CustomInputAutosize';
import CustomInputRichTextEditor from "components/Common/Form/CustomInputRichTextEditor";

import { theme } from 'assets/theme/default';
const { palette } = theme;

function AddDescription({ autosizeStyle, values }) {
    const { t } = useTranslation();
    return (
        <>
            <CardNewService mb="2rem" title="newService.description">
                {/*<CustomInputAutosize*/}
                {/*    name="long_description"*/}
                {/*    minRows={6}*/}
                {/*    placeholder={t('newService.descriptionP')}*/}
                {/*    sx={autosizeStyle}*/}
                {/*/>*/}
                <CustomInputRichTextEditor
                    name="long_description"
                    placeholder={t('newService.descriptionP')}
                    sx={autosizeStyle}
                />
            </CardNewService>
            <CardNewService mb="2rem" title="newService.terms">
                {/*<CustomInputAutosize name="terms_of_use" minRows={5} placeholder={t('newService.termsP')} sx={autosizeStyle} />*/}
                <CustomInputRichTextEditor
                    name="terms_of_use"
                    placeholder={t('newService.termsP')}
                    sx={autosizeStyle}
                />
            </CardNewService>
        </>
    );
}

export default AddDescription;
