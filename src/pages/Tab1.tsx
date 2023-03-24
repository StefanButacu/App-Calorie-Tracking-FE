import {IonButton, IonContent, IonFabButton, IonHeader, IonIcon, IonPage, IonTitle, IonToolbar} from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import './Tab1.css';
import {useEffect, useRef, useState} from "react";
import axios from "axios";
import {add} from "ionicons/icons";

const baseURL = "http://localhost:8080";


const Tab1: React.FC = () => {

    // const canvasRef = useRef<HTMLCanvasElement>(null);
    //
    //
    // let [image, setImage] = useState<any>();
    // useEffect( () => {
    //     console.log("Use Effect2");
    //     axios.get(baseURL + '/image', {responseType: 'blob'}).then( (response) => {
    //         console.log(response.data);
    //            setImage(response.data);
    //         }
    //     )
    // },[])
    // const [selectedImage, setSelectedImage] = useState(new Blob());
    // let [black, setBlack] = useState<any>();
    // useEffect( () => {
    //     console.log("Use Effect Black");
    //     axios.get(baseURL + '/black', {responseType: 'blob'}).then( (response) => {
    //             console.log("PULA" + response.data);
    //             setBlack(response.data);
    //
    //         const canvas: HTMLCanvasElement = canvasRef.current!;
    //         const ctx: any = canvas?.getContext("2d");
    //         for(let y= 0 ; y < response.data.length; y++){
    //             for(let x = 0 ; x < response.data[y].length; x++){
    //                 const [r,g,b] = response.data[y][x];
    //                 ctx.fillStyle = `rgb(${r}, ${g}, ${b})`
    //                 ctx.fillRect(x, y, 1, 1)
    //             }
    //         }
    //
    //         }
    //     )
    // },[])


    const [base64Image, setBase64Image] = useState('');

    useEffect(() => {
        // Fetch the Base64 encoded image from your API or backend
        const fetchImage = async () => {
            try {
                const response = await fetch('http://localhost:8080/black');
                const base64ImageString = await response.text();
                setBase64Image(base64ImageString);
            } catch (error) {
                console.error('Error fetching image:', error);
            }
        };
        fetchImage();
    }, []);

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
          {/*{*/}
          {/*    image*/}
          {/*    &&*/}
          {/*    <img src={URL.createObjectURL(image)} />*/}
          {/*}*/}
          <div>
              <h1>Upload and Display Image usign React Hook's</h1>

              {/*{selectedImage && (*/}
              {/*    <div>*/}
              {/*        <img*/}
              {/*            alt="not found"*/}
              {/*            width={"250px"}*/}
              {/*            src={URL.createObjectURL(selectedImage)}*/}
              {/*        />*/}
              {/*        <br />*/}
              {/*    </div>*/}
              {/*)}*/}

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
          {/*<IonFabButton onClick={() => {*/}
          {/*    console.log("+ CLICK")*/}
          {/*    let formData = new FormData();*/}
          {/*    formData.append('image', selectedImage);*/}

          {/*    console.log(selectedImage)*/}
          {/*    axios.post(baseURL + '/image', Object.fromEntries(formData), {*/}
          {/*        headers: {*/}
          {/*            'Content-type': 'multipart/form-data'*/}
          {/*        }*/}
          {/*    }).then(r => {*/}
          {/*        let response_image = r.data;*/}
          {/*        const response_image_data = response_image.flatMap((row: any[]) => row.map(pixel => pixel.join(',')));*/}
          {/*    }).catch(err => console.log(err))*/}
          {/*}}  >*/}
          {/*    <IonIcon icon={add} />*/}
          {/*</IonFabButton>*/}

          {/*{*/}
          {/*    black*/}
          {/*    &&*/}
          {/*    <img src={URL.createObjectURL(black)} />*/}
          {/*}*/}

          {/*  <canvas ref={canvasRef} width={150} height={150} />*/}

          <div>
              {base64Image ? (
                  <img src={`data:image/png;base64,${base64Image}`} alt="Rendered Image" />
              ) : (
                  <p>Loading image...</p>
              )}
          </div>

          <ExploreContainer name="Tab 1 page" />
      </IonContent>
    </IonPage>
  );
};

export default Tab1;
