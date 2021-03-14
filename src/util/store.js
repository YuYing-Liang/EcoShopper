import { writable } from "svelte/store";

export const grade = writable("D+");
export const view_mode = writable(true);
export const popup = writable(false);

function createProductData(initVal) {
    let { update, set, subscribe } = writable(initVal)

    return {
        set, subscribe
    }
}

export const productData = writable({})