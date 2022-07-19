import { Route, Routes } from "react-router-dom";
import "./App.css";

import { Home } from "./pages/Home.js";

function App() {
  return (
    <div className="App">
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
