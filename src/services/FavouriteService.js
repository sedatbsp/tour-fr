import { request } from "../utils/Request";
import { toast } from "react-toastify";

export const createFavourite = ( serviceId, token ) => {
    const options = {
        method: "post",
        path: "favourite",
        data: serviceId,
        headers: { Authorization: "Bearer " + token }
    };
    toast.success("Favoriye Eklendi");
    console.log(options)
    return request(options);
};

export const deleteFavourite = ( serviceId, token ) => {
    const options = {
        method: "delete",
        path: "favourite",
        data: serviceId,
        headers: { Authorization: "Bearer " + token }
    };

    toast.success("Favoriden Çıkarıldı");
    return request(options);
};

export const getUserFavourites = ( userId ) => {
    const options = {
        method: "get",
        path: "favourite-by-user",
        params: ["userId"],
        values: [userId]
    };

    return request(options);
};

export default {
    createFavourite,
    deleteFavourite,
    getUserFavourites
};