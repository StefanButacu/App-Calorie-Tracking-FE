import axios from "axios";
import {basePythonURL} from "./index";


export const getCategory = (category_label: number) => {
    return axios.get(basePythonURL + `/category/${category_label}`)
}