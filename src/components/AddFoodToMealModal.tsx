import React, { useState } from 'react';
import { IonButton, IonContent, IonHeader, IonInput, IonItem, IonLabel, IonModal, IonPicker, IonSelect, IonSelectOption, IonTitle, IonToolbar } from '@ionic/react';
import FoodDetailsComponent from './FoodDetailsComponent';
import {Food} from "../pages/MealFood.types";
import {useParams} from "react-router";
import {RouteParams} from "../pages/AddFoodPage";
import {useDispatch} from "react-redux";
import {addFoodReduce} from "../store";
import {calculateCaloriesForQuantity} from "../services/utils";

interface ModalProps {
    isOpen: boolean;
    food: Food;
    onClose: () => void;
}

const AddFoodToMealModal: React.FC<ModalProps> = ({ isOpen, food, onClose }) => {
    const {mealId} = useParams<RouteParams>()
    const dispatch = useDispatch();

    const servingSize = 100.0
    const [quantity, setQuantiy] = useState(1 * servingSize )


    const [numberOfServings, setNumberOfServings] = useState(1)

    const handleNumberOfServingsChange = (event: CustomEvent) => {
        const value = parseInt(event.detail.value, 10);
        console.log(value);
        setNumberOfServings(value);
        setQuantiy(numberOfServings * servingSize);
        console.log(quantity);
    };

    const handleAddToMealClick = () => {
        if (food.onAddFoodToMealClick) {
            console.log("food id + ", food.id)
            console.log("quantity, ", quantity);
            const response = food.onAddFoodToMealClick(food.id, quantity);
            dispatch(addFoodReduce({ mealId: parseInt(mealId, 10), food: {id: food.id, name:food.name, quantity: quantity, calories: calculateCaloriesForQuantity(food.protein, food.carbohydrate, food.lipid, quantity * servingSize)}}));
        }
        onClose();
    }

    return (
        <IonModal isOpen={isOpen} onDidDismiss={onClose}>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Food Details</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent>
                <FoodDetailsComponent mealId={parseInt(mealId, 10)} {...food} />
                <p style={{textAlign: "right"}}>
                    {servingSize} g
                </p>
                <IonItem>
                    <IonInput
                        type="number"
                        min="1"
                        value={numberOfServings}
                        placeholder="1"
                        onIonChange={handleNumberOfServingsChange}
                    />
                </IonItem>
                <IonButton expand="block" onClick={handleAddToMealClick}>Add to Meal</IonButton>
                <IonButton expand="block" onClick={onClose}>Close</IonButton>
            </IonContent>
        </IonModal>
    );
};

export default AddFoodToMealModal;
