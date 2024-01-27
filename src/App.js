import './index.css';
import MainScreen from "./screens/MainScreen/MainScreen";
import { MainScreenContextProvider } from "./screens/MainScreen/MainScreenContextProvider";


function App() {
  return (
    <MainScreenContextProvider>
      <MainScreen />
    </MainScreenContextProvider>
  );
}

export default App;
