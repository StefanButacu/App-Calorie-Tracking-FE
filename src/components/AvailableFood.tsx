import {Food} from "../types/MealFood.types";
import MealItemComponent from "./MealItemComponent";
import {calculateCaloriesForQuantity} from "../services/utils";
import {useState} from "react";
import {IonButton} from "@ionic/react";
import AddFoodToMealModal from "./AddFoodToMealModal";

const AvailableFoodComponent: React.FC<Food> = ({id, name, protein, carbohydrate, lipid, onAddFoodToMealClick}) => {
    const quantity = 100.0;
    const [showModal, setShowModal] = useState(false);


    const handleAddToMealClick = (foodId:number, selectedQuantity: number) => {
        console.log("available food handle", foodId, "Quantity", selectedQuantity)
        if (onAddFoodToMealClick) {
            onAddFoodToMealClick(foodId, selectedQuantity);
        }
        setShowModal(false);
    };
    const food: Food = {
        id,
        name,
        protein,
        carbohydrate,
        lipid,
        onAddFoodToMealClick: handleAddToMealClick
    }
    return (
        <div>
           <MealItemComponent id={id} name={name} quantity={quantity} calories={calculateCaloriesForQuantity(protein, carbohydrate, lipid, quantity) } />
            <IonButton onClick={() => setShowModal(true)}>Add me</IonButton>
            {
                showModal && (
                <AddFoodToMealModal
                    isOpen={showModal}
                    food = { food}
                    onClose={() => setShowModal(false)}
                />
            )}
        </div>
    )
}
export default AvailableFoodComponent;