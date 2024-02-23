import http from "./Axios";
import getConfig from 'next/config';

import { trackPromise } from "react-promise-tracker";
import { toast } from "react-toastify";

const { publicRuntimeConfig } = getConfig();
const BASE_URL = `${publicRuntimeConfig.apiUrl}/api-otg/`;

export const request = async (options) => {
  let url = options.params
    ? `${BASE_URL}${options.path}?`
    : `${BASE_URL}${options.path}`;
  if (options.params && options.params.length) {
    options.params.map((par, index) => {
      return (url += par + "=" + options.values[index] + "&");
    });
  }

  try {
    const response = await trackPromise(
      http({
        method: options.method,
        url: url,
        data: options.data,
        responseType: options.responseType,
        headers: options.headers
      })
    );
    return response.data;
  } catch (error) {
    console.log(error.response);
    if (error.response.status === 400)
      toast.error(error.response.data.errors.errorDescription);
  }
};

export const requestAsync = async (options) => {
  let url = options.params
    ? `${BASE_URL}${options.path}?`
    : `${BASE_URL}${options.path}`;
  if (options.params && options.params.length) {
    options.params.map((par, index) => {
      return (url += par + "=" + options.values[index] + "&");
    });
  }
  return await http({
    method: options.method,
    url: url,
    data: options.data,
    responseType: options.responseType,
  })
    .then((response) => response.data)
    .catch((error) => {
      console.log(error.response);
    });
};

export async function requestAll(requestOptionArray) {
  let optionsArray = [];
  if (requestOptionArray.length) {
    optionsArray = requestOptionArray.map((param, index) => {
      return request(requestOptionArray[index]);
    });
    return await trackPromise(Promise.all(optionsArray));
  }
}

export const registerUserRequest = (options) => {
  let url = options.params
    ? `${BASE_URL}${options.path}?`
    : `${BASE_URL}${options.path}`;

  return trackPromise(
    http({
      method: options.method,
      url: url,
      data: options.data,
      responseType: options.responseType,
    })
  );
};

export const updateUserRequest = (options) => {
  let url = options.params
    ? `${BASE_URL}${options.path}?`
    : `${BASE_URL}${options.path}`;

  return trackPromise(
    http({
      method: options.method,
      url: url,
      data: options.data,
      responseType: options.responseType,
    })
  );
};

export const loginRequest = (options) => {
  let url = options.params
    ? `${LOGIN_API_ENDPOINT}${options.path}?`
    : `${LOGIN_API_ENDPOINT}${options.path}`;
  if (options.params && options.params.length) {
    options.params.map((par, index) => {
      return (url += par + "=" + options.values[index] + "&");
    });
  }
  return trackPromise(
    http({
      method: options.method,
      url: url,
      data: options.data,
      responseType: options.responseType,
    })
  );
};

export default request;
