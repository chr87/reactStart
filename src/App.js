import React, { Component } from 'react';
import Navigation from './Components/Navigation/Navigation';
import Signin from './Components/Signin/Signin';
import Register from './Components/Register/Register';
import FaceRecognition from './Components/FaceRecognition/FaceRecognition';
import Logo from './Components/Logo/Logo';
import ImageLinkForm from './Components/ImageLinkForm/ImageLinkForm';
import Rank from './Components/Rank/Rank';
import './App.css';
import Particles from 'react-particles-js';
import Clarifai from 'clarifai';
const particlesOptions={
   particles:{
     number:{
       value:100,
       density:{
         enable:true,
         value_area:800
       }
     }
   }
  }
  const app = new Clarifai.App({
    apiKey: '055342b3af7a45b0b888a56f4ddaad23'
   });

class App extends Component {
constructor(){
  super();
  this.state={
    input:'',
    imageURL:'',
    box:{},
    route:'signin',
    isSignIn:false
  }
}
calculateFaceLocation=(data)=>{
 const clarifaiFace=data.outputs[0].data.regions[0].region_info.bounding_box;
 const img=document.getElementById("inputimage");
 const width=Number(img.width);
 const height=Number(img.height);
 return {
   left_Col:clarifaiFace.left_col*width,
   top_Row:clarifaiFace.top_row*height,
   right_Col:width-(clarifaiFace.right_col*width),
   bottom_Row:height-(clarifaiFace.bottom_row*height),
 }        
}
displayFaceBox=(box)=>{
  this.setState({box:box});
  console.log(this.state.box);
}
onInputChange=(event)=>{
  this.setState({input:event.target.value});
}
onButtonSubmit=()=>{
   
  this.setState({imageURL:this.state.input});
  
  app.models.predict(Clarifai.FACE_DETECT_MODEL, this.state.input)
  .then(response=>this.displayFaceBox(this.calculateFaceLocation(response)))
    .catch(err=>console.log(err)) 
}
onRouteChange=(route)=>{
if(this.route==='signin')this.setState('isSignIn',true);
this.setState({route:route});
}
  render() {
    return (
      <div className="App">
         <Particles className='particles'
              params= {particlesOptions}              
            />
         <Navigation onRouteChange={this.onRouteChange} route={this.state.route}/>
         { this.state.route==='home'
         ?<div>
         <Logo/>
         <Rank/>
         <ImageLinkForm onInputChange={this.onInputChange} onButtonSubmit={this.onButtonSubmit}/>  
         <FaceRecognition  imageURL={this.state.imageURL} box={this.state.box}/>
         </div>
         :( this.state.route==='signin'
         ?<Signin onRouteChange={this.onRouteChange}/>
        :<Register onRouteChange={this.onRouteChange}/>
         )      
         }
      </div>
    );
  }
}

export default App;
