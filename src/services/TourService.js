import { request } from "../utils/Request";

export const getServices = () => {
    const options = {
        method: "get",
        path: "services",
        params: [],
        values: [],
    };

    return request(options);
};

export const getServiceById = (id) => {
    const options = {
        method: "get",
        path: "service",
        params: ["id"],
        values: [id],
    };

    return request(options);
}

export const getServicePlansByServiceId = (serviceId) => {
    const options = {
        method: "get",
        path: "service-plans-by-service-id",
        params: ["serviceId"],
        values: [serviceId],
    };

    return request(options);
}

export default {
    getServices,
    getServiceById,
    getServicePlansByServiceId
};