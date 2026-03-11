import { FormKitNode, createMessage, createNode } from "@formkit/core";
import { AxiosError } from "axios";

const node = createNode();
const message = createMessage({
    key: "clickHole",
    value: "Please click 100 times.",
});

node.store.set(message);

export function handleInvalidForm(err: any, node?: FormKitNode) {
    if (err instanceof AxiosError && err.response?.status === 422) {
        node?.setErrors([], err.response.data.errors);
    }
}

export function handleSuccessForm(data: any, node?: FormKitNode) {
    console.log(data);
    createMessage({
        key: "clickHole",
        value: "Please click 100 times.",
    });
    node?.setErrors([], "data.response.status");

    if (data.response?.status === 201 || data.response?.status === 200) {
        console.log(data);
        node?.setErrors([], "data.response.status");
    }
}
