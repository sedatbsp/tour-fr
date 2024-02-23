import { registerUserRequest, loginRequest, updateUserRequest } from "../utils/Request";

export const register = (data) => {
    const options = {
      method: "post",
      path: "user",
      data: data,
    };
    return registerUserRequest(options);
  };

  export function login(data) {
    const options = {
      method: "post",
      path: "login",
      data: data,
    };
    return loginRequest(options);
  }

  export function update(data) {
    const options = {
      method: "put",
      path: "user",
      data: data,
    };
    return updateUserRequest(options);
  }

  export default {
    register,
    login,
    update
};