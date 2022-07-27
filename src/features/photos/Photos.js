import {
  ImageList,
  ImageListItem,
  ImageListItemBar,
  Typography,
} from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPhotos, selectState } from "./photoSlice";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { addPhoto, removePhoto } from "./FavPhotosSlice";

export function Photos({ query, favPhotos }) {
  const photos = useSelector(selectState);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchPhotos(query));
  }, [dispatch, query]);

  let date = new Date();
  let day = `${date.getDate()}`.padStart(2, "0");
  let month = `${date.getMonth() + 1}`.padStart(2, "0");
  let year = date.getFullYear();
  date = `${day}-${month}-${year}`;

  const addToFavorite = (id) => {
    if (favPhotos.find((item) => item.id === id)) return;
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
  };

  const removeFromFavorite = (id) => {
    dispatch(removePhoto(id));
  };

  return (
    <div>
      <Typography variant="h3" style={{ marginLeft: "20px" }}>
        Photos
      </Typography>

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
                <ImageListItemBar
                  title={
                    img.user.instagram_username
                      ? `Ph: ${img.user.instagram_username}`
                      : ""
                  }
                  actionIcon={
                    <div>
                      {favPhotos.find((item) => item.id === img.id) ? (
                        <FavoriteIcon
                          style={{
                            width: "40px",
                            height: "40px",
                            color: "red",
                          }}
                          onClick={() => removeFromFavorite(img.id)}
                        />
                      ) : (
                        <FavoriteBorderIcon
                          style={{
                            width: "40px",
                            height: "40px",
                            color: "red",
                          }}
                          onClick={() => addToFavorite(img.id)}
                        />
                      )}
                    </div>
                  }
                />
              </ImageListItem>
            ))
          : "No matches found..."}
      </ImageList>
    </div>
  );
}
