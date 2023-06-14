import React, {useState} from 'react';
import {
    IonButton,
    IonButtons,
    IonContent,
    IonHeader,
    IonInput,
    IonItem,
    IonLabel,
    IonPage,
    IonTitle,
    IonToolbar,
} from '@ionic/react';
import {FoodUpdate} from "../types/MealFood.types";

const AddFoodModal = ({
                          onDismiss, foodName
                      }: {
    onDismiss: (data?: FoodUpdate | null | undefined | number, role?: string) => void,
    foodName: string
}) => {
    const [foodUpdate, setFoodUpdate] = useState<FoodUpdate>({});

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonButton color="medium" onClick={() => onDismiss(null, 'cancel')}>
                            Cancel
                        </IonButton>
                    </IonButtons>
                    <IonTitle>{foodName}</IonTitle>
                    <IonButtons slot="end">
                        <IonButton onClick={() => onDismiss(foodUpdate, 'confirm')} strong={true}>
                            Confirm
                        </IonButton>
                    </IonButtons>
                </IonToolbar>
            </IonHeader>
            <IonContent className="ion-padding">
                <IonItem>
                    <IonLabel position="stacked">Enter protein percentage:</IonLabel>
                    <IonInput type="number" placeholder="Protein grams" min="0" onIonChange={(event: CustomEvent) => {
                        const value = parseFloat(event.detail.value);
                        if (!!value) {
                            setFoodUpdate({...foodUpdate, proteinPerCent: value});
                        }
                    }}/>
                </IonItem>
                <IonItem>
                    <IonLabel position="stacked">Enter carbohydrate percentage:</IonLabel>
                    <IonInput type="number" placeholder="Carbohydrate grams" min="0"
                              onIonChange={(event: CustomEvent) => {
                                  const value = parseFloat(event.detail.value);
                                  if (!!value) {
                                      setFoodUpdate({...foodUpdate, carbohydratePerCent: value});
                                  }
                              }}/>
                </IonItem>
                <IonItem>
                    <IonLabel position="stacked">Enter lipid grams percentage:</IonLabel>
                    <IonInput type="number" placeholder="Lipid grams" min="0" onIonChange={(event: CustomEvent) => {
                        const value = parseFloat(event.detail.value);
                        if (!!value) {
                            setFoodUpdate({...foodUpdate, lipidPerCent: value});
                        }
                    }}/>
                </IonItem>
            </IonContent>
        </IonPage>
    );
};

export default AddFoodModal;