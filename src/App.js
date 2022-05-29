import { Header } from "./layout/Header";
import { ProjectPage } from "./pages/Project";
import MainRoutes from "./routes/mainRoutes/MainRoutes";

function App() {
  return (
    <div className="App">
      <Header />
      {/* <ProjectPage /> */}
      <MainRoutes className='main-routes-container'/>
    </div>
  );
}

export default App;
