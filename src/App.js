import React, { useContext, useEffect } from 'react';
import { Route, Routes, Navigate, Outlet, useLocation, useSearchParams } from 'react-router-dom';

// Contexts
import AuthContext from 'store/Auth-context';

// Layout
import Layout from './layout';
import RouteGuard from './route-guard';
// Employee Pages
import FirstLoginStepsControl from './components/Login/FirstLogin';
import EmployeeDashboard from './pages/dashboard';
import EmployeeServices from 'pages/dashboard/services';
import EmployeeServiceDetail from 'pages/dashboard/services/Detail';
import EmployeeServicePayment from 'pages/dashboard/services/Payment';
import EmployeePaymentResult from 'pages/dashboard/services/PaymentResult';
import EmployeeMyServices from 'pages/dashboard/services/My';
import EmployeeServicesCategories from 'pages/dashboard/services/Categories';
import EmployeeServicesSuppliers from 'pages/dashboard/services/Suppliers';
import EmployeeServicesCompany from 'pages/dashboard/services/Company';

import Profile from './pages/dashboard/Profile/index';
import UserAccount from './pages/dashboard/user-account/index';
import AdminPage from './layout/Dashboard/Profile/Admin';
import Wallet from './pages/dashboard/wallet/index';
import OrganizationListServices from './pages/admin/RequestsManagement/ServicesRequests';

// Organization Pages
import OrganizationUserAccount from './pages/organization/Profile/UserAccount';
// import OrganizationGroups from 'pages/organization/Groups';
import TempOrganizationEmployees from 'pages/organization/Employees';
import OrganizationBasicServices from 'pages/organization/services/Basic';
import OrganizationService from 'pages/organization/services/Detail';
import OrganizationChart from 'pages/organization/Chart';
import OrganizationDashboard from 'pages/organization/Dashboard';
import CreditReports from 'pages/organization/wallet/CreditReports';
import CreditRequests from 'pages/organization/wallet/CreditRequests';
import AdminCreditRequests from 'pages/admin/RequestsManagement/CreditRequests';
import OrganizationGroups from 'pages/organization/Groups';
import ManagementBanner from 'pages/organization/management-banner/index';
import OrganizationAllocation from 'pages/organization/Allocation';
import EventManagement from 'pages/organization/EventManagement';
import OrganizationServicesRequest from 'pages/organization/services/ServicesRequests';
import OrganizationBasicServiceFilter from 'pages/organization/services/ServiceFilter';
import OrganizationServiceDetail from 'pages/organization/services/OrganizationServiceDetail';
import OrganizationOrderHistory from 'pages/organization/Reports/OrderHistory/OrganizationOrderHistory';

// Admin Pages
// import ManegementBanner from './pages/admin/management-banner/index';
import AdminDashboard from 'pages/admin/Dashboard';
import NewService from './pages/admin/service-management/new-service';
import AdminBanners from 'pages/admin/banners';
// import CommentsManagement from 'pages/admin/CommentsManagement';
import ProfileEdit from 'pages/organization/EditProfile';
import RequestsManagement from 'pages/admin/RequestsManagement/index';
import EventsManagement from 'pages/admin/EventsManagement';
import TempAdminEmployees from 'pages/admin/Employees';
import ServiceList from './pages/admin/service-management/service-list';
import ServiceEditing from './pages/admin/service-management/service-editing/index';
import ServiceFilterPage from 'pages/admin/service-management/service-filter';
import AdminCompanies from 'pages/admin/companies/Index';
import AdminCompaniesInfo from 'pages/admin/companies/Info';
import AdminCategories from 'pages/admin/service-management/categories';
import AdminSuppliers from 'pages/admin/supplierManagement';
import AdminComments from 'pages/admin/commentManagement';
import AdminAccount from 'pages/admin/Account';
import OrdersHistory from 'pages/admin/Reports/OrdersHistory/orders-history';

//supplier pages
import SupplierDashboard from 'pages/supplier/Dashboard';
import SupplierTickets from 'pages/supplier/ticket/Tickets';
import SupplierTicket from 'pages/supplier/ticket/Ticket';
import ServiceDetail from 'pages/supplier/myServices/ServiceDetail';
import SupplierAccount from 'pages/supplier/Account';

// Public Pages
import Login from './pages/login';
import NotFound from './pages/404';
import Error500 from './pages/500';
import ForgetPassword from './pages/forget-password/index';
import { CircularProgress, Box } from '@mui/material';
import Tickets from './pages/organization/ticket/Tickets';
import Ticket from './pages/organization/ticket/Ticket';
import AdminTickets from './pages/admin/ticket/Tickets';
import AdminTicket from './pages/admin/ticket/Ticket';
import EmployeeTickets from './pages/dashboard/ticket/Tickets';
import EmployeeTicket from './pages/dashboard/ticket/Ticket';
import UsedTickets from './pages/supplier/usedTickets/UsedTickets';
import OrganizationServiceDetail_Org from './pages/organization/services/OrganizationServiceDetail';
import ServiceFilter from './components/Common/Filter/ServiceFilter';
import Services from './pages/supplier/myServices/Services';

const App = () => {
    const [searchParams] = useSearchParams();
    const { role, isLoading, account } = useContext(AuthContext);
    const isNotNewUser = parseInt(localStorage.getItem('floginActiveStep')) === 0;

    const isEmployee = role === 'EMPLOYEE';
    const isAdmin = role === 'ADMIN';
    const isOrganization = role === 'COMPANY';
    const isSupplier = role === 'SUPPLIER';
    const redirectionUrls = {
        ADMIN: '/app/admin/',
        COMPANY: '/app/organization/dashboard/',
        SUPPLIER: '/app/supplier/dashboard/',
        EMPLOYEE: '/app/dashboard/',
    };

    function LoggedInOnly() {
        const isAuthenticated = isSupplier || isOrganization || isEmployee || isAdmin;

        return isAuthenticated ? <Layout /> : <Navigate replace to="/login" />;
    }

    return isLoading ? (
        <Box sx={{ display: 'flex', alignItems: 'center', height: '100vh', justifyContent: 'center', width: '100%' }}>
            <CircularProgress />
        </Box>
    ) : (
        <Routes>
            <Route path="/" element={<Navigate replace to={redirectionUrls[role] || '/login/'} />} />
            {/* <Route path="app" element={<Navigate replace to={redirectionUrls[role]} />} /> */}

            <Route path="/app" element={<RouteGuard checkWelcome={false} Component={Layout} />}>
                <Route path="welcome" element={<FirstLoginStepsControl />} />
                <Route path="dashboard" element={<RouteGuard Component={EmployeeDashboard} />} />
                <Route path="dashboard/services" element={<RouteGuard Component={EmployeeServices} />} />
                <Route path="dashboard/services/:serviceId" element={<RouteGuard Component={EmployeeServiceDetail} />} />
                <Route path="dashboard/services/:serviceId/payment" element={<RouteGuard Component={EmployeeServicePayment} />} />
                <Route path="dashboard/services/payment/result" element={<RouteGuard Component={EmployeePaymentResult} />} />
                <Route path="dashboard/services/my" element={<RouteGuard Component={EmployeeMyServices} />} />
                <Route path="dashboard/services/categories" element={<RouteGuard Component={EmployeeServicesCategories} />} />
                <Route path="dashboard/services/suppliers" element={<RouteGuard Component={EmployeeServicesSuppliers} />} />
                <Route path="dashboard/services/company" element={<RouteGuard Component={EmployeeServicesCompany} />} />
                <Route path="dashboard/profile" element={<RouteGuard Component={Profile} />} />
                <Route path="dashboard/user-account" element={<RouteGuard Component={UserAccount} />} />
                <Route path="dashboard/profile-admin" element={<RouteGuard Component={AdminPage} />} />
                <Route path="dashboard/wallet" element={<RouteGuard Component={Wallet} />} />
                {/* <Route path="dashboard/supplier-services" element={<SupplierServices />} /> */}
                <Route path="dashboard/management-tickets" element={<RouteGuard Component={EmployeeTickets} />} />
                <Route path="dashboard/management-tickets/:ticketId" element={<RouteGuard Component={EmployeeTicket} />} />
            </Route>

            <Route path="/app/organization" element={<RouteGuard checkWelcome={false} Component={Layout} />}>
                <Route path="dashboard" element={<OrganizationDashboard />} />

                <Route path="user-account" element={<OrganizationUserAccount />} />
                <Route path="profile-edit" element={<ProfileEdit />} />
                <Route path="manage/employees" element={<TempOrganizationEmployees />} />
                <Route path="manage/chart" element={<OrganizationChart />} />
                <Route path="manage/groups" element={<OrganizationGroups />} />
                <Route path="management-banner" element={<ManagementBanner />} />
                <Route path="management-events" element={<EventManagement />} />
                <Route path="services/basic" element={<OrganizationBasicServices />} />
                <Route path="services/:serviceId" element={<OrganizationService />} />
                <Route path="wallet/creditReports" element={<CreditReports />} />
                <Route path="wallet/creditRequests" element={<CreditRequests />} />
                <Route path="management-tickets" element={<Tickets />} />
                <Route path="management-tickets/:ticketId" element={<Ticket />} />
                <Route path="services/service-requests" element={<OrganizationServicesRequest />} />
                <Route path="services/basic-service-filter" element={<OrganizationBasicServiceFilter />} />
                <Route path="services/service-requests/:serviceId" element={<OrganizationServiceDetail_Org />} />
                <Route path="allocation" element={<OrganizationAllocation />} />
                <Route path="reports/orders-history" element={<OrganizationOrderHistory />} />
            </Route>

            <Route path="/app/admin" element={<RouteGuard checkWelcome={false} Component={Layout} />}>
                <Route index={true} element={<AdminDashboard />} />
                <Route path="account" element={<AdminAccount />} />
                <Route path="service-management" element={<NewService />} />
                <Route path="service-management/new-service" element={<NewService />} />
                <Route path="service-management/service-list" element={<ServiceList />} />
                <Route path="service-management/service-filter" element={<ServiceFilterPage />} />
                <Route path="service-management/service-list/service-editing/:id" element={<ServiceEditing />} />
                <Route path="management-banner" element={<AdminBanners />} />
                <Route path="management-requests/organizational-service-request" element={<RequestsManagement />} />

                <Route path="management-events" element={<EventsManagement />} />
                <Route path="suppliers-management" element={<AdminSuppliers />} />
                <Route path="comments-management" element={<AdminComments />} />
                <Route path="companies" element={<AdminCompanies />} />
                <Route path="companies/:companyId" element={<AdminCompaniesInfo />} />
                <Route path="employees" element={<TempAdminEmployees />} />
                <Route path="service-management/categories" element={<AdminCategories />} />
                <Route path="management-requests/credit-requests" element={<AdminCreditRequests />} />
                <Route path="management-tickets" element={<AdminTickets />} />
                <Route path="management-tickets/:ticketId" element={<AdminTicket />} />
                <Route path="management-requests/organization-requests" element={<OrganizationListServices />} />
                <Route path="reports/orders-history" element={<OrdersHistory />} />
            </Route>

            <Route path="/app/supplier" element={<RouteGuard checkWelcome={false} Component={Layout} />}>
                <Route path="dashboard" element={<SupplierDashboard />} />
                <Route path="used-tickets" element={<UsedTickets />} />
                <Route path="management-tickets" element={<SupplierTickets />} />
                <Route path="my-services" element={<Services />} />
                <Route path="management-tickets/:ticketId" element={<SupplierTicket />} />
                <Route path="my-services/:serviceId" element={<ServiceDetail />} />
                <Route path="account" element={<SupplierAccount />} />
            </Route>

            {/* <Route path="/admin" element={<PrivateRoute />}>
             <Route path="employees" element={<TempAdminEmployees />} />
            </Route>
            <Route path="/organization" element={<PrivateRoute />}>
                <Route path="groups" element={<OrganizationGroups />} />
                <Route path="employees" element={<TempOrganizationEmployees />} />
            </Route> */}

            {/* {others} */}
            <Route path="login" element={account ? <Navigate replace to={redirectionUrls[role]} /> : <Login />} />
            <Route path="/forget-password" element={<ForgetPassword />} />

            <Route path="*" element={<NotFound />} />
            <Route path="/500" element={<Error500 />} />
        </Routes>
    );
};
export default App;
