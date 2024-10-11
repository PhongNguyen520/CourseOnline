import { useEffect } from 'react';
import Cookies from 'js-cookie';
import { requestsPrivate } from '../utils/requests'; // Giả sử requestsPrivate là axios instance

const useRequestsPrivate = () => {

    useEffect(() => {
        const requestIntercept = requestsPrivate.interceptors.request.use(
            (config) => {
                const authToken = Cookies.get('authToken'); // Lấy token từ cookies
                if (authToken) {
                    config.headers['Authorization'] = authToken; // Thêm token vào headers mà không có 'Bearer '
                }
                return config;
            },
            (error) => Promise.reject(error),
        );

        return () => {
            requestsPrivate.interceptors.request.eject(requestIntercept); // Xóa interceptor khi unmount
        };
    }, []);

    return requestsPrivate; // Trả về instance của requestsPrivate
};

export default useRequestsPrivate;
