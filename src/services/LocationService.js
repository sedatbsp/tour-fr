import { request } from "../utils/Request";

export const getLocation = (id) => {
    const options = {
        method: "get",
        path: "location",
        params: ["id"],
        values: [id],
    };

    return request(options);
};

export default {
    getLocation
};