import React, {useEffect, useState} from "react";
import {useHistory, useParams} from "react-router";
import {RouteParams} from "./ListingFoodPage";
import {Food, FoodUpdate} from "../types/MealFood.types";
import {useDispatch, useSelector} from "react-redux";
import {removeFoodReduce, RootState, updateFoodFromMealReduce} from "../store";
import {
    requestDeleteFoodFormMeal,
    requestGetFoodDetails,
    requestGetFoodFromMeal,
    requestUpdateFoodFromMeal
} from "../services/actions/foodAction";
import {
    IonButtons,
    IonContent,
    IonHeader,
    IonIcon,
    IonInput,
    IonPage,
    IonTitle,
    IonToolbar,
    ToastOptions,
    useIonToast
} from "@ionic/react";
import Circle from "../components/CalorieCircle";
import {calculateCaloriesForQuantity} from "../services/utils";
import {checkmarkOutline, trashBin} from "ionicons/icons";


const EditFoodPage: React.FC = () => {
    let history = useHistory();
    const dispatch = useDispatch();
    const loginState = useSelector((state: RootState) => state.login);
    const token = loginState.token;
    const {diaryDay, mealId, foodId} = useParams<RouteParams>()
    const [present] = useIonToast();
    const servingSize = 100.0
    const [numberOfServings, setNumberOfServings] = useState(1)

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

    const [foodDetails, setFoodDetails] = useState<FoodUpdate>({});


    const handleDeleteFood = () => {
        requestDeleteFoodFormMeal(diaryDay, mealId, foodId, token).then(() => {
                dispatch(removeFoodReduce({
                    mealId: parseInt(mealId),
                    foodId: parseInt(foodId)
                }))
                presentToast(deleteOptions)
            }
        )
    }
    const handleUpdateFood = () => {
        requestUpdateFoodFromMeal(diaryDay, mealId, parseInt(foodId), foodDetails.quantity!, token).then(() => {

            dispatch(updateFoodFromMealReduce({
                mealId: parseInt(mealId),
                foodId: parseInt(foodId),
                quantity: Math.floor(foodDetails.quantity! * 100) / 100 ,
                calories: calculateCaloriesForQuantity(foodDetails.proteinPerCent!, foodDetails.carbohydratePerCent!, foodDetails.lipidPerCent!, foodDetails.quantity!)
            }))
            presentToast(updateOptions)
        })
    }

    useEffect(() => {
        requestGetFoodFromMeal(diaryDay, mealId, foodId, token).then(response => {
            setFoodDetails(response.data);
            setNumberOfServings(response.data.quantity / servingSize)
        })
    }, [])


    const handleNumberOfServingsChange = (event: CustomEvent) => {
        const value = parseFloat(event.detail.value);
        console.log('value', value)
        if (!!value) {
            setNumberOfServings(value);

        } else {
            setNumberOfServings(1)
        }
        setFoodDetails({...foodDetails, quantity: numberOfServings * servingSize});
    };


    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonIcon onClick={handleDeleteFood} icon={trashBin} size="large"/>
                    </IonButtons>
                    <IonTitle>{foodDetails?.name}</IonTitle>
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
                                  min={0}
                                  value={numberOfServings}
                                  placeholder="1"
                                  onIonChange={handleNumberOfServingsChange}
                        />
                    </div>
                    <div className={"detail"}>
                        <p className={"left"}>Serving size</p>
                        <p className={"right"}>{servingSize} g</p>
                    </div>
                    {foodDetails &&
                        <div className="food-details">
                            <Circle protein={Math.floor(foodDetails.proteinPerCent! * foodDetails.quantity! / 100)}
                                    carbs={Math.floor(foodDetails.carbohydratePerCent! * foodDetails.quantity! / 100)}
                                    fats={Math.floor(foodDetails.lipidPerCent! * foodDetails.quantity! / 100)}
                                    calories={calculateCaloriesForQuantity(foodDetails.proteinPerCent!, foodDetails.carbohydratePerCent!, foodDetails.lipidPerCent!, foodDetails.quantity!)}
                            />
                            <div>
                                <p>Protein</p>
                                <p className="macronutrient protein">{Math.floor(foodDetails.proteinPerCent! * foodDetails.quantity! / 100)} g</p>
                            </div>
                            <div>
                                <p>Carbs</p>
                                <p className="macronutrient carbs">{Math.floor(foodDetails.carbohydratePerCent! * foodDetails.quantity! / 100)} g</p>
                            </div>
                            <div>
                                <p>Fats</p>
                                <p className="macronutrient lipid">{Math.floor(foodDetails.lipidPerCent! * foodDetails.quantity! / 100)} g</p>
                            </div>
                        </div>
                    }
                </div>
            </IonContent>
        </IonPage>
    )
}

export default EditFoodPage;