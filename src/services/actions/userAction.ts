import axios from "axios";
import {baseURL} from "./index";


export const requestGetUserDetails = (userId: string) => {
    return axios.get(baseURL + `/api/user/${userId}`)
}
