import axios from "axios";

const baseURL = process.env.REACT_APP_JAVA_API_URL;

export const requestLogin = (username: string, password: string) => {
    return axios.post(baseURL + `/api/login`, {username: username, password: password})
}

