import { request } from "../utils/Request";

export const getServiceTypes = () => {
    const options = {
        method: "get",
        path: "service-types",
        params: [],
        values: [],
    };

    return request(options);
};


export const getServiceTypeByName = (name) => {
    const options = {
        method: "get",
        path: "service-type-by-name",
        params: ["name"],
        values: [name],
    };

    return request(options);
};

export default {
    getServiceTypes,
    getServiceTypeByName,
};