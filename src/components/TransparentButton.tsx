import React from 'react';
import { IonButton } from '@ionic/react';
import forkSvg from '../assets/images/fork.svg';
import '../assets/styles/globals.scss'

const TransparentButton = () => {
    return (
        <IonButton className="transparent-button" size="small" fill="clear" style={{width: "50px", height:"30px", paddingRight: "0px", marginRight: "0px"}} >
            <img src={forkSvg} alt="Fork Icon" />
        </IonButton>
    );
};

export default TransparentButton;