import axios, { AxiosError } from "axios";

export default defineNuxtRouteMiddleware(async (to, from) => {
    // await axios.get("/user");
    const { user, initUser } = useAuth();
    await initUser();
    if (!user.value) {
        return navigateTo("/login");
    }
});
