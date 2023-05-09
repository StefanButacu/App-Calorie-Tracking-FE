import axios from "axios";

const baseURL = process.env.REACT_APP_JAVA_API_URL;

export const requestGetUserDetails = (userId: string) => {
    return axios.get(baseURL + `/api/user/${userId}`)
}