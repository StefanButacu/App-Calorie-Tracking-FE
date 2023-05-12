import React, {useState, useRef} from 'react';
import {
    IonButtons,
    IonButton,
    IonHeader,
    IonContent,
    IonToolbar,
    IonTitle,
    IonPage,
    IonItem,
    IonLabel,
    IonInput,
    useIonModal,
} from '@ionic/react';
import {OverlayEventDetail} from '@ionic/core/components';
import {FoodUpdate} from "../types/MealFood.types";

const AddFoodModal = ({
                          onDismiss, foodName
                      }: {
    onDismiss: (data?: FoodUpdate | null | undefined | number, role?: string) => void,
    foodName: string
}) => {
    const [foodUpdate, setFoodUpdate] = useState<FoodUpdate>({});

    const inputRef = useRef<HTMLIonInputElement>(null);
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
                    <IonLabel position="stacked">Enter protein grams per cent:</IonLabel>
                    <IonInput type="number" placeholder="Protein grams" min="0" onIonChange={(event: CustomEvent) => {
                        const value = parseFloat(event.detail.value);
                        console.log('value', value)
                        if (!!value) {
                            setFoodUpdate({...foodUpdate, proteinPerCent: value});
                        }
                    }}/>
                </IonItem>
                <IonItem>
                    <IonLabel position="stacked">Enter carbohydrate per cent:</IonLabel>
                    <IonInput type="number" placeholder="Carbohydrate grams" min="0"
                              onIonChange={(event: CustomEvent) => {
                                  const value = parseFloat(event.detail.value);
                                  console.log('value', value)
                                  if (!!value) {
                                      setFoodUpdate({...foodUpdate, carbohydratePerCent: value});
                                  }
                              }}/>
                </IonItem>
                <IonItem>
                    <IonLabel position="stacked">Enter lipid grams per cent:</IonLabel>
                    <IonInput type="number" placeholder="Lipid grams" min="0" onIonChange={(event: CustomEvent) => {
                        const value = parseFloat(event.detail.value);
                        console.log('value', value)
                        if (!!value) {
                            setFoodUpdate({...foodUpdate, lipidPerCent: value});
                        }
                    }}/>
                </IonItem>
            </IonContent>
        </IonPage>
    );
};
//
// function Example() {
//     const [present, dismiss] = useIonModal(ModalExample, {
//         onDismiss: (data: string, role: string) => dismiss(data, role),
//     });
//     const [message, setMessage] = useState('This modal example uses the modalController to present and dismiss modals.');
//
//     function openModal() {
//         present({
//             onWillDismiss: (ev: CustomEvent<OverlayEventDetail>) => {
//                 if (ev.detail.role === 'confirm') {
//                     setMessage(`Hello, ${ev.detail.data}!`);
//                 }
//             },
//         });
//     }
//
//     return (
//         <IonPage>
//             <IonHeader>
//                 <IonToolbar>
//                     <IonTitle>Controller Modal</IonTitle>
//                 </IonToolbar>
//             </IonHeader>
//             <IonContent className="ion-padding">
//                 <IonButton expand="block" onClick={() => openModal()}>
//                     Open
//                 </IonButton>
//                 <p>{message}</p>
//             </IonContent>
//         </IonPage>
//     );
// }

export default AddFoodModal;