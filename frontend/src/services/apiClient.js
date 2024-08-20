import axios from "axios";

const apiClient = axios.create({
    baseURL: 'http://192.168.1.9:8000',
    withCredentials: true,
    withXSRFToken: true,
    headers: {
        Accept: 'application/json',
    }
});
export default apiClient;
