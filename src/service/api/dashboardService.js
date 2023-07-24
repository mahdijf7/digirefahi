import useFetch from '../index';
const URL_PREFIX = '/employee/';
class dashboardService {
    get(apiPath, headers){
        return useFetch.get(`${URL_PREFIX}${apiPath}`, headers );
    }
    create(apiPath, data) {
        return useFetch.post(`${URL_PREFIX}${apiPath}`, data);
    }
    getDashboardServices() {
        return useFetch.get(`/employee/dashboard`);
    }
    getAllCategories(page) {
        return useFetch.get(`/employee/categories?page=${page}`);
    }
    getAllSuppliers(page) {
        return useFetch.get(`/employee/suppliers?page=${page}`);
    }
    getAllServices(data) {
        const defaultParams = {
            name: data?.name || '',
            page: data?.page || 1,
            price_from: data?.price_from || '',
            price_to: data?.price_to || '',
            category: data?.category || '',
            province: data?.province || '',
            supplier: data?.supplier || '',
        };
        const queryString = Object.entries(defaultParams)
            .map(([key, value]) => `${key}=${value}`)
            .filter((param) => param !== '=')
            .join('&');
        return useFetch.get(`/employee/services?${queryString}`);
    }
    getService(id) {
        return useFetch.get(`/employee/services/${id}`);
    }
    getMyService() {
        return useFetch.get(`/employee/my-services`);
    }
    getTransactions() {
        return useFetch.get(`/employee/transactions`);
    }
    getComment(id) {
        return useFetch.get(`/employee/comments/${id}`);
    }
    postComment(id, comment, score) {
        return useFetch.post(`/employee/comments/${id}?score=${score}&comment=${comment}`);
    }
    getProvince() {
        return useFetch.get('/province');
    }
    getCity(id) {
        return useFetch.get(`/city/${id}`);
    }
    getCreateOrder({ service, count }) {
        return useFetch.get(`/employee/orders/create?service=${service}&count=${count}`);
    }
    postOrder({ service, count }) {
        return useFetch.post(`/employee/orders?service=${service}&count=${count}`);
    }
    addTicket(data) {
        return useFetch.post(`${URL_PREFIX}tickets`, data);
    }
    closeTicket(id) {
        return useFetch.get(`${URL_PREFIX}ticket-close/${id}`);
    }
    sendMessage(data,id) {
        return useFetch.post(`${URL_PREFIX}send_message/${id}`, data);
    }
}
export default new dashboardService();
