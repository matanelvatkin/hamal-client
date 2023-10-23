import axios from "axios";

axios.defaults.baseURL = import.meta.env.SERVER_BASE_URL

const apiCalls = async (method, url, data) => {
    axios.defaults.headers.common.Authorization = `Bearer ${localStorage.token}`
    
    try {
        const res = await axios({
            method: method,
            url: url,
            data:data
          });

        return res
    }
    catch (error) {
    }
}

export default apiCalls