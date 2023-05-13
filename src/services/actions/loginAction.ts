import axios from "axios";
import {baseURL} from "./index";


export const requestLogin = (username: string, password: string) => {
    return axios.post(baseURL + `/api/login`, {username: username, password: password})
}

