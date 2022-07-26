import { useDispatch, useSelector } from "react-redux";
import {
  removePhoto,
  selectFavoriteState,
} from "../features/photos/FavPhotosSlice";
import { Link } from "react-router-dom";
import { ImageList, ImageListItem, ImageListItemBar } from "@mui/material";
import { IconButton } from "@mui/material";
import DownloadForOfflineIcon from "@mui/icons-material/DownloadForOffline";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { ModalPhoto } from "../features/photos/ModalPhoto";

export function FavPhotos() {
  const favPhotos = useSelector(selectFavoriteState);

  const dataUrl = (url) => {
    return fetch(url)
      .then((resp) => {
        return resp.blob();
      })
      .then((blob) => {
        return URL.createObjectURL(blob);
      });
  };

  async function downloadPhoto(url) {
    const a = document.createElement("a");
    a.style.display = "none";
    a.href = await dataUrl(url);
    a.download = "download.png";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }
  const dispatch = useDispatch();
  console.log(favPhotos, "fav");
  const removeFromFavorite = (id) => {
    dispatch(removePhoto(id));
  };

  return (
    <div>
      <h1>My Photos</h1>
      <Link to="/">Home</Link>
      <ImageList sx={{ width: "100%" }} variant="woven" cols={3} gap={8}>
        {favPhotos.map((photo) => (
          <div key={photo.id}>
            <ImageListItem key={photo.id}>
              <img src={photo.thumb} alt={photo.id} loading="lazy" />

              <ImageListItemBar
                title={`Likes: ${photo.likes}`}
                subtitle={`Saved: ${photo.setDate}`}
                actionIcon={
                  <>
                    <IconButton
                      onClick={() => {
                        downloadPhoto(photo.full);
                      }}
                    >
                      <DownloadForOfflineIcon
                        style={{
                          color: "white",
                          width: "40px",
                          height: "40px",
                        }}
                      ></DownloadForOfflineIcon>
                    </IconButton>
                    <FavoriteIcon
                      style={{
                        width: "40px",
                        height: "40px",
                        color: "red",
                      }}
                      onClick={() => removeFromFavorite(photo.id)}
                    />
                  </>
                }
              />
            </ImageListItem>

            <h3>Description: {photo.description}</h3>
            <p>Height: {photo.height}</p>
            <p>Width: {photo.width}</p>
          </div>
        ))}
      </ImageList>
      <ModalPhoto favPhotos={favPhotos} photo={favPhotos.thumb} />
    </div>
  );
}
