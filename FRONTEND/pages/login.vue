<script setup lang="ts">
import type { FormKitNode } from "@formkit/core";
import { handleInvalidForm } from "../utils";

definePageMeta({
    layout: "centered",
    middleware: ["guest"],
});

const form = ref({
    email: "",
    password: "",
});

const { login } = useAuth();

async function authLogin(payload, node?: FormKitNode) {
    console.log(payload);
    try {
        await login(payload);
    } catch (err) {
        handleInvalidForm(err, node);
    }
}
</script>
<template>
    <div class="login">
        <h1>Login</h1>
        <pre>
            {{ form }}
        </pre>
        <!-- <form @submit.prevent="login(form)"> -->
        <!-- <form @submit.prevent="authLogin(form)">
            <label>
                <div>Email</div>
                <input type="text" v-model="form.email" />
            </label>

            <label>
                <div>Password</div>
                <input type="password" v-model="form.password" />
            </label>
            <button class="btn">Login</button>
        </form> -->
        <FormKit type="form" submit-label="Login" @submit="authLogin">
            <FormKit label="Email" type="text" name="email" />
            <FormKit label="Password" type="password" name="password" />
        </FormKit>

        <p>
            Don't have an account?
            <NuxtLink class="underline text-lime-600" to="/register"
                >Register now!</NuxtLink
            >
        </p>
    </div>
</template>
