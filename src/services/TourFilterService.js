
import { request } from "../utils/Request";

export const getServiceByStartDateAndEndDateAndLocation = (data) => {
    const options = {
        method: "get",
        path: "service-by-date-and-location",
        params: ["startDate", "endDate", "location", "type"],
        values: [data.startDate, data.endDate, data.location, data.type],
    };

    return request(options);
}

export const getServicesByPrices = (data) => {
    const options = {
        method: "get",
        path: "services-by-prices",
        params: ["minPrice", "maxPrice"],
        values: [data.minPrice, data.maxPrice],
    };

    return request(options);
}

export default {
    getServiceByStartDateAndEndDateAndLocation,
    getServicesByPrices
};