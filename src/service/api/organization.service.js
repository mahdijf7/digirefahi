import useFetch from '../index';

const URL_PREFIX = '/company/';
class OrganizationService {
    employees(data) {
        return useFetch.get(`${URL_PREFIX}employees${data ? `?${data}` : ''}`);
    }
    getCompanyInfo() {
        return useFetch.get(`${URL_PREFIX}account`);
    }
    getEvents() {
        return useFetch.get(`${URL_PREFIX}events`);
    }
    createEvent(data) {
        return useFetch.post(`${URL_PREFIX}events?date=${data.date}&name=${data.name}`);
    }
    editEvent(data) {
        return useFetch.post(`${URL_PREFIX}events?id=${data.id}&date=${data.date}&name=${data.name}`);
    }
    getCompanyProfile() {
        return useFetch.get(`${URL_PREFIX}profile`);
    }
    updateCompany() {
        return useFetch.post(`${URL_PREFIX}profile`);
    }
    updateAccount(values) {
        return useFetch.post(`${URL_PREFIX}account?password=${values.password}&verify_password=${values.verify_password}`);
    }
    createEmployee(data) {
        return useFetch.post(`${URL_PREFIX}employees?${data}`);
    }
    getEmployee(id, queryParams) {
        return useFetch.get(`${URL_PREFIX}employees/${id}?${queryParams}`);
    }
    updateEmployee(id, queryParams) {
        return useFetch.post(`${URL_PREFIX}employees/${id}?${queryParams}`);
    }
    walletReport() {
        return useFetch.get(`${URL_PREFIX}transactions`);
    }
    getWallet() {
        return useFetch.get(`${URL_PREFIX}wallet`);
    }
    get(apiPath, headers) {
        return useFetch.get(`${URL_PREFIX}${apiPath}`, headers);
    }
    update(apiPath, headers) {
        return useFetch.post(`${URL_PREFIX}${apiPath}`, headers);
    }
    create(apiPath, data) {
        return useFetch.post(`${URL_PREFIX}${apiPath}`, data);
    }
    delete(apiPath) {
        return useFetch.delete(`${URL_PREFIX}${apiPath}`);
    }
    getServices(params) {
        return useFetch.get(`${URL_PREFIX}services?${params}`);
    }

    createCreditRequest(data) {
        return useFetch.post(`${URL_PREFIX}credit-requests`, data);
    }

    walletReport() {
        return useFetch.get(`${URL_PREFIX}transactions`);
    }
    walletRequests() {
        return useFetch.get(`${URL_PREFIX}credit-requests`);
    }
    getRequest(id) {
        return useFetch.get(`${URL_PREFIX}credit-requests/${id}`);
    }

    deleteRequest(id) {
        return useFetch.delete(`${URL_PREFIX}credit-requests/${id}`);
    }
    getWallet() {
        return useFetch.get(`${URL_PREFIX}wallet`);
    }

    // Categories
    getCategories(data) {
        return useFetch.get(`${URL_PREFIX}categories${data ? `?${data}` : ''}`);
    }

    // Charts
    getCharts(filters, headers) {
        return useFetch.get(`${URL_PREFIX}charts?${filters}`, headers);
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
    
    // Group
    getGroups(filters, headers) {
        return useFetch.get(`${URL_PREFIX}groups?${filters}`, headers);
    }
    deleteGroup(groupId) {
        return useFetch.delete(`${URL_PREFIX}groups/${groupId}`);
    }
    
    getTickets() {
        return useFetch.get(`${URL_PREFIX}tickets`);
    }
    addTicket(data) {
        return useFetch.post(`${URL_PREFIX}tickets`, data);
    }
    sendMessage(data, id) {
        return useFetch.post(`${URL_PREFIX}send_message/${id}`, data);
    }

    closeTicket(id) {
        return useFetch.get(`${URL_PREFIX}ticket-close/${id}`);
    }

    createServiceRequest(data) {
        return useFetch.post(`${URL_PREFIX}service-requests`, data);
    }
    changeStatusServiceRequest(data,id) {
        return useFetch.post(`${URL_PREFIX}service-requests/${id}`, data);
    }
    // Allocation
    uploadEmployeeExcel(data) {
        return useFetch.post(`${URL_PREFIX}employees-excel-filter`, data);
    }
    getServiceRequest(id) {
        return useFetch.get(`${URL_PREFIX}service-requests/${id}`);
    }
}
export default new OrganizationService();
