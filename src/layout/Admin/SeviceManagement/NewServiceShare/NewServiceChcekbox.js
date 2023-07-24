import React from 'react';
import { Box, Typography, Divider, FormControlLabel, Checkbox } from '@mui/material';
import { useTranslation } from 'react-i18next';

import Card from 'components/Common/Card/Card';

import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

function NewServiceChcekbox({ setType, type }) {
    const { t } = useTranslation();
    return (
        <>
            <Card mb="2rem" minHeight="16.2rem">
                <Box className="flex" justifyContent="space-between" p="1rem 3rem ">
                    <Typography variant="h4">{t('newService.chooseService')}</Typography>
                    <span className="flex">
                        <KeyboardArrowDownIcon sx={{ fontSize: '3rem' }} />
                    </span>
                </Box>
                <Divider />
                <Box mt="1rem">
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={type.company}
                                onChange={() =>
                                    setType((prev) => {
                                        return {
                                            company: !prev.company,
                                            basic: !prev.basic,
                                        };
                                    })
                                }
                                sx={chekboxStyle}
                            />
                        }
                        label={t('newService.organizationalService')}
                    />
                </Box>
                <Box>
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={type.basic}
                                onChange={() =>
                                    setType((prev) => {
                                        return {
                                            company: !prev.company,
                                            basic: !prev.basic,
                                        };
                                    })
                                }
                                sx={chekboxStyle}
                            />
                        }
                        label={t('newService.publicService')}
                    />
                </Box>
            </Card>
        </>
    );
}

const chekboxStyle = {
    '& .MuiSvgIcon-root': { fontSize: '2.4rem' },
    '&.Mui-checked': {
        color: 'primary.main',
    },
};

export default NewServiceChcekbox;
