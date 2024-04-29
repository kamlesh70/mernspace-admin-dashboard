import axios from "axios";
import config from "../config";
import { useAuthStore } from "../zustand/store";

const apiClient = axios.create({
    baseURL: config.BACKEND_BASE_URL,
    withCredentials: true
})


const refreshToken = async () => {
    await axios.post(`${config.BACKEND_BASE_URL}/auth/refreshToken`, {}, 
        {
            withCredentials: true
        }
    )
}

apiClient.interceptors.response.use((response) => response, 
    async (error) => {
        const originalRequest = error.config;
        const headers = originalRequest.headers;
        try {
            if(error.response.status === 401 && !originalRequest._isRetry){
                originalRequest._isRetry = true;
                await refreshToken();
                return apiClient.request({ ...originalRequest, headers });
            } else {
                return Promise.reject(error);
            }
        } catch (error) {
            console.error(error);
            useAuthStore.getState().logout();
            return Promise.reject(error);
        }
    }
)

export default apiClient;