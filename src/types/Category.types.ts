export interface CategoryProps {
    categoryId: number
    categoryColor: number[]
    onAddFoodToMealClick?: (foodId: number, quantity: number) => any;
}

export interface CategoryComponentProps extends CategoryProps {
    mealId: number;
}