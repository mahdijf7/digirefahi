import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Typography, Box, Grid } from '@mui/material';
import StorefrontIcon from '@mui/icons-material/Storefront';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import LanguageIcon from '@mui/icons-material/Language';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import TocOutlinedIcon from '@mui/icons-material/TocOutlined';

// Components
import DTabs from 'components/new/shared/DTabs/DTabs';
import DTabsPanel from 'components/new/shared/DTabs/DTabsPanel';
import DBox from 'components/new/shared/DBox';
import { DServiceDetailComments } from '../DServiceDetailComments';

const DServiceDetailTabs = ({ service }) => {
    const { long_description, terms_of_use, content } = service;
    const aboutSupplier = service.about_supplier || service.supplier;
    const [activeTabId, setActiveTabId] = useState(1);
    const { t } = useTranslation();
    const tabs = [
        { id: 1, title: t('description') },
        { id: 2, title: t('termsOfUse') },
        { id: 3, title: t('address') },
        { id: 4, title: t('commentsTitle'), hide: !service.has_order },
        { id: 5, title: t('aboutSupplier') },
    ];

    const tabChangedHandler = (event, newValue) => {
        setActiveTabId(newValue);
    };

    return (
        <DBox sx={{ p: '32px' }}>
            <DTabs underlineStyle activeTabId={activeTabId} tabs={tabs} onTabChange={tabChangedHandler} />

            <DTabsPanel value={1} index={activeTabId}>
                <Box sx={{ pt: '18px' }}>
                    <Typography color="text.main" sx={{ fontSize: '13px', lineHeight: '26px', textAlign: 'justify' }}>
                        <div dangerouslySetInnerHTML={{ __html: content?.long_description || long_description }} />
                    </Typography>
                </Box>
            </DTabsPanel>
            <DTabsPanel value={2} index={activeTabId}>
                <Box sx={{ pt: '18px' }}>
                    <Typography color="text.main" sx={{ fontSize: '13px', lineHeight: '26px', textAlign: 'justify' }}>
                        <div dangerouslySetInnerHTML={{ __html: content?.terms_of_use || terms_of_use }} />
                    </Typography>
                </Box>
            </DTabsPanel>
            <DTabsPanel value={3} index={activeTabId}>
                <Grid container sx={{ pt: '18px' }}>
                    <Grid
                        item
                        xs={12}
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            borderBottom: '1px solid rgba(238, 238, 238, 1)',
                            p: '14px 0',
                        }}>
                        <StorefrontIcon sx={{ color: 'rgba(8, 119, 189, 1)', ml: '8px', fontSize: '20px' }} />
                        <Typography color="primary" sx={{ fontSize: '20px', fontWeight: 600 }}>
                            {service?.supplier?.name ? service.supplier.name : service.supplier}
                        </Typography>
                    </Grid>
                    {service?.address &&
                        service?.address.map((address) => (
                            <Grid
                                item
                                xs={12}
                                sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    p: '14px 0',
                                    borderBottom: '1px solid rgba(238, 238, 238, 1)',
                                }}>
                                <LocationOnOutlinedIcon sx={{ color: 'rgba(8, 119, 189, 1)', ml: '8px', fontSize: '20px' }} />
                                <Typography color="common.black" component="span" sx={{ fontSize: '10px' }}>
                                    {address.description}
                                </Typography>
                                &nbsp;-&nbsp;
                                <Typography color="common.black" component="span" sx={{ fontSize: '10px' }}>
                                    {address.phone}
                                </Typography>
                            </Grid>
                        ))}
                </Grid>
            </DTabsPanel>
            {service.has_order ? (
                <DTabsPanel value={4} index={activeTabId}>
                    <DServiceDetailComments />
                </DTabsPanel>
            ) : (
                ''
            )}

            <DTabsPanel value={5} index={activeTabId}>
                <Grid container sx={{ pt: '18px' }}>
                    <Grid
                        item
                        xs={12}
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            borderBottom: '1px solid rgba(238, 238, 238, 1)',
                            p: '14px 0',
                        }}>
                        <StorefrontIcon sx={{ color: 'rgba(8, 119, 189, 1)', ml: '8px', fontSize: '20px' }} />
                        <Typography color="primary" sx={{ fontSize: '20px', fontWeight: 600 }}>
                            {service?.supplier?.name ? service.supplier.name : service.supplier}
                        </Typography>
                    </Grid>

                    <Grid
                        item
                        xs={12}
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            p: '14px 0',
                            borderBottom: '1px solid rgba(238, 238, 238, 1)',
                        }}>
                        <Box sx={{ display: 'flex', alifnItems: 'center', gap: '10px', width: '120px' }}>
                            <TocOutlinedIcon sx={{ color: 'rgba(8, 119, 189, 1)', fontSize: '20px' }} />
                            <Typography> خدمات:</Typography>
                        </Box>
                        <Typography color="common.black" component="span" sx={{ fontSize: '10px' }}>
                            {aboutSupplier?.services ? aboutSupplier.services : '---'}
                        </Typography>
                    </Grid>
                    <Grid
                        item
                        xs={12}
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            p: '14px 0',
                            borderBottom: '1px solid rgba(238, 238, 238, 1)',
                        }}>
                        <Box sx={{ display: 'flex', alifnItems: 'center', gap: '10px', width: '120px' }}>
                            <DescriptionOutlinedIcon sx={{ color: 'rgba(8, 119, 189, 1)', fontSize: '20px' }} />
                            <Typography> توضیحات:</Typography>
                        </Box>
                        <Typography color="common.black" component="span" sx={{ fontSize: '10px' }}>
                            {aboutSupplier?.description ? aboutSupplier.description : '---'}
                        </Typography>
                    </Grid>
                    <Grid
                        item
                        xs={12}
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            p: '14px 0',
                            borderBottom: '1px solid rgba(238, 238, 238, 1)',
                        }}>
                        <Box sx={{ display: 'flex', alifnItems: 'center', gap: '10px', width: '120px' }}>
                            <LanguageIcon sx={{ color: 'rgba(8, 119, 189, 1)', fontSize: '20px' }} />
                            <Typography> سایت:</Typography>
                        </Box>

                        <Typography color="common.black" component="span" sx={{ fontSize: '10px' }}>
                            {aboutSupplier?.website ? (
                                <a href={aboutSupplier?.website} target="_blank">
                                    {aboutSupplier?.website}
                                </a>
                            ) : (
                                '---'
                            )}
                        </Typography>
                    </Grid>
                </Grid>
            </DTabsPanel>
        </DBox>
    );
};

export default DServiceDetailTabs;
