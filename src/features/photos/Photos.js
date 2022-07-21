import { ImageList, ImageListItem } from "@mui/material";

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPhotos, selectState } from "./photoSlice";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { addPhoto } from "./FavPhotosSlice";

export function Photos({ query }) {
  const photos = useSelector(selectState);

  const dispatch = useDispatch();
  console.log(photos, "ph");

  useEffect(() => {
    dispatch(fetchPhotos(query));
  }, [dispatch, query]);

  let date = new Date();
  let day = `${date.getDate()}`.padStart(2, "0");
  let month = `${date.getMonth() + 1}`.padStart(2, "0");
  let year = date.getFullYear();
  date = `${day}-${month}-${year}`;

  const addToFavorite = (id) => {
    let newFavorite = photos.find((item) => item.id === id);
    let detailPhoto = {
      id: newFavorite.id,
      description: newFavorite.description,
      width: newFavorite.width,
      height: newFavorite.height,
      full: newFavorite.urls.full,
      thumb: newFavorite.urls.thumb,
      likes: newFavorite.likes,
      setDate: date,
    };
    dispatch(addPhoto(detailPhoto));
    console.log(detailPhoto, "newFav");
  };

  return (
    <div>
      <h2>Photos</h2>
      <ImageList sx={{ width: "100%" }} variant="woven" cols={3} gap={8}>
        {photos.length
          ? photos.map((img, index) => (
              <ImageListItem
                key={`${img.id}-${index}`}
                cols={img.cols || 1}
                rows={img.rows || 1}
              >
                <img
                  src={img.urls.thumb}
                  alt={img.alt_description}
                  loading="lazy"
                />

                <FavoriteBorderIcon onClick={() => addToFavorite(img.id)} />

                <h3>{img.user.instagram_username}</h3>
              </ImageListItem>
            ))
          : "Loading..."}
      </ImageList>
    </div>
  );
}
