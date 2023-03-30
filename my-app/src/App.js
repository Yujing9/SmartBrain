import "./App.css";
import Navigation from "./Components/Navigation/Navigation";
import { Logo } from "./Components/Logo/Logo";
import { ImageLinkForm } from "./Components/ImageLinkForm/ImageLinkForm";
import { Rank } from "./Components/Rank/Rank";
import ParticlesBg from "particles-bg";
import { useState } from "react";
import { FaceRecognition } from "./Components/FaceRecognition/FaceRecognition";

// https://samples.clarifai.com/face-det.jpg

function App() {
  const [url, setUrl] = useState("");
  const [box, setBox] = useState({});
  const calculateFaceLocation = (data) => {
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById("inputimage");
    const width = Number(image.width);
    const height = Number(image.height);
    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - (clarifaiFace.right_col * width),
      bottomRow: height - (clarifaiFace.bottom_row * height)
    }
  };
  const displayFaceBox = (box) => {
    console.log(box)
    setBox(box);
  };
  // Connect to the charifai api
  const detectImage = (ImageURL) => {
    const PAT = "cda738f0768c47089890fca808d69ee9";
    const USER_ID = "cfi6zxrvdqao";
    const APP_ID = "test";
    const MODEL_ID = "face-detection";
    const MODEL_VERSION_ID = "6dc7e46bc9124c5c8824be4822abe105";
    const IMAGE_URL = ImageURL;

    const raw = JSON.stringify({
      user_app_id: {
        user_id: USER_ID,
        app_id: APP_ID,
      },
      inputs: [
        {
          data: {
            image: {
              url: IMAGE_URL,
            },
          },
        },
      ],
    });

    const requestOptions = {
      method: "POST",
      headers: {
        Accept: "application/json",
        Authorization: "Key " + PAT,
      },
      body: raw,
    };
    // todo:NEED TO FIND WHAT OUTPUT DO WE WANT
    fetch(
      `https://api.clarifai.com/v2/models/${MODEL_ID}/versions/${MODEL_VERSION_ID}/outputs`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) =>
      displayFaceBox(calculateFaceLocation(result)))
      .catch((error) => console.log("error", error));
  };
  const onInputChange = (event) => {
    const imageUrl = event.target.value;
    setUrl(imageUrl);
    console.log(url);
  };
  const onButtonSubmit = () => {
    detectImage(url);
    console.log("click");
  };
  return (
    <div className="App">
      <Navigation />
      <Logo />
      <Rank />
      <ImageLinkForm
        onInputChange={onInputChange}
        onButtonSubmit={onButtonSubmit}
      />
      <FaceRecognition imgUrl={url} box = {box}/>
      <ParticlesBg type="polygon" bg={true} />
    </div>
  );
}

export default App;
