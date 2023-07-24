import useFetch from '../index';

class userService {
    getProfile() {
        return useFetch.get('employee/profile');
    }
    postInterest(data) {
        return useFetch.post(`employee/add-interests?${data}`);
    }
    getInterest(data) {
        return useFetch.get(`employee/categories`);
    }

    postProfile(data) {
        return useFetch.post(`employee/profile?`, data);
    }

    getWallet() {
        return useFetch.get(`employee/wallets`);
    }
    update(apiPath, headers) {
        return useFetch.post(`${apiPath}`, headers);
    }
    delete(apiPath) {
        return useFetch.delete(`${apiPath}`);
    }
    get(apiPath, headers) {
        return useFetch.get(`${apiPath}`, headers);
    }
}
export default new userService();

// &national_code=${data.national_code}&birthday=${data.birthday}&mobile=${data.mobile}&gender=${data.gender}&is_married=${data.married_date}&married_date=${data.married_date}&province_id=${data.province_id}&city_id=${data.city_id}&address=${data.address}&child=${data.child}&email=${data.email}&postal_code=${data.postal_code}
