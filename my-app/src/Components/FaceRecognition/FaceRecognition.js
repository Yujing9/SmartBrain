import React from 'react';
import './FaceRecognition.css';
export function FaceRecognition({imgUrl, box}){
    return (
        <div className = "center ma">
        <div className = "absoluate mt2">
            <img id = "inputimage" src={imgUrl} alt="" width="500px" height = "auto"></img>
            <div className='bounding-box' style={{top: box.topRow, right: box.rightCol, bottom: box.bottomRow, left: box.leftCol}}></div>
            </div>
        </div>
        
    );
}