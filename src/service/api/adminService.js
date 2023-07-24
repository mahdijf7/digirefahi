import useFetch from '../index';

const URL_PREFIX = '/admin/';

class adminService {
    newServiceCategory(id) {
        return useFetch.get(`${URL_PREFIX}categories${id ? `?parent_id=${id}&` : ''}`);
    }

    employees() {
        return useFetch.get(`${URL_PREFIX}employees`);
    }
    getEmployeeById(employeeId) {
        return useFetch.get(`${URL_PREFIX}employees/${employeeId}`);
    }
    getEmployeeTransactions(employeeId, page) {
        return useFetch.get(`${URL_PREFIX}employees/${employeeId}?tab=orders&page=${page}`);
    }
    getCompanies(filters, headers) {
        return useFetch.get(`${URL_PREFIX}companies?${filters}`, headers);
    }
    getCompanyGroups(companyId, page) {
        return useFetch.get(`${URL_PREFIX}groups?page=${page}&company_id=${companyId}`);
    }
    deleteCompanyGroup(groupId) {
        return useFetch.delete(`${URL_PREFIX}groups/${groupId}`);
    }
    getEmployees(page) {
        return useFetch.get(`${URL_PREFIX}employees?page=${page}`);
    }
    getEmployeesData(queryParams, headers) {
        return useFetch.get(`${URL_PREFIX}employees?${queryParams}`, { headers });
    }
    saveGroup(data) {
        return useFetch.post(`${URL_PREFIX}groups?${data}`);
    }
    changeGroupStatus(groupId, status) {
        return useFetch.put(`${URL_PREFIX}groups/${groupId}?status=${status}`);
    }
    getCompanyEmployees(queryParams) {
        return useFetch.get(`${URL_PREFIX}employees?${queryParams}`);
    }
    getChart(filters) {
        return useFetch.get(`${URL_PREFIX}charts?${filters}`);
    }
    getSuppliers(queryParams) {
        return useFetch.get(`${URL_PREFIX}suppliers?${queryParams}`);
    }
    getSupplier({ id, tab }, headers) {
        return useFetch.get(`${URL_PREFIX}suppliers/${id}?tab=${tab}`, headers);
    }
    createSupplier({ data }) {
        return useFetch.post(`${URL_PREFIX}suppliers`, data);
    }
    getComments(queryParams) {
        return useFetch.get(`${URL_PREFIX}comments?${queryParams}`);
    }
    updateComment(id, status) {
        return useFetch.post(`${URL_PREFIX}comments/${id}?status=${status}&_method=put`);
    }
    createCompany(queryParams) {
        return useFetch.post(`${URL_PREFIX}companies?${queryParams}`);
    }
    updateSupplier(data, supplierId) {
        return useFetch.post(`${URL_PREFIX}suppliers/${supplierId}`, data);
    }
    exportSupplier() {
        return useFetch.get(`${URL_PREFIX}suppliers-export`);
    }
    createEmployee(data) {
        return useFetch.post(`${URL_PREFIX}employees?${data}`);
    }
    getGroups(data, headers) {
        return useFetch.get(`${URL_PREFIX}groups?${data}`, headers);
    }
    getCategories(data) {
        return useFetch.get(`${URL_PREFIX}categories${data ? `?${data}` : ''}`);
    }
    getServices(data) {
        return useFetch.get(`${URL_PREFIX}services${data ? `?${data}` : ''}`);
    }
    getOrders(data) {
        return useFetch.get(`${URL_PREFIX}orders${data ? '?' + data : ''}`);
    }
    createCategory(data) {
        return useFetch.post(`${URL_PREFIX}categories`, data);
    }
    deleteCategory(categoryId) {
        return useFetch.delete(`${URL_PREFIX}categories/${categoryId}`);
    }
    updateCategory(categoryId, data) {
        return useFetch.post(`${URL_PREFIX}categories/${categoryId}`, data);
    }
    createService(data) {
        return useFetch.post(`${URL_PREFIX}services`, data, { headers: { 'Content-Type': 'multipart/form-data' } });
    }
    updateService(id, data) {
        return useFetch.post(`${URL_PREFIX}services/${id}`, data, { headers: { 'Content-Type': 'multipart/form-data' } });
    }

    getServiceTiket() {
        return useFetch.get(`${URL_PREFIX}services-get-ticket-type`);
    }

    getChangeServiceStatus(id, value) {
        return useFetch.post(`${URL_PREFIX}services/${id}/change-status?status=${value}`);
    }

    getAddress() {
        return useFetch.get(`${URL_PREFIX}address`);
    }
    getCompanyList() {
        return useFetch.get(`${URL_PREFIX}companies`);
    }
    getProvinces(queryParams, headers) {
        return useFetch.get(`province?${queryParams}`, headers);
    }
    getCitiesOfProvince(provinceId) {
        return useFetch.get(`city/${provinceId}`);
    }
    getEmployeeData(employeeId, tab) {
        return useFetch.get(`${URL_PREFIX}employees/${employeeId}?tab=${tab}`);
    }
    updateEmployeeData(employeeId, data) {

        return useFetch.post(
            `${URL_PREFIX}employees/${employeeId}?_method=put&tab=account&password=${data.password}&verify_password=${data.confirmPass}&username=${data.username}`
        );
    }
    updateEmployeeProfile(employeeId, data) {
        return useFetch.post(`${URL_PREFIX}employees/${employeeId}?_method=put&tab=detail`, data);
    }
    getOrderData(data) {
        return useFetch.get(`${URL_PREFIX}orders${data ? `?${data}` : ''}`);
    }
    getOrderDataById(id) {
        return useFetch.get(`${URL_PREFIX}orders/${id}`);
    }
    getTransactionsData(data) {
        return useFetch.get(`${URL_PREFIX}transactions${data ? `?${data}` : ''}`);
    }
    updateEmployee(data) {
        return useFetch.post(`${URL_PREFIX}employees-import`, data, { headers: { 'Content-Type': 'multipart/form-data' } });
    }
    getAllocationService(data) {
        return useFetch.get(`${URL_PREFIX}services?${data ? `${data}` : ''}`);
    }
    getBannerService(data) {
        return useFetch.get(`${URL_PREFIX}banners?${data ? `${data}` : ''}`);
    }
    getBannerServiceById(id) {
        return useFetch.get(`${URL_PREFIX}banners/${id}`);
    }
    updateBanner(id, queryParams) {
        return useFetch.post(`${URL_PREFIX}banners/${id}?${queryParams}`);
    }
    updateBannerDetail(id, queryParams) {
        return useFetch.post(
            `${URL_PREFIX}banners/${id}
      `,
            queryParams,
            { headers: { 'Content-Type': 'multipart/form-data' } }
        );
    }
    deleteBanner(id) {
        return useFetch.delete(`${URL_PREFIX}banners/${id}`);
    }
    downloadCompaniesExcel() {
        return useFetch.get(`${URL_PREFIX}companies-export`);
    }
    getChart(queryParams) {
        return useFetch.get(`${URL_PREFIX}charts?${queryParams}`);
    }
    autoCompleApi(routePath, headers) {
        return useFetch.get(`${URL_PREFIX}${routePath}`, { headers });
    }
    getCompany(companyId, tab) {
        return useFetch.get(`${URL_PREFIX}companies/${companyId}?tab=${tab}`);
    }
    getAccountCompany({ companyId, tab }) {
        return useFetch.get(`${URL_PREFIX}companies/${companyId}?tab=${tab}`);
    }
    updateAccountCompany({ companyId, password, verify_password }) {
        return useFetch.post(
            `${URL_PREFIX}companies/${companyId}?tab=account&password=${password}&verify_password=${verify_password}&_method=put`
        );
    }
    updateCompany(companyId, queryParams) {
        return useFetch.post(`${URL_PREFIX}companies/${companyId}`, queryParams, {
            headers: { 'Content-Type': 'multipart/form-data' },
        });
    }
    employeesExport(companyId) {
        return useFetch.get(`${URL_PREFIX}employees-export`);
    }
    createOrganizationUnit(data) {
        return useFetch.post(`${URL_PREFIX}charts`, data);
    }
    deleteOrganizationUnit(chartId) {
        return useFetch.delete(`${URL_PREFIX}charts/${chartId}`);
    }
    updateOrganizationUnit(chartId, params) {
        return useFetch.post(`${URL_PREFIX}charts/${chartId}?${params}`);
    }
    getSupplierAbout(supplierId) {
        return useFetch.get(`${URL_PREFIX}employees-export/${supplierId}`);
    }
    update(apiPath, headers) {
        return useFetch.post(`${URL_PREFIX}${apiPath}`, headers);
    }
    delete(apiPath) {
        return useFetch.delete(`${URL_PREFIX}${apiPath}`);
    }
    get(apiPath, headers) {
        return useFetch.get(`${URL_PREFIX}${apiPath}`, headers);
    }
    getServiceById(data) {
        return useFetch.get(`${URL_PREFIX}services${data ? `${data}` : ''}`);
    }
    getServiceById(data) {
        return useFetch.get(`${URL_PREFIX}services${data ? `${data}` : ''}`);
    }

    walletRequests() {
        return useFetch.get(`${URL_PREFIX}credit-requests`);
    }

    getCreditRequest(id) {
        return useFetch.get(`${URL_PREFIX}credit-requests/${id}`);
    }
    getServiceRequest(id) {
        return useFetch.get(`${URL_PREFIX}service-requests/${id}`);
    }
    closeTicket(id) {
        return useFetch.get(`${URL_PREFIX}ticket-close/${id}`);
    }
    sendMessage(data, id) {
        return useFetch.post(`${URL_PREFIX}send_message/${id}`, data);
    }
    changeStatusRequest(data, id) {
        return useFetch.post(`${URL_PREFIX}credit-requests/${id}`, data);
    }
    changeStatusServiceRequest(data, id) {
        return useFetch.post(`${URL_PREFIX}service-requests/${id}`, data);
    }
    getEvents() {
        return useFetch.get(`${URL_PREFIX}events`);
    }
    createEvent(data) {
        return useFetch.post(`${URL_PREFIX}events?date=${data.date}&name=${data.name}`);
    }
}

export default new adminService();
