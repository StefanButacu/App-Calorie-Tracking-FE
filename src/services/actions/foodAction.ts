import axios from "axios";

const baseURL = process.env.REACT_APP_JAVA_API_URL;

export const requestGetFoodDetails = (foodId: number) => {
    return axios.get(baseURL + `/api/food/${foodId}`)
}

export const requestGetAvailableFoods = (page: number, searchFoodName?:string) => {
    if(searchFoodName)
        return axios.get(baseURL + `/api/food/foods?page=${page}&name=${searchFoodName}`)
    return axios.get(baseURL + `/api/food/foods?page=${page}`)
}