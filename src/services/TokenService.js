import jwtDecoder from "jwt-decode";

export const getFullName = (token) => {
  return jwtDecoder(token).sub;
};

export const getUserRole = (token) => {
  return jwtDecoder(token).auth;
};

export const getAuthType = (token) => {
  return jwtDecoder(token).details.userAuthorizationType;
};

export const getUserName = (token) => {
  return jwtDecoder(token).sub;
};

export const getUserId = (token) => {
  return jwtDecoder(token).userId;
};

export default {
  getFullName,
  getUserRole,
  getAuthType,
  getUserName,
  getUserId
};
