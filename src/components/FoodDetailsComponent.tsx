import {Food} from "../pages/MealFood.types";
import React, {useState} from "react";
import {IonFabButton, IonIcon, IonInput} from "@ionic/react";
import {addCircleOutline, addSharp, settings} from "ionicons/icons";
import {useDispatch} from "react-redux";
import {addFoodReduce} from "../store";

interface FoodDetailsProps extends Food {
    mealId: number;
}


const FoodDetailsComponent: React.FC<FoodDetailsProps> = ({mealId, id, name, protein, carbohydrate, lipid, onAddFoodToMealClick}) => {
    const dispatch = useDispatch();

    const servingSize = 100.0
    const [quantity, setQuantiy] = useState(1 * servingSize )


    const [numberOfServings, setNumberOfServings] = useState(1)
    const handleNumberOfServingsChange = (event: CustomEvent) => {
        const value = parseInt(event.detail.value, 10);
        setNumberOfServings(value);
        setQuantiy(numberOfServings * servingSize);
    };

    const handleAddFoodClick = () => {
        if (onAddFoodToMealClick) {
            console.log("food id + ", id)
            const response = onAddFoodToMealClick(id, quantity);
            console.log(response);
            dispatch(addFoodReduce({ mealId: mealId, food:{id, name, protein, carbohydrate, lipid}}));
        }
    }

    return (
        <>
            <div>FoodDetails</div>
            <div>
                <h1>{name}</h1>
                <div style={{
                    display: "flex",
                    justifyContent: "space-between"
                }}>
                    <p style={{textAlign: "left"}}>
                        Serving size
                    </p>
                    {/*something to change the number of servings */}
                    <p style={{textAlign: "right"}}>
                        {servingSize} g
                    </p>
                </div>
                <div style={{
                    display: "flex",
                    justifyContent: "space-between"
                }}>
                    <p style={{textAlign: "left"}}>
                        Number of servings
                    </p>
                    <IonInput
                        type="number"
                        min="1"
                        value={numberOfServings}
                        placeholder="1"
                        onIonChange={handleNumberOfServingsChange}
                    />
                </div>
                <IonFabButton onClick={handleAddFoodClick}>
                    <IonIcon icon={settings}></IonIcon>
                </IonFabButton>
            </div>
        </>
    )


}

export default FoodDetailsComponent;