import { useJsApiLoader } from "@react-google-maps/api";
import MapPage from "./components/MapPage";
import { HashRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";

function App() {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries: ["places"],
  });
  if (!isLoaded) return <div>Loading...</div>;
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/map' element={<MapPage />}></Route>
      </Routes>
    </Router>
  );
}

export default App;
