import axios from "axios";
import {baseURL} from "./index";


export const getCategory = (category_label: number) => {
    return axios.get(baseURL + `/category/${category_label}`)
}