import { H1 } from "./H1/H1";
import { P } from "./P/P";

function Image() {
  return (
    <div>
      <img
        src="https://images.pexels.com/photos/3680219/pexels-photo-3680219.jpeg?cs=srgb&dl=pexels-lukas-rodriguez-3680219.jpg&fm=jpg"
        alt="image"
      />
    </div>
  );
}

function App() {
  return (
    <div className="App" id="barev">
      <div className="info-section">
        <H1 />
        <H1 />
        <H1 />

        <P />
        <Image />
      </div>
    </div>
  );
}

export default App;
