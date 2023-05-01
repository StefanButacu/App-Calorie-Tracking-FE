import {Food} from "../pages/MealFood.types";

export interface FoodDetailsProps extends Food {
    mealId: number;
}