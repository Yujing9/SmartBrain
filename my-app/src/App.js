import './App.css';
import Navigation from './Components/Navigation/Navigation';
import {Logo} from './Components/Logo/Logo';
import {ImageLinkForm} from './Components/ImageLinkForm/ImageLinkForm';
import {Rank} from './Components/Rank/Rank';
import ParticlesBg from 'particles-bg'
// import Signin from './components/Signin/Signin';
// import Register from './components/Register/Register';

function App() {
  return (
    <div className="App">
      <Navigation />
      <Logo />
      <Rank />
      <ImageLinkForm />
      <ParticlesBg type="polygon" bg={true} />
    </div>
    
  );
}

export default App;
