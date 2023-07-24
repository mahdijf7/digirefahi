import useFetch from '../index';

class bannerService {
    createBanner(data) {
        return useFetch.post('/admin/banners', data, {
            headers: { 'Content-Type': 'multipart/form-data' },
        });
    }
    getBannerList() {
        return useFetch.get('/admin/banners');
    }
}

export default bannerService;
