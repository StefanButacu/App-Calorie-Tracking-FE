import axios from "axios";
import {authConfig, baseURL} from "./index";


export const requestGetMeal = (mealId: string, token: string) => {
    return axios.get(baseURL + `/api/meal/${mealId}`, authConfig(token))
}
