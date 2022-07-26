import { Route, Routes } from "react-router-dom";
import "./App.css";
import { FavPhotos } from "./pages/FavPhotos";

import { Home } from "./pages/Home.js";

function App() {
  return (
    <div className="App">
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/favorite" element={<FavPhotos />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
