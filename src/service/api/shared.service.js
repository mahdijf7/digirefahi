import useFetch from '../index';

const URL_PREFIX = '/admin/';

class sharedService {
    autoComple(routePath, headers) {
        return useFetch.get(`${routePath}`, headers);
    }
    getProvinces() {
        return useFetch.get(`/province`);
    }
}

export default new sharedService();
