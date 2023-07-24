import { useState } from 'react';
import { Box, Grid } from '@mui/material';
import { useParams } from 'react-router-dom';

// Components
import DashboardCard from 'components/Common/Card/DashboardCard';
import Breadcrumb from 'components/new/shared/BreadCrumb/Index';
import DTabs from 'components/new/shared/DTabs/DTabs';
import DTabsPanel from 'components/new/shared/DTabs/DTabsPanel';
import Groups from 'components/new/pages/admin/organizationDetail/groups';
import Employees from 'components/new/pages/admin/organizationDetail/employees';
import Transactions from 'components/new/pages/admin/organizationDetail/transactions';
import AllocatedService from 'components/new/pages/admin/organizationDetail/AllocatedService';
import BannerService from 'components/new/pages/admin/organizationDetail/BannerService';
import Chart from 'components/new/pages/admin/organizationDetail/chart';
import WalletService from 'components/new/pages/admin/organizationDetail/WalletService';
import EditAccount from 'components/new/pages/admin/organizationDetail/account';
import LegalDetails from 'components/new/pages/admin/organizationDetail/LegalDetails';

const breadCrumbLinks = [
    { path: '/app/admin/', title: 'پیشخوان' },
    { path: '/app/admin/companies/', title: 'مدیریت سازمان' },
    {
        title: 'ویرایش سازمان',
    },
];

const Info = () => {
    const [activeTabId, setActiveTabId] = useState(1);
    const { companyId } = useParams();
    const tabs = [
        { id: 1, title: ' مشخصات حقوقی' },
        { id: 2, title: 'ساختار سازمانی' },
        { id: 3, title: 'گروه‌ها' },
        { id: 4, title: 'کارمندان' },
        { id: 5, title: 'کیف پول' },
        { id: 6, title: ' تراکنش‌ها' },
        { id: 7, title: ' بنر‌ها' },
        { id: 8, title: ' ویرایش حساب کاربری' },
        { id: 9, title: ' خدمات تخصیص یافته' },
    ];

    const tabChangedHandler = (event, newValue) => {
        setActiveTabId(newValue);
    };

    return (
        <DashboardCard pt="2rem">
            <Breadcrumb links={breadCrumbLinks} />

            <Box sx={boxStyles} position="relative">
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <DTabs activeTabId={activeTabId} tabs={tabs} onTabChange={tabChangedHandler} />
                        <DTabsPanel value={1} index={activeTabId}>
                            <LegalDetails companyId={companyId} />
                        </DTabsPanel>
                        <DTabsPanel value={2} index={activeTabId}>
                            <Chart />
                        </DTabsPanel>
                        <DTabsPanel value={3} index={activeTabId}>
                            <Groups />
                        </DTabsPanel>
                        <DTabsPanel value={4} index={activeTabId}>
                            <Employees />
                        </DTabsPanel>
                        <DTabsPanel value={5} index={activeTabId}>
                            <WalletService />
                        </DTabsPanel>
                        <DTabsPanel value={6} index={activeTabId}>
                            <Transactions />
                        </DTabsPanel>
                        <DTabsPanel value={7} index={activeTabId}>
                            <BannerService />
                        </DTabsPanel>
                        <DTabsPanel value={8} index={activeTabId}>
                            <EditAccount />
                        </DTabsPanel>
                        <DTabsPanel value={9} index={activeTabId}>
                            <AllocatedService />
                        </DTabsPanel>
                    </Grid>
                </Grid>
            </Box>
        </DashboardCard>
    );
};
const boxStyles = {
    backgroundColor: '#fff',
    borderRadius: '14px',
    boxShadow: '0px 0px 12px rgba(0, 0, 0, 0.05)',
    marginTop: '30px',
    padding: '27px 30px 30px 36px',
};
export default Info;
