// import axios from "axios";
// import { API_URL } from "../utills/utills";

// const ApiClient = axios.create({
//   baseURL: API_URL,
//   timeout: 10000,
// });

// ApiClient.interceptors.request.use(
//   (config) => {
//     // Direct token retrieval from localStorage (or skip if none)
//     const token = localStorage.getItem("token") || "";
//     if (token) {
//       config.headers = {
//         ...config.headers,
//         Authorization: `Bearer ${token}`,
//         Accept: "application/json",
//         "Content-Type": "application/json",
//       };
//     }
//     return config;
//   },
//   (error) => {
//     console.error("API Request setup failed", error);
//     return Promise.reject(error);
//   }
// );

// ApiClient.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     if (error.response) {
//       const { status, data } = error.response;
//       if ([401, 403].includes(status)) {
//         localStorage.clear();
//         const message =
//           status === 401
//             ? "Your session has expired. Login again to start a new session."
//             : (data?.error || "Access forbidden.");
//         console.warn(message);
//         window.location.href = "/sign-in";
//       }
//     } else {
//       console.error("Network error (no response)", error);
//     }
//     return Promise.reject(error);
//   }
// );

// export default ApiClient;
import axios from "axios";
import { API_URL } from "../utills/utills";

const ApiClient = axios.create({
  baseURL: API_URL,
  timeout: 10000,
});

// Add token to all requests
ApiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");        // ensure correct key
    console.log("Using token in request:", token);
    if (token) {
      config.headers = {
        ...config.headers,
        Authorization: `Token ${token}`,                 // correct “Bearer ” scheme
        Accept: "application/json",
        "Content-Type": "application/json",
      };
    }
    return config;
  },
  (error) => {
    console.error("API Request setup failed", error);
    return Promise.reject(error);
  }
);

// Response interceptor to handle auth errors
ApiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      const { status, data } = error.response;
      if ([401, 403].includes(status)) {
        // only clear auth keys, not entire storage if you keep other data
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        const message =
          status === 401
            ? "Your session has expired. Login again to start a new session."
            : (data?.error || "Access forbidden.");
        console.warn(message);
        // Redirect to sign in page
        // window.location.href = "/sign in";
      }
    } else {
      console.error("Network error (no response)", error);
    }
    return Promise.reject(error);
  }
);

export default ApiClient;

