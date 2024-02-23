import { request } from "../utils/Request";

export const getRateById = (id) => {
    const options = {
        method: "get",
        path: "rate",
        params: ["id"],
        values: [id],
    };

    return request(options);
}

export const getRatesByUserId = (userId) => {
    const options = {
        method: "get",
        path: "rates-by-user",
        params: ["userId"],
        values: [userId],
    };

    return request(options);
}

export const getRatesByServiceId = (serviceId) => {
    const options = {
        method: "get",
        path: "rates-by-service",
        params: ["serviceId"],
        values: [serviceId],
    };

    return request(options);
}

export const getRatesByServiceIdAndUserId = (serviceId, userId) => {
    const options = {
        method: "get",
        path: "rate-by-service-and-user",
        params: ["serviceId", "userId"],
        values: [serviceId, userId],
    };

    return request(options);
}

export const createRate = (data, token) => {
    {console.log(data)}
    {console.log(token)}
    const options = {
        method: "post",
        path: "rate",
        data: data,
        headers: { Authorization: "Bearer " + token }
    };

    return request(options);
};

export const deleteRate = (data, token) => {
    const options = {
        method: "delete",
        path: "rate",
        data: data,
        headers: { Authorization: "Bearer " + token }
    };

    return request(options);
};

export default {
    getRateById,
    getRatesByUserId,
    getRatesByServiceId,
    getRatesByServiceIdAndUserId,
    createRate,
    deleteRate
}