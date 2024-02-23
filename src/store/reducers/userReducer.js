import TokenService from "src/services/TokenService";
import { LOGIN, LOGOUT } from "../actions/userAction";
import { userInit } from "../initValues";

const initialValues = {
    userInit: userInit
}

export default function userReducer(state = initialValues, { type, payload }) {
    
    // type'a göre logic
    switch (type) {

        case LOGIN:
            let token = payload;
            let userId = TokenService.getUserId(JSON.stringify(token))
            let username = TokenService.getUserName(JSON.stringify(token));
            let fullname = TokenService.getFullName(JSON.stringify(token));

            return {
                ...state,
                userInit: { token, userId, username, fullname }
            }

        case LOGOUT:
            return {
                ...state,
                userInit: {}
            }    

        default:
            return state;
    }
}