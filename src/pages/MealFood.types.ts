export interface DiaryDayMealFood {
    diaryDayId: number,
    diaryDayDate: string,
    mealDTOList: MealFood[];
}

export interface MealFood {
    mealId: number,
    mealName: string;
    foodList: FoodWithCalorie[]
}
export interface MealProps {
    mealName: string,
    mealId: number,
    foodList: FoodWithCalorie[];
}

export interface Food {
    id: number,
    name: string,
    protein: number,
    carbohydrate: number,
    lipid: number,
    onAddFoodToMealClick?: (foodId: number, quantity:number) => any;
}


export interface FoodWithCalorie {
    id: number,
    name: string,
    quantity: number,
    calories: number
}


export interface FoodQuantity {
    foodId: number;
    quantity: number;
}
// FoodDetails with nutrition values for 100 grams
// FoodFromMeal - to display name and total calories FoodDetail.proteine * 100 / Quantity

