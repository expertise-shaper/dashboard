import { extend } from "umi-request";

const backendUrl = "https://expertise-shaper-37ut.onrender.com/api";

const API = extend({
    prefix: backendUrl,
    timeout: 60 * 1000,
    headers: {
        "Content-Type": "application/json",
    },
    params: {
        t: Date.now(),
    },
});

export { API };
