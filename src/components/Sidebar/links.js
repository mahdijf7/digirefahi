import AkarIconsDashboard from 'assets/icone/svg/AkarIconsDashboard';
import ManageOrganization from 'assets/icone/svg/AdminSidebar/ManageOrganizations';
import WalletOrganization from 'assets/icone/svg/AdminSidebar/WalletOrganizations';
import ManageEmployees from 'assets/icone/svg/AdminSidebar/ManageEmployees';
import ManageEvents from 'assets/icone/svg/AdminSidebar/ManageEvents';
import ManageTickets from 'assets/icone/svg/AdminSidebar/ManageTickets';
import ManageBanners from 'assets/icone/svg/AdminSidebar/ManageBanners';
import TeenyiconsWalletAltOutline from 'assets/icone/svg/TeenyiconsWalletAltOutline';
import CarbonUserProfile from 'assets/icone/svg/CarbonUserProfile';
import SidebarComments from 'assets/icone/svg/AdminSidebar/SidebarComments';
import SidebarManageServices from 'assets/icone/svg/AdminSidebar/SidebarManageServices';
import SidebarOrganizationWelfareAllocation from 'assets/icone/svg/sidebar/SidebarOrganizationWelfareAllocation';
import SidebarEmployeeWelfareAllocation from 'assets/icone/svg/sidebar/SidebarEmployeeWelfareAllocation';
import SidebarSupplierUsedTicket from 'assets/icone/svg/sidebar/SidebarSupplierUsedTicket';
import { SidebarReportsIcon } from 'assets/icone/svg/sidebar/SidebarReportsIcon';

export default {
    ADMIN: [
        {
            key: 'admin-dashboard',
            title: 'پیشخوان',
            path: '/app/admin/',
            icon: <AkarIconsDashboard />,
        },
        {
            key: 'admin-companies',
            title: 'مدیریت سازمان‌ها',
            path: '/app/admin/companies',
            icon: <ManageOrganization />,
        },
        {
            key: 'admin-employees',
            title: 'مدیریت کارمندان',
            path: '/app/admin/employees',
            icon: <ManageEmployees />,
        },
        {
            key: 'admin-supplier',
            title: 'مدیریت تامین کنندگان',
            path: '/app/admin/suppliers-management',
            icon: <SidebarComments />,
        },
        {
            key: 'admin-services',
            title: 'مدیریت خدمات',
            icon: <SidebarManageServices />,
            startPath: '/app/admin/service-management/',
            children: [
                { key: 'admin-new-service', title: ' تعریف خدمت جدید', path: '/app/admin/service-management/new-service' },
                { key: 'admin-service-list', title: 'لیست خدمات رفاهی', path: '/app/admin/service-management/service-list' },
                { key: 'admin-service-categories', title: 'دسته بندی خدمات', path: '/app/admin/service-management/categories' },
                { key: 'admin-service-filter', title: 'فیلتر خدمات', path: '/app/admin/service-management/service-filter' },
            ],
        },
        {
            key: 'admin-requests',
            title: 'مدیریت درخواستها',
            icon: <SidebarComments />,
            startPath: '/app/admin/management-requests/',
            children: [
                {
                    key: 'admin-service-list',
                    title: 'درخواست افزایش اعتبار',
                    path: '/app/admin/management-requests/credit-requests',
                },
                {
                    key: 'admin-service-list',
                    title: 'درخواست خدمت سازمانی',
                    path: '/app/admin/management-requests/organization-requests',
                },
            ],
        },
        {
            key: 'admin-comments',
            title: 'مدیریت نظرات',
            path: '/app/admin/comments-management',
            icon: <SidebarComments />,
        },
        {
            key: 'admin-banners',
            title: 'مدیریت بنرها',
            path: '/app/admin/management-banner',
            icon: <ManageBanners />,
        },
        {
            key: 'admin-events',
            title: 'مدیریت رویدادها',
            path: '/app/admin/management-events',
            icon: <ManageEvents />,
        },
        {
            key: 'admin-reports',
            title: 'گزارش‌ها',
            icon: <SidebarReportsIcon />,
            startPath: '/app/admin/reports/orders-history/',
            children: [
                {
                    key: 'admin-reports-orders',
                    title: 'تاریخچه سفارشات',
                    path: '/app/admin/reports/orders-history/',
                },
            ],
        },
        {
            key: 'organization-support',
            title: 'پشتیبانی',
            path: '/app/admin/management-tickets',
            icon: <ManageTickets />,
        },
    ],
    COMPANY: [
        {
            key: 'organization-dashboard',
            title: 'پیشخوان',
            path: '/app/organization/dashboard',
            icon: <AkarIconsDashboard />,
        },
        {
            key: 'organization-employees',
            title: 'مدیریت سازمان',
            icon: <ManageOrganization />,
            startPath: '/app/organization/manage/',
            children: [
                { key: 'organization-manage-chart', title: 'مدیریت چارت سازمانی', path: '/app/organization/manage/chart' },
                { key: 'organization-manage-group', title: ' مدیریت گروه‌ها', path: '/app/organization/manage/groups' },
                { key: 'organization-manage-employees', title: 'مدیریت کارمند', path: '/app/organization/manage/employees' },
            ],
        },
        {
            key: 'organization-services',
            title: 'مدیریت خدمات',
            icon: <ManageOrganization />,
            startPath: '/app/organization/services/',
            children: [
                { key: 'organization-services-basic', title: 'خدمات عمومی', path: '/app/organization/services/basic' },
                {
                    key: 'organization-services-basic-filter',
                    title: 'فیلتر خدمات عمومی',
                    path: '/app/organization/services/basic-service-filter',
                },
                {
                    key: 'organization-services-request',
                    title: 'خدمات سازمانی',
                    path: '/app/organization/services/service-requests',
                },
            ],
        },
        {
            key: 'organization-allocation',
            title: 'تخصیص رفاهی',
            icon: <SidebarOrganizationWelfareAllocation />,
            path: '/app/organization/allocation',
        },
        {
            key: 'organization-wallet',
            title: 'کیف پول',
            icon: <WalletOrganization />,
            startPath: '/app/organization/wallet/',
            children: [
                {
                    key: 'organization-wallet-creditRequests',
                    title: 'درخواست افزایش اعتبار',
                    path: '/app/organization/wallet/creditRequests',
                },
                {
                    key: 'organization-wallet-creditReports',
                    title: 'گزارش کیف پول',
                    path: '/app/organization/wallet/creditReports',
                },
            ],
        },
        {
            key: 'organization-banners',
            title: 'مدیریت بنرها',
            path: '/app/organization/management-banner',
            icon: <ManageBanners />,
        },
        {
            key: 'organization-events',
            title: 'مدیریت رویدادها',
            path: '/app/organization/management-events',
            icon: <ManageEvents />,
        },
        {
            key: 'admin-reports',
            title: 'گزارش‌ها',
            icon: <SidebarReportsIcon />,
            startPath: '/app/organization/reports/orders-history/',
            children: [
                {
                    key: 'admin-reports-orders',
                    title: 'تاریخچه سفارشات',
                    path: '/app/organization/reports/orders-history/',
                },
            ],
        },
        {
            key: 'organization-support',
            title: 'پشتیبانی',
            path: '/app/organization/management-tickets',
            icon: <ManageTickets />,
        },
    ],
    EMPLOYEE: [
        {
            key: 'employee-dashboard',
            title: 'پیشخوان',
            path: '/app/dashboard/',
            icon: <AkarIconsDashboard />,
        },
        {
            key: 'employee-organization-services',
            title: 'خدمات رفاهی',
            icon: <SidebarEmployeeWelfareAllocation />,
            path: '/app/dashboard/services/',
        },
        {
            key: 'employee-my-company-services',
            title: 'خدمات رفاهی من',
            icon: <CarbonUserProfile />,
            path: '/app/dashboard/services/my/',
        },
        {
            key: 'employee-wallet',
            title: 'کیف پول من',
            icon: <TeenyiconsWalletAltOutline />,
            path: '/app/dashboard/wallet/',
        },
        {
            key: 'organization-support',
            title: 'پشتیبانی',
            path: '/app/dashboard/management-tickets',
            icon: <ManageTickets />,
        },
    ],
    SUPPLIER: [
        {
            key: 'supplier-dashboard',
            title: 'پیشخوان',
            path: '/app/supplier/dashboard/',
            icon: <AkarIconsDashboard />,
        },
        {
            key: 'supplier-used-tickets',
            title: 'بلیط های استفاده شده',
            icon: <SidebarSupplierUsedTicket />,
            path: '/app/supplier/used-tickets',
        },
        {
            key: 'supplier-my-company-services',
            title: 'خدمات رفاهی من',
            icon: <CarbonUserProfile />,
            path: '/app/supplier/my-services',
        },
        {
            key: 'supplier-support',
            title: 'پشتیبانی',
            path: '/app/supplier/management-tickets',
            icon: <ManageTickets />,
        },
    ],
};
