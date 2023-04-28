
export interface MealFood {
    mealId: number,
    mealName: string;
    foodList: Food[]
}

export interface Food {
    foodId: number,
    name: string,
    protein: number,
    carbohydrate: number,
    lipid: number,
}