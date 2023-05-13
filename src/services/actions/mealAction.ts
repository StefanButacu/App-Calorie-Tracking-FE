import axios from "axios";
import {baseURL} from "./index";


export const requestGetMeal = (mealId: string) => {
    return axios.get(baseURL + `/api/meal/${mealId}`)
}
