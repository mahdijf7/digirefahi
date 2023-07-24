import useFetch from '../index';

class authService {
    postLogin(enteredData) {
        return useFetch.post(`/login?username=${enteredData.username}&password=${enteredData.password}`, enteredData);
    }
    PostForgetPass(enteredData) {
        return useFetch.post(`/forget-password?mobile=${enteredData.mobile}`);
    }
    PostVerifyPass(enteredData) {
        return useFetch.post(
            `/verify-forget-password?mobile=${enteredData.mobile}&mobile_token=${enteredData.mobile_token}`,
            enteredData
        );
    }
    update(apiPath, headers) {
        return useFetch.post(`employee/${apiPath}`, headers);
    }

    PostNewPassword(data) {
        return useFetch.post(`employee/account?password=${data.password}&verify_password=${data.verify_password}`);
    }

    get(apiPath) {
        return useFetch.post(`employee/${apiPath}`);
    }
    getMe(role) {
        const roleNames = {
            ADMIN: 'admin',
            COMPANY: 'company',
            EMPLOYEE: 'employee',
        };
        return useFetch.get(`/user`);
    }
}
export default new authService();
