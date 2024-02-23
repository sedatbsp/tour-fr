import { toast } from "react-toastify";
import { request } from "../utils/Request";

export const getServiceCommentById = (id) => {
    const options = {
        method: "get",
        path: "service-comment",
        params: ["id"],
        values: [id],
    };

    return request(options);
}

export const getServiceCommentsByUserId = (userId) => {
    const options = {
        method: "get",
        path: "service-comment-by-user",
        params: ["userId"],
        values: [userId],
    };

    return request(options);
}

export const getServiceCommentsByServiceId = (serviceId) => {
    const options = {
        method: "get",
        path: "service-comment-by-service",
        params: ["serviceId"],
        values: [serviceId],
    };

    return request(options);
}

export const createServiceComment = ( data, token ) => {
    const options = {
        method: "post",
        path: "service-comment",
        data: data,
        headers: { Authorization: "Bearer " + token }
    };
    
    toast.success("Yorum Eklendi")
    return request(options);
};

export const deleteServiceComment = ( data, token ) => {
    const options = {
        method: "delete",
        path: "service-comment",
        data: data,
        headers: { Authorization: "Bearer " + token }
    };

    toast.success("Yorum Silindi")
    return request(options);
};

export default {
    getServiceCommentById,
    getServiceCommentsByUserId,
    getServiceCommentsByServiceId,
    createServiceComment,
    deleteServiceComment
}