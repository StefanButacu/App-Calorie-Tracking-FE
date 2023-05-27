import axios from "axios";
import {authConfig, baseURL} from "./index";
import {UserRegisterRequest} from "../../types/User.types";


export const requestGetUserDetails = (token: string) => {
    return axios.get(baseURL + `/api/user`, authConfig(token))
}


export const requestRegister = (userRegisterRequest: UserRegisterRequest) => {
    return axios.post(baseURL + "/api/user", userRegisterRequest)
}

export const requestGetActivityLevels = () => {
    return axios.get(baseURL + `/api/user/register/activity-levels`)
}

export const requestGetGenders = () => {
    return axios.get(baseURL + `/api/user/register/genders`)
}

export const requestGetWeightGoals = () => {
    return axios.get(baseURL + `/api/user/register/weight-goals`)
}

export const requestGetDietTypes = () => {
    return axios.get(baseURL + `/api/user/register/diet-types`)
}

export const requestUpdateUserCurrentWeight = (currentWeight: number, token:string) => {
    return axios.patch(baseURL + `/api/user/weight`,  currentWeight, authConfig(token))
}

