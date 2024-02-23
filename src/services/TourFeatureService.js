import { toast } from "react-toastify";
import { request } from "../utils/Request";

export const getServiceFeaturesByServiceIdAndFeatureType = (data) => {
    const options = {
        method: "get",
        path: "service-features-by-service-id-and-feature-type",
        params: ["serviceId", "featureType"],
        values: [data.serviceId, data.featureType],
    };

    return request(options);
}

export default {
    getServiceFeaturesByServiceIdAndFeatureType
}