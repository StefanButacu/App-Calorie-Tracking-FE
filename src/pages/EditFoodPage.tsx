import React, {useEffect, useState} from "react";
import {useHistory, useParams} from "react-router";
import {RouteParams} from "./ListingFoodPage";
import {Food} from "../types/MealFood.types";
import {useDispatch, useSelector} from "react-redux";
import {removeFoodReduce, RootState} from "../store";
import {requestDeleteFoodFormMeal, requestGetFoodDetails} from "../services/actions/foodAction";
import {
    IonBackButton,
    IonButtons,
    IonContent,
    IonHeader,
    IonIcon,
    IonInput,
    IonPage,
    IonTitle,
    IonToolbar, ToastOptions,
    useIonToast
} from "@ionic/react";
import Circle from "../components/CalorieCircle";
import {calculateCaloriesForQuantity} from "../services/utils";
import {caretBack, checkmarkOutline, trashBin} from "ionicons/icons";


const EditFoodPage: React.FC = () => {
    let history = useHistory();
    const dispatch = useDispatch();
    const loginState = useSelector((state: RootState) => state.login);
    const token = loginState.token;
    const {diaryDay, mealId, foodId} = useParams<RouteParams>()
    const [present] = useIonToast();

    const deleteOptions: ToastOptions = {
        message: 'Deleted successfully!',
        duration: 2000,
        position: 'top',
        icon: checkmarkOutline,
        color: "success",
    }
    const updateOptions: ToastOptions = {
        message: 'Update successfully!',
        duration: 2000,
        position: 'top',
        icon: checkmarkOutline,
        color: "success",
    }
    const presentToast = (options: ToastOptions) => {
        present(options).then(() => history.goBack());
    };

    const [food, setFood] = useState<Food>();
    const handleDeleteFood = () => {
        requestDeleteFoodFormMeal(diaryDay, mealId, foodId, token).then(() => {
                dispatch(removeFoodReduce({
                    mealId: parseInt(mealId, 10),
                    foodId: food!.id
                }))
                presentToast(deleteOptions)
            }
        )
    }
    const handleUpdateFood = () => {
        presentToast(updateOptions)
    }


    useEffect(() => {
        requestGetFoodDetails(parseInt(foodId)).then(response => {
            console.log(response.data);
            setFood(response.data);
        })
    }, [])


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
                        <IonIcon onClick={handleDeleteFood} icon={trashBin} size="large"/>
                    </IonButtons>
                    <IonTitle>{food?.name}</IonTitle>
                    <IonButtons slot="end">
                        <IonIcon onClick={handleUpdateFood} icon={checkmarkOutline} size="large"/>
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

export default EditFoodPage;