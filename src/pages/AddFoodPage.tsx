// AddFoodPage.tsx
import React, {useEffect, useRef, useState} from 'react';
import {
    IonContent, IonFab,
    IonFabButton,
    IonHeader,
    IonIcon, IonInfiniteScroll, IonInfiniteScrollContent, IonList,
    IonPage, IonSearchbar,
    IonTitle,
    IonToolbar, SearchbarCustomEvent
} from "@ionic/react";
import CategoryComponent from "../components/CategoryComponent";
import {add, camera, fastFoodOutline} from "ionicons/icons";
import axios from "axios";
import {useParams} from "react-router";
import {requestPostFoodToMeal} from "../services/actions/diaryDayAction";
import {CategoryProps} from "../types/Category.types";
import {usePhotoGallery} from "../hooks/usePhotoGallery";
import {requestGetMeal} from "../services/actions/mealAction";
import {Food, MealDetailsProps} from "../types/MealFood.types";
import "../assets/styles/add-food-page.scss"
import {requestGetAvailableFoods, requestGetFoodsByName} from "../services/actions/foodAction";
import AvailableFoodComponent from "../components/AvailableFood";

export interface RouteParams {
    mealId: string
}

const baseURL = process.env.REACT_APP_JAVA_API_URL;

const AddFoodPage: React.FC = () => {
    const {mealId} = useParams<RouteParams>()
    const [imageUploadedByUser, setImageUploadedByUser] = useState(new Blob());
    const [segmentedImage, setSegmentedImage] = useState('');
    const [categoryResult, setCategoryResult] = useState<CategoryProps[]>();
    const [mealDetails, setMealDetails] = useState<MealDetailsProps>();
    const {photoBase64, takePhoto} = usePhotoGallery();
    const [page, setPage] = useState<number>(0);
    const [availableFoods, setAvailableFoods] = useState<Food[]>([]);
    const [allPagesFetched, setAllPagesFetched] = useState<boolean>(false);
    const [searchFoodName, setSearchFoodName] = useState<string>('');
    const refToTop = useRef<HTMLHeadingElement>(null);


    const handleAddFoodToMeal = async (mealId: string, foodId: number, quantityId: number) => {
        return await requestPostFoodToMeal(mealId, foodId, quantityId);
    }
    const handleGetMeal = async (mealId: string) => {
        return await requestGetMeal(mealId);
    }

    function fetchAvailableFoods() {
        requestGetAvailableFoods(page)
            .then(response => {
                const newAvailableFoods = response.data;
                setAvailableFoods((prevState) => [...prevState, ...newAvailableFoods])
                setPage((prevPage) => prevPage + 1)
                if (newAvailableFoods.length < 20) {
                    setAllPagesFetched(true);
                }
            })
            .catch(err => console.log("Error:", err))
    }

    function fetchFoodsByName(searchFoodName: string) {
        requestGetFoodsByName(searchFoodName)
            .then(response => setAvailableFoods(response?.data))
            .catch(err => console.log('pula', err))
    }

    useEffect(() => {
        if (photoBase64) {
            setImageUploadedByUser(convertBase64ToBlob(photoBase64))
        }
    }, [photoBase64])

    useEffect(() => {
        fetchAvailableFoods();
    }, [])

    async function loadMore(event: CustomEvent<void>) {
        setTimeout(() => {
            fetchAvailableFoods();
            (event.target as HTMLIonInfiniteScrollElement).complete();
        }, 1000);
    }


    useEffect(() => {
        handleGetMeal(mealId).then((response) => {
            setMealDetails(response.data);
        }).catch(err => console.log("Error" + err))
    }, [mealId])

    const handleSearch = (event: SearchbarCustomEvent) => {
        let inputFoodName = event.target.value;
        setSearchFoodName(inputFoodName ? inputFoodName : '');
        if (!!inputFoodName) {
            setAvailableFoods([])
            setPage(0);
            setAllPagesFetched(true);
            fetchFoodsByName(inputFoodName);
        } else {
            setAvailableFoods([])
            setPage(0);
            setAllPagesFetched(false);
            fetchAvailableFoods();
        }
    };

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>{mealDetails?.name}</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent id="content" className="add-meal-page" fullscreen>
                <h1 ref={refToTop}></h1> {/* add a ref to the h1 element */}
                <p>Here you can add your meal.</p>
                <div className="photo-upload-section">
                    {photoBase64 ? (
                        <img src={`data:image/jpeg;base64,${photoBase64}`} width={"256px"} height={"256px"}
                             alt="Your food"/>
                    ) : (
                        // <div className="photo-preview"></div>
                        <></>
                    )}
                </div>

                <IonFabButton onClick={() => {
                    const formData = new FormData();
                    formData.append('image', imageUploadedByUser);
                    axios.post(baseURL + '/image', Object.fromEntries(formData), {
                        headers: {
                            'Content-type': 'multipart/form-data'
                        }
                    }).then(r => {
                        console.log(r)
                        const result_category_data = r.data.category;
                        console.log("category: ", result_category_data)
                        const categoryList: CategoryProps[] = [];
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
                        <>
                            <div>
                                <img src={`data:image/png;base64,${segmentedImage}`} alt="Your meal segmented"/>
                                <p>Is this what are you eating?</p>
                                <div>
                                    {
                                        categoryResult ?
                                            categoryResult.map(categoryProps =>
                                                <CategoryComponent key={categoryProps.category_id}
                                                                   category_id={categoryProps.category_id}
                                                                   category_color={categoryProps.category_color}
                                                                   mealId={parseInt(mealId, 10)}
                                                                   onAddFoodToMealClick={(foodId, quantity) => handleAddFoodToMeal(mealId, foodId, quantity)}
                                                />)
                                            : <></>
                                    }
                                </div>
                            </div>
                        </>
                    ) : (
                        <></>
                    )}
                </div>
                <div className="food-selection-section">
                    <IonSearchbar placeholder="Search for a food"
                                  value={searchFoodName}
                                  show-clear-button="focus"
                                  onIonChange={event => handleSearch(event)}/>
                    <IonList>
                        {
                            availableFoods.length > 0 ?
                                availableFoods.map(food =>
                                    <AvailableFoodComponent key={food.id} {...food}
                                                            onAddFoodToMealClick={(foodId, quantity) => handleAddFoodToMeal(mealId, foodId, quantity)}
                                    />
                                ) : <p>No results</p>
                        }
                    </IonList>
                    <div style={{
                        position: "fixed",
                        bottom: "20px",
                        right: "20px",
                    }}>
                        <IonFab slot="bottom" vertical="bottom" horizontal="end">
                            <IonFabButton onClick={() => {
                                takePhoto().then(() => {
                                    if (refToTop.current) {
                                        setTimeout(() => {
                                            if (refToTop.current)
                                                refToTop.current.scrollIntoView({behavior: 'smooth'})
                                        }, 100)
                                    }
                                })

                            }}>
                                <IonIcon icon={camera}/>
                            </IonFabButton>
                        </IonFab>
                    </div>
                    <IonInfiniteScroll disabled={allPagesFetched}
                                       onIonInfinite={(event: CustomEvent<void>) => loadMore(event)}>
                        <IonInfiniteScrollContent loadingSpinner={null}
                                                  loadingText="Loading more foods...">
                            <div>
                                <IonIcon icon={fastFoodOutline} size="large" className="my-rotate"/>
                            </div>
                        </IonInfiniteScrollContent>
                    </IonInfiniteScroll>
                </div>
            </IonContent>
        </IonPage>
    )
        ;

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
    return new Blob([uInt8Array], {type: "image/jpeg"});
}

export default AddFoodPage;