import { ImageList, ImageListItem } from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPhotos, selectState } from "../photos/photoSlice";

export function Photos({ query }) {
  const photos = useSelector(selectState);
  const dispatch = useDispatch();
  console.log(photos, "ph");

  useEffect(() => {
    dispatch(fetchPhotos(query));
  }, [dispatch, query]);

  return (
    <div>
      <h2>Photos</h2>
      <ImageList
        sx={{ width: "100%", height: 550 }}
        variant="woven"
        cols={3}
        gap={8}
      >
        {photos.length
          ? photos.map((img, index) => (
              <ImageListItem
                key={`${img.id}-${index}`}
                cols={img.cols || 1}
                rows={img.rows || 1}
              >
                <img src={img.urls.small} alt={img.title} loading="lazy" />
              </ImageListItem>
            ))
          : "Loading..."}
      </ImageList>
    </div>
  );
}
