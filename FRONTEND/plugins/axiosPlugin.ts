import axios from "axios";
import Cookies from "js-cookie";

const csrfToken = Cookies.get("XSRF-TOKEN");

export default defineNuxtPlugin(async (nuxtApp) => {
    // axios.defaults.baseURL = "http://localhost";

    // FrontEnd from nuxt.config.ts
    const config = useRuntimeConfig();

    // axios.defaults.baseURL = "http://localhost:8000/api";
    axios.defaults.baseURL = `${config.public.appURL}/api`;
    axios.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";
    axios.defaults.headers.common["Content-Type"] = "application/json";
    axios.defaults.headers.common["Accept"] = "application/json";
    axios.defaults.withCredentials = true;
    axios.defaults.withXSRFToken = true;

    await axios.get("/sanctum/csrf-cookie", {
        baseURL: config.public.appURL,
    });
});
