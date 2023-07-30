import { useRef, useState, memo } from 'react';
import { useTranslation } from 'react-i18next';
import { Grid, Typography, Box } from '@mui/material';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

// Components
import DAutoComplete from 'components/new/shared/Form/DAutoComplete';
import CustomInputBase from 'components/Common/Form/CustomInputBase';
import JalaliDatePicker from 'components/Common/Form/JalaliDatePicker';
import CustomCheckbox from 'components/Common/Form/CustomChekbox';

// Assets
import theme from 'assets/theme';

const OrgAllocateCreditCategory = memo(({ baseName, disableDelete, budget, onDelete }) => {
    const { t } = useTranslation();
 

    return (
        <Grid item xs={12}>
            <Grid container spacing={2}>
                <Grid item xs={6} sm={2.5}>
                    <DAutoComplete
                        key={`${baseName}category`}
                        name={`${baseName}category`}
                        formControlStyle={{ height: '42px' }}
                        isAsync
                        searchOnType
                        callOnOpen
                        apiPath="company/categories"
                        apiStaticParams={{all: 1}}
                        buttonProps={{ label: 'انتخاب دسته‌بندی' }}
                        placeholder=" دسته‌بندی"
                        weight 
                    />
                </Grid>

                <Grid item xs={2.5}>
                    <CustomInputBase placeholder="لطفا مبلغ را وارد نمایید (تومان)" hasDefaultStyle name={`${baseName}amount`} />
                </Grid>

                <Grid item xs={7}>
                    <Box sx={{ display: 'flex' }}>
                        {/* <Box sx={{ display: 'flex', flex: 1, gap: '30px', alignItems: 'center' }}>
                            <CustomCheckbox
                                sx={{ mr: 0, whiteSpace: 'noWrap' }}
                                name={`${baseName}hasExpiration`}
                                label={t('newService.noExpiration')}
                            />

                            <JalaliDatePicker
                                disabled={credit.hasExpiration}
                                height="42px"
                                name={`${baseName}expiration`}
                                placeholder={t('newService.validityDate')}
                                sx={{
                                    height: '42px !important',
                                    '& .MuiOutlinedInput-root': {
                                        height: '42px !important',
                                    },
                                }}
                            />
                        </Box> */}

                        <Box
                            sx={{
                                border: `1px solid ${theme.main.palette.primary.main}`,
                                borderRadius: '8px',
                                color: theme.main.palette.primary.main,
                                height: '42px',
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                justifyContent: 'center',
                                cursor: disableDelete ? 'initial' : 'pointer',
                                ml: 'auto',
                                flex: '0 0 58px',
                                opacity: disableDelete ? 0.5 : 1,
                            }}
                            onClick={() => !disableDelete && onDelete()}>
                            <DeleteOutlineIcon />
                            <Typography sx={{ fontSize: '9px', fontWeight: 600, lineHeight: '16px' }}>
                                {t('deleteRow')}
                            </Typography>
                        </Box>
                    </Box>
                </Grid>
            </Grid>
        </Grid>
    );
});

export { OrgAllocateCreditCategory };
