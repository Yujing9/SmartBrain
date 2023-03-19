import './App.css';
import Navigation from './Components/Navigation/Navigation';
import {Logo} from './Components/Logo/Logo';
import {ImageLinkForm} from './Components/ImageLinkForm/ImageLinkForm';
import {Rank} from './Components/Rank/Rank';
import ParticlesBg from 'particles-bg'
import { useState } from 'react';

const detectImage = (ImageURL)=>{
  // Your PAT (Personal Access Token) can be found in the portal under Authentification
const PAT = 'cda738f0768c47089890fca808d69ee9';
// Specify the correct user_id/app_id pairings
// Since you're making inferences outside your app's scope
const USER_ID = 'cfi6zxrvdqao';       
const APP_ID = 'test';
// Change these to whatever model and image URL you want to use
const MODEL_ID = 'face-detection';
const MODEL_VERSION_ID = '6dc7e46bc9124c5c8824be4822abe105';    
const IMAGE_URL = ImageURL;

const raw = JSON.stringify({
  "user_app_id": {
    "user_id": USER_ID,
    "app_id": APP_ID
  },
  "inputs": [
      {
          "data": {
              "image": {
                  "url": IMAGE_URL
              }
          }
      }
  ]
});

const requestOptions = {
    method: 'POST',
    headers: {
        'Accept': 'application/json',
        'Authorization': 'Key ' + PAT
    },
    body: raw
};

// NOTE: MODEL_VERSION_ID is optional, you can also call prediction with the MODEL_ID only
// https://api.clarifai.com/v2/models/{YOUR_MODEL_ID}/outputs
// this will default to the latest version_id

fetch(`https://api.clarifai.com/v2/models/${MODEL_ID}/versions/${MODEL_VERSION_ID}/outputs`, requestOptions)
    .then(response => response.text())
    .then(result => console.log(result))
    .catch(error => console.log('error', error));
  
}

function App() {
  const [url,setUrl] = useState('https://samples.clarifai.com/face-det.jpg');
  const onInputChange = (event)=>{
    const imageUrl = event.target.value
    setUrl(imageUrl)
    console.log(url)
    
  }
  const onButtonSubmit = ()=>{
    detectImage(url)
    console.log("click")

  }
  return (
    <div className="App">
      <Navigation />
      <Logo />
      <Rank />
      <ImageLinkForm onInputChange = {onInputChange} onButtonSubmit ={onButtonSubmit}/>
      <ParticlesBg type="polygon" bg={true} />
    </div>
    
  );
}

export default App;
