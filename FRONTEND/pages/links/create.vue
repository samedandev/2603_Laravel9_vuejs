<script setup lang="ts">
import type { FormKitNode } from "@formkit/core";
import axios, { AxiosError } from "axios";
import { nanoid } from "nanoid";
import { handleInvalidForm } from "../../utils";
// import type {FormKitNode} from "@formkit/core"

definePageMeta({
    middleware: ["auth"],
});

// function handleInvalidForm(err: any, node?: FormKitNode) {
//     if (err instanceof AxiosError && err.response?.status === 422) {
//         node?.setErrors([], err.response.data.errors);
//     }
// }

async function createLink(payload, node?: FormKitNode) {
    try {
        await axios.post("/links", {
            ...payload,
            short_link: nanoid(8),
        });
    } catch (err) {
        handleInvalidForm(err, node);
    }
}
</script>

<template>
    <h1>Create New Link</h1>
    <GoBack>or go back to links</GoBack>
    <FormKit type="form" submit-label="Create Link" @submit="createLink">
        <FormKit label="Link" type="url" name="full_link" />
    </FormKit>
    <!-- <form>
        <label>
            <div>Link</div>
            <input type="text" name="full_link" />
        </label>
        <button class="btn">Create Link</button>
    </form> -->
</template>
