import axios from "axios";
import {baseURL} from "./index";
import {UserRegisterRequest} from "../../types/User.types";


export const requestGetUserDetails = (userId: string) => {
    return axios.get(baseURL + `/api/user/${userId}`)
}


export const requestRegister = (userRegisterRequest: UserRegisterRequest) => {
    return axios.post(baseURL + "/api/user", userRegisterRequest)
}

export const requestGetActivityLevels = () => {
    return axios.get(baseURL + `/api/user/activity-levels`)
}

export const requestGetGenders = () => {
    return axios.get(baseURL + `/api/user/genders`)
}

export const requestGetWeightGoals = () => {
    return axios.get(baseURL + `/api/user/weight-goals`)
}

export const requestGetDietTypes = () => {
    return axios.get(baseURL + `/api/user/diet-types`)
}