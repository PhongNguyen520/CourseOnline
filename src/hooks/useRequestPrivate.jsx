import { useContext, useEffect } from 'react';
import { requestsPrivate } from '../utils/requests'; // Giả sử requestsPrivate là axios instance
import { ModalContext } from '../components/ModalProvider/ModalProvider';

const useRequestsPrivate = () => {
    const { auth } = useContext(ModalContext); // Lấy auth từ context

    useEffect(() => {
        const requestIntercept = requestsPrivate.interceptors.request.use(
            (config) => {
                const accessToken = auth?.accessToken?.token; // Lấy Bearer token
                if (accessToken) {
                    config.headers['Authorization'] = `Bearer ${accessToken}`; // Thêm Bearer token vào headers
                }
                return config;
            },
            (error) => Promise.reject(error),
        );

        return () => {
            requestsPrivate.interceptors.request.eject(requestIntercept); // Xóa interceptor khi unmount
        };
    }, [auth]);

    return requestsPrivate; // Trả về instance của requestsPrivate
};

export default useRequestsPrivate;
