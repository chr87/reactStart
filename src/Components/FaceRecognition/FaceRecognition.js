import React from 'react';
import './FaceRecognition.css';
const FaceRecognition=({imageURL,box})=>{
    return(
         <div className="center ma"> 
         <div className="absolute mt2">
           <img id="inputimage"alt="" src={imageURL} width="500px" height="auto"/>
           <div className="boundingbox" style={{top:box.top_Row,right:box.right_Col,bottom:box.bottom_Row,left:box.left_Col}}></div>
           </div>
         </div>
    );
}
export default FaceRecognition;