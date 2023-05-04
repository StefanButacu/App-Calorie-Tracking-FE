

export function calculateCaloriesForQuantity(protein:number, carbo:number, lipid: number, quantity: number): number {
    console.log("Calorie: ", protein * 4 * quantity / 100.0 + carbo * 4 * quantity / 100 + lipid * 9 * quantity / 100)
    return Math.floor(protein * 4 * quantity / 100.0 + carbo * 4 * quantity / 100 + lipid * 9 * quantity / 100);
}