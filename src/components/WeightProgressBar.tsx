import React from 'react';
import {IonProgressBar} from "@ionic/react";
import "../assets/styles/user.scss"

interface WeightProgressBarProps {
    startWeight: number;
    goalWeight: number;
    currentWeight: number;
}

const WeightProgressBar: React.FC<WeightProgressBarProps> = ({
                                                                 startWeight,
                                                                 goalWeight,
                                                                 currentWeight
                                                             }) => {

    const progress = (currentWeight - startWeight) / (goalWeight - startWeight);
    return (
        <div>
            <div style={{width: "80%", display: "flex", margin: "0 auto"}}>
                <IonProgressBar type="determinate" value={progress} className={"weight-progressbar"}/>
            </div>
            <div style={{display: "flex", justifyContent: "space-between", width: "90%", margin: "0 auto"}}>
                <div>{startWeight}</div>
                <div style={{display: "flex", flexDirection: "column", textAlign: "center"}}>
                    <div>
                        {!!currentWeight && (
                            <>
                                {goalWeight - startWeight > 0 ?
                                    `${Math.max(currentWeight - startWeight, 0)} kg gained`
                                    : `${Math.max(Math.abs(currentWeight - startWeight), 0)} kg lost`
                                }
                            </>
                        )}


                    </div>
                    {
                        !!currentWeight && (
                            `${currentWeight} kg`
                        )}
                </div>
                <div>{goalWeight}</div>
            </div>
        </div>
    );
};

export default WeightProgressBar;
