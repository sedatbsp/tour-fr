import { request } from "../utils/Request";

export const getServiceLocationsByServiceId = (serviceId) => {
    const options = {
        method: "get",
        path: "service-locations",
        params: ["serviceId"],
        values: [serviceId],
    };

    return request(options);
};

export const getTopServiceLocationByServiceId = (serviceId) => {
    const options = {
        method: "get",
        path: "top-service-location",
        params: ["serviceId"],
        values: [serviceId],
    };

    return request(options);
};

export default {
    getServiceLocationsByServiceId,
    getTopServiceLocationByServiceId
};