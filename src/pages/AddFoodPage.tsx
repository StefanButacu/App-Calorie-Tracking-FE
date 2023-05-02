// AddFoodPage.tsx
import React, {useEffect, useState} from 'react';
import {
    IonButton,
    IonButtons,
    IonContent,
    IonFab,
    IonFabButton,
    IonHeader,
    IonIcon,
    IonPage,
    IonTitle,
    IonToolbar
} from "@ionic/react";
import CategoryComponent from "../components/CategoryComponent";
import {add, camera} from "ionicons/icons";
import axios from "axios";
import {useParams} from "react-router";
import {requestGetDiaryDayMeals, requestPostFoodToMeal} from "../services/actions/diaryDayAction";
import {CategoryProps} from "../components/Category.types";
import { Camera, CameraResultType } from '@capacitor/camera';
import {usePhotoGallery} from "../hooks/usePhotoGallery";
import {format} from "date-fns";
import {requestGetMeal} from "../services/actions/mealAction";
import MealComponent from "../components/MealComponent";
import {MealDetailsProps} from "./MealFood.types";

interface RouteParams {
    mealId: string
}

const baseURL = process.env.REACT_APP_JAVA_API_URL;

const AddFoodPage: React.FC = () => {
    let {mealId} = useParams<RouteParams>()


    let handleAddFoodToMeal = async (mealId: string, foodId: number, quantityId: number) => {
        return await requestPostFoodToMeal(mealId, foodId, quantityId);
    }
    const handleGetMeal = async (mealId: string) => {
        return await requestGetMeal(mealId);
    }


    let [imageUploadedByUser, setImageUploadedByUser] = useState(new Blob());
    let [segmentedImage, setSegmentedImage] = useState('');
    let [categoryResult, setCategoryResult] = useState<CategoryProps[]>();
    let [mealDetails, setMealDetails] = useState<MealDetailsProps>();
    const {photoBase64, takePhoto} = usePhotoGallery();

    useEffect(() => {
        if(photoBase64) {
            setImageUploadedByUser(convertBase64ToBlob(photoBase64))
        }
    }, [photoBase64])

    useEffect( () => {
        handleGetMeal(mealId).then((response) => {
            setMealDetails(response.data);
        }).catch(err => console.log("Error" + err))
    }, [mealId])


    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>{mealDetails?.name}</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen>
                {photoBase64 ? (
                    <img src={`data:image/jpeg;base64,${photoBase64}`} width={"256px"} height={"256px"} />
                ) : (
                    <></>
                )}

                <div>
                    <div>
                        <h1>Add Food</h1>
                        <p>Here you can add a new food item.</p>
                        <IonFabButton onClick={() => {
                            takePhoto();
                        }}>
                            <IonIcon icon={camera}/>
                        </IonFabButton>
                    </div>
                </div>
                <IonFabButton onClick={() => {
                    let formData = new FormData();
                    formData.append('image', imageUploadedByUser);
                    axios.post(baseURL + '/image', Object.fromEntries(formData), {
                        headers: {
                            'Content-type': 'multipart/form-data'
                        }
                    }).then(r => {
                        console.log(r)
                        let result_category_data = r.data.category;
                        let categoryList: CategoryProps[] = [];
                        for (const key in result_category_data) {
                            const category_id = parseInt(key);
                            const category_color = result_category_data[key];
                            categoryList.push({
                                category_id,
                                category_color,
                            });
                        }
                        setCategoryResult(categoryList)
                        const base64ImageString = r.data.overlay;
                        setSegmentedImage(base64ImageString);
                    }).catch(err => {
                        console.log(err);
                    })
                }}>
                    <IonIcon icon={add}/>
                </IonFabButton>
                <div>
                    {segmentedImage ? (
                        <div>
                            <img src={`data:image/png;base64,${segmentedImage}`} alt="Rendered Image"/>
                            {
                                categoryResult ?
                                    categoryResult.map(categoryProps =>
                                        <CategoryComponent key={categoryProps.category_id}
                                                               category_id={categoryProps.category_id}
                                                               category_color={categoryProps.category_color}
                                                           mealId = {parseInt(mealId, 10)}
                                                           onAddFoodToMealClick={(foodId, quantity) => handleAddFoodToMeal(mealId, foodId, quantity)}
                                        />
                                    ) :
                                    <p>Loading categories</p>
                            }

                        </div>

                    ) : (
                        <p>Loading image...</p>
                    )}


                </div>
            </IonContent>
        </IonPage>
    );

};
/**
 * Convert BASE64 to BLOB
 * @param base64Image Pass Base64 image data to convert into the BLOB
 */
function convertBase64ToBlob(base64Image: string) {
    const decodedData = atob(base64Image);
    const uInt8Array = new Uint8Array(decodedData.length);
    for (let i = 0; i < decodedData.length; ++i) {
        uInt8Array[i] = decodedData.charCodeAt(i);
    }
    return new Blob([uInt8Array], { type: "image/jpeg" });
}

export default AddFoodPage;