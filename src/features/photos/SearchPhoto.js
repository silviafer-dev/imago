import { useState } from "react";
import { Photos } from "./Photos";

export function SearchPhoto({ photos, favPhotos }) {
  const [keyword, setKeyword] = useState("");

  const handleChange = (e) => {
    setKeyword(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div>
      <h2>Search</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Search a photo here..."
          value={keyword}
          onChange={handleChange}
        />
      </form>
      <Photos query={keyword} photos={photos} favPhotos={favPhotos} />;
    </div>
  );
}
