import axios from "axios";

interface LoginPayload {
    email: string;
    password: string;
}

interface RegisterPayload {
    name: string;
    email: string;
    password: string;
    password_confirmation: string;
}

export const useAuth = () => {
    // store user on client side
    // LOGIN
    async function login(payload: LoginPayload) {
        await axios.post("/login", payload);
        useRouter().push("/me");
    }

    //LOGOUT
    async function logout() {
        await axios.post("/logout");
        useRouter().replace("/login");
    }

    // REGISTER
    async function register(payload: RegisterPayload) {
        // POST /api/register
        await axios.post("/register", payload);
        await login({
            email: payload.email,
            password: payload.password,
        });
    }

    return { login, logout, register };
};
