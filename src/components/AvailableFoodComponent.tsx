import {Food} from "../types/MealFood.types";
import MealItemComponent from "./MealItemComponent";
import {calculateCaloriesForQuantity} from "../services/utils";
import React, {useState} from "react";
import {IonButton, IonIcon} from "@ionic/react";
import AddFoodToMealModal from "./AddFoodToMealModal";
import {heart, pizzaOutline} from "ionicons/icons";

const AvailableFoodComponent: React.FC<Food> = ({id, name, protein, carbohydrate, lipid, onAddFoodToMealClick}) => {
    const quantity = 100.0;
    const [showModal, setShowModal] = useState(false);


    const handleAddToMealClick = (foodId:number, selectedQuantity: number) => {
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
            <IonButton>
                {/*Todo search an icon (pacman, bite smth) */}
                <IonIcon slot="icon-only" icon={pizzaOutline}></IonIcon>
            </IonButton>

            <IonButton onClick={() => setShowModal(true)}>Eat</IonButton>
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