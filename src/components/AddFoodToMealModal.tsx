import React, {useState} from 'react';
import {
    IonButton,
    IonButtons,
    IonContent,
    IonHeader,
    IonInput,
    IonItem,
    IonLabel,
    IonModal,
    IonPicker,
    IonSelect,
    IonSelectOption,
    IonTitle,
    IonToolbar
} from '@ionic/react';
import {Food} from "../types/MealFood.types";
import {useParams} from "react-router";
import {RouteParams} from "../pages/AddFoodPage";
import {useDispatch} from "react-redux";
import {addFoodReduce} from "../store";
import {calculateCaloriesForQuantity} from "../services/utils";
import "../assets/styles/food.scss"
import Circle from "./CalorieCircle";

interface ModalProps {
    isOpen: boolean;
    food: Food;
    onClose: () => void;
}

const AddFoodToMealModal: React.FC<ModalProps> = ({isOpen, food, onClose}) => {
    const {mealId} = useParams<RouteParams>()
    const dispatch = useDispatch();

    const servingSize = 100.0
    const [quantity, setQuantiy] = useState(1.0 * servingSize)


    const [numberOfServings, setNumberOfServings] = useState(1)

    const handleNumberOfServingsChange = (event: CustomEvent) => {
        const value = parseFloat(event.detail.value);
        console.log('value', value)
        if(!!value) {
            setNumberOfServings(value);

        }
        else {
            setNumberOfServings(1)
        }
        setQuantiy(numberOfServings * servingSize);
    };

    const handleAddToMealClick = () => {
        if (food.onAddFoodToMealClick) {
            const response = food.onAddFoodToMealClick(food.id, quantity);
            dispatch(addFoodReduce({
                mealId: parseInt(mealId, 10),
                food: {
                    id: food.id,
                    name: food.name,
                    quantity: quantity,
                    calories: calculateCaloriesForQuantity(food.protein, food.carbohydrate, food.lipid, quantity * servingSize)
                }
            }));
        }
        onClose();
    }

    return (
        <IonModal isOpen={isOpen} onDidDismiss={onClose}>
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonButton onClick={onClose}>Close</IonButton>
                    </IonButtons>
                    <IonTitle className="center-toolbar-title">{food.name}</IonTitle>
                    <IonButtons slot="end">
                        <IonButton onClick={handleAddToMealClick}>Add </IonButton>
                    </IonButtons>

                </IonToolbar>
            </IonHeader>
            <div className={"details-wrapper"}>
                <div className={"detail"}>
                    <p className={"left"}>Number of servings</p>
                    <IonInput className={"right"}
                              type="number" step="0.1"
                              min={1}
                              value={numberOfServings}
                              placeholder="1"
                              onIonChange={handleNumberOfServingsChange}
                    />
                </div>
                <div className={"detail"}>
                    <p className={"left"}>Serving size</p>
                    <p className={"right"}>{servingSize} g</p>
                </div>
                <div className="food-details">
                    <Circle protein={Math.floor(food.protein * quantity / 100)}
                            carbs={Math.floor(food.carbohydrate * quantity / 100)}
                            fats={Math.floor(food.lipid * quantity / 100)}
                            calories={calculateCaloriesForQuantity(food.protein, food.carbohydrate, food.lipid, quantity)}
                    />
                    <div>
                        <p>Protein</p>
                        <p className="macronutrient protein">{Math.floor(food.protein * quantity / 100)} g</p>
                    </div>
                    <div>
                        <p>Carbs</p>
                        <p className="macronutrient carbs">{Math.floor(food.carbohydrate * quantity / 100)} g</p>
                    </div>
                    <div>
                        <p>Fats</p>
                        <p className="macronutrient lipid">{Math.floor(food.lipid * quantity / 100)} g</p>
                    </div>
                </div>

            </div>
        </IonModal>
    );
};

export default AddFoodToMealModal;
