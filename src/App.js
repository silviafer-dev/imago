import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";

import "./App.css";
import Loader from "./pages/Loader";
const Home = lazy(() => import("./pages/Home"));
const FavPhotos = lazy(() => import("./pages/FavPhotos"));

function App() {
  return (
    <Suspense fallback={<Loader />}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/favorite" element={<FavPhotos />} />
      </Routes>
    </Suspense>
  );
}

export default App;
