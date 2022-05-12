import { Header } from "./layout/Header";
import { ProjectPage } from "./pages/Project";
import { BACKEND_URL } from "./consts";

function App() {
  console.log(BACKEND_URL);
  return (
    <div className="App">
      <Header />
      <ProjectPage />
    </div>
  );
}

export default App;
