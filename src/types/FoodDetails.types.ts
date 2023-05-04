import {Food} from "./MealFood.types";

export interface FoodDetailsProps extends Food {
    mealId: number;
}