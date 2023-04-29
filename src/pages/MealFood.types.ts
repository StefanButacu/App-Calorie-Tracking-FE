
export interface MealFood {
    mealId: number,
    mealName: string;
    foodList: Food[]
}

export interface Food {
    id: number,
    name: string,
    protein: number,
    carbohydrate: number,
    lipid: number,
    onAddFoodToMealClick?: (foodId: number, quantity:number) => any;
}


export interface FoodQuantity {
    foodId: number;
    quantity: number;
}