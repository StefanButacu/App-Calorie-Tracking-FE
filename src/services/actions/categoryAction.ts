import axios from "axios";

const baseURL = process.env.REACT_APP_PYTHON_API_URL;


export const getCategory = (category_label: number) => {
    console.log(baseURL + `/category/${category_label}`);
    return axios.get(baseURL + `/category/${category_label}`)
}