import React, {useEffect, useState} from "react";
import {useHistory, useParams} from "react-router";
import {RouteParams} from "./ListingFoodPage";
import {Food} from "../types/MealFood.types";
import {requestPostFoodToMeal} from "../services/actions/diaryDayAction";
import {useDispatch, useSelector} from "react-redux";
import {addFoodReduce, RootState} from "../store";
import {requestGetFoodDetails} from "../services/actions/foodAction";
import {IonButton, IonButtons, IonContent, IonHeader, IonInput, IonPage, IonTitle, IonToolbar} from "@ionic/react";
import Circle from "../components/CalorieCircle";
import {calculateCaloriesForQuantity} from "../services/utils";


const AddFoodPage: React.FC = () => {
    let history = useHistory();
    const loginState = useSelector((state: RootState) => state.login);
    const token = loginState.token;
    const goToPreviousPath = () => {
        history.goBack()
    }
    const {diaryDay, mealId, foodId} = useParams<RouteParams>()

    const [food, setFood] = useState<Food>();
    const handleAddFood = () => {
        requestPostFoodToMeal(diaryDay, mealId, parseInt(foodId), quantity, token).then(() =>
            dispatch(addFoodReduce({
                mealId: parseInt(mealId, 10),
                food: {
                    id: food!.id,
                    name: food!.name,
                    quantity: quantity,
                    calories: calculateCaloriesForQuantity(food!.protein, food!.carbohydrate, food!.lipid, quantity)
                }
            }))
        )

    }

    useEffect(() => {
        requestGetFoodDetails(parseInt(foodId)).then(response => {
            console.log(response.data);
            setFood(response.data);
        })
    }, [])

    const dispatch = useDispatch();

    const servingSize = 100.0
    const [quantity, setQuantiy] = useState(1.0 * servingSize)


    const [numberOfServings, setNumberOfServings] = useState(1)

    const handleNumberOfServingsChange = (event: CustomEvent) => {
        const value = parseFloat(event.detail.value);
        console.log('value', value)
        if (!!value) {
            setNumberOfServings(value);

        } else {
            setNumberOfServings(1)
        }
        setQuantiy(numberOfServings * servingSize);
    };

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonButton onClick={goToPreviousPath}>Back</IonButton>
                    </IonButtons>
                    <IonTitle className="center-toolbar-title">{food?.name}</IonTitle>
                    <IonButtons slot="end">
                        <IonButton onClick={handleAddFood}>Add</IonButton>
                    </IonButtons>

                </IonToolbar>
            </IonHeader>
            <IonContent>
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
                    {food &&
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
                    }
                </div>
            </IonContent>
        </IonPage>
    )
}

export default AddFoodPage;