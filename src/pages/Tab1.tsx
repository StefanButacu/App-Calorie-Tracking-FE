import {IonButton, IonContent, IonFabButton, IonHeader, IonIcon, IonPage, IonTitle, IonToolbar} from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import './Tab1.css';
import {useEffect, useState} from "react";
import axios from "axios";
import {add} from "ionicons/icons";

const baseURL = "http://localhost:8080/image";


const Tab1: React.FC = () => {

    let [image, setImage] = useState<any>();
    useEffect( () => {
        console.log("Use Effect2");
        axios.get(baseURL, {responseType: 'blob'}).then( (response) => {
            console.log(response.data);
               setImage(response.data);
            }
        )
    },[])
    const [selectedImage, setSelectedImage] = useState(new Blob());




  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Tab 1</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Tab 1</IonTitle>
          </IonToolbar>
        </IonHeader>
          {
              image
              &&
              <img src={URL.createObjectURL(image)} />
          }
          <div>
              <h1>Upload and Display Image usign React Hook's</h1>

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
              console.log("+ CLICK")
              let formData = new FormData();
              formData.append('image', selectedImage);

              console.log(selectedImage)
              axios.post(baseURL, Object.fromEntries(formData), {
                  headers: {
                      'Content-type': 'multipart/form-data'
                  }
              }).then(r => console.log("Success"+ r.data)).catch(err => console.log(err))
          }}  >
              <IonIcon icon={add} />
          </IonFabButton>

          <ExploreContainer name="Tab 1 page" />
      </IonContent>
    </IonPage>
  );
};

export default Tab1;
