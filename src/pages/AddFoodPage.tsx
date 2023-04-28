// AddFoodPage.tsx
import React, {useState} from 'react';
import {IonContent, IonFabButton, IonHeader, IonIcon, IonPage, IonTitle, IonToolbar} from "@ionic/react";
import CategoryComponent, {CategoryProps} from "../components/CategoryComponent";
import {add} from "ionicons/icons";
import axios from "axios";
import {useParams} from "react-router";
import {getDiaryDayMeals, postFoodToMeal} from "../services/actions/diaryDayAction";

// TODO
//  -  LocalDate - localDate
//  - POST - /api/diary/{date}
//  - create the diary_page - based on DiaryDayMealFoodDTO response
//  - go on AddFoodPage - create a post - /api/diary/diary_day_id/meal/meal_id/food/food_id - for moment
//  - get the response and go to diary_page

interface RouteParams {
    mealId: string
}

const baseURL = process.env.REACT_APP_JAVA_API_URL;

const AddFoodPage: React.FC = () => {
    console.log("Add Food Page")
    let {mealId} = useParams<RouteParams>()

    let handleAddFoodToMeal = async (mealId: string, foodId: number) => {
        return await postFoodToMeal(mealId, foodId);
    }


    let [selectedImage, setSelectedImage] = useState(new Blob());
    let [base64Image, setBase64Image] = useState('');
    let [categoryResult, setCategoryResult] = useState<CategoryProps[]>();

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Tab 1</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen>
                <IonHeader collapse="condense">

                </IonHeader>
                <div>
                    <div>
                        <h1>Add Food</h1>
                        <p>Here you can add a new food item.</p>

                    </div>
                    {selectedImage && (
                        <div>
                            <img
                                alt="not found"
                                width={"250px"}
                                src={URL.createObjectURL(selectedImage)}
                            />
                            <br />
                        </div>
                    )}

                    <input
                        type="file"
                        name="myImage"
                        onChange={(event) => {
                            // @ts-ignore
                            console.log(event.target.files[0]);
                            // @ts-ignore
                            setSelectedImage(event.target.files[0]);
                        }}
                    />
                </div>
                <IonFabButton onClick={() => {
                    let formData = new FormData();
                    formData.append('image', selectedImage);
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
                        setBase64Image(base64ImageString);


                    }).catch(err => {
                        console.log(err);
                    })
                }}>
                    <IonIcon icon={add}/>
                </IonFabButton>


                <div>
                    {base64Image ? (
                        <div>
                            <img src={`data:image/png;base64,${base64Image}`} alt="Rendered Image"/>
                            {
                                categoryResult ?
                                    categoryResult.map(categoryProps =>
                                        <CategoryComponent key={categoryProps.category_id}
                                                               category_id={categoryProps.category_id}
                                                               category_color={categoryProps.category_color}
                                                           onAddFoodToMealClick={(foodId) => handleAddFoodToMeal(mealId, foodId)}


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

export default AddFoodPage;