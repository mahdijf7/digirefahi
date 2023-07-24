import useFetch from '../index';

const URL_PREFIX = '/supplier/';
class SupplierService {
    employees(data) {
        return useFetch.get(`${URL_PREFIX}employees${data ? `?${data}` : ''}`);
    }
    getCompanyInfo() {
        return useFetch.get(`${URL_PREFIX}account`);
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
    get(apiPath, headers){
        return useFetch.get(`${URL_PREFIX}${apiPath}`, headers );
    }
    update(apiPath) {
        return useFetch.post(`${URL_PREFIX}${apiPath}`);
    }
    create(apiPath) {
        return useFetch.post(`${URL_PREFIX}${apiPath}`);
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

    // Group
    deleteGroup(groupId) {
        return useFetch.delete(`${URL_PREFIX}groups/${groupId}`);
    }
    getTickets() {
        return useFetch.get(`${URL_PREFIX}tickets`);
    }
    addTicket(data) {
        return useFetch.post(`${URL_PREFIX}tickets`, data);
    }
    sendMessage(data,id) {
        return useFetch.post(`${URL_PREFIX}send_message/${id}`, data);
    }
    closeTicket(id) {
        return useFetch.get(`${URL_PREFIX}ticket-close/${id}`);
    }
    getSearchOrder(code) {
        return useFetch.post(`${URL_PREFIX}order-check`, code);
    }
  usedOrderCode(code) {
        return useFetch.post(`${URL_PREFIX}change-status`, code);
    }
}
export default new SupplierService();
