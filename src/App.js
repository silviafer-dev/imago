import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import "./App.css";

import { loadPhotos } from "./redux/actionCreators";
import { getPhotos } from "./services/api.js";

function App() {
  const [photos, setPhotos] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    getPhotos().then((resp) => {
      dispatch(loadPhotos(resp.data));
      setPhotos(resp.data);
    });
  }, [dispatch]);

  return (
    <div className="App">
      <h2>Photos</h2>
      {photos.length
        ? photos.map((pic) => (
            <img key={pic.id} src={pic.urls.small} alt="photos"></img>
          ))
        : "Loading"}
    </div>
  );
}

export default App;
