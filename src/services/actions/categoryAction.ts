import axios from "axios";

const baseURL = process.env.REACT_APP_PYTHON_API_URL;


export const getCategory = (category_label: number) => {
    return axios.get(baseURL + `/category/${category_label}`)
}