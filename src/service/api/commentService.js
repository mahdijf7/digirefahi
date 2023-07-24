import useFetch from '../index';

class commentService {
    getCommentList() {
        return useFetch.get('/admin/comments?company_id=1');
    }
}

export default commentService;
