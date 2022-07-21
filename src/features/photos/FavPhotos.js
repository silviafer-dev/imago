import { useSelector } from "react-redux";
import { selectFavoriteState } from "./FavPhotosSlice";
import { Link } from "react-router-dom";
import { ImageList, ImageListItem, ImageListItemBar } from "@mui/material";
import { IconButton } from "@mui/material";
import DownloadForOfflineRoundedIcon from "@mui/icons-material/DownloadForOfflineRounded";

export function FavPhotos() {
  const favPhotos = useSelector(selectFavoriteState);

  console.log(favPhotos, "fav");
  return (
    <div>
      <h1>My Photos</h1>
      <Link to="/">Home</Link>
      <ImageList sx={{ width: "100%" }} variant="woven" cols={3}>
        {favPhotos.map((photo) => (
          <ImageListItem key={photo.id}>
            <img src={photo.thumb} alt={photo.id} />
            <ImageListItemBar>
              <h3>Description: {photo.description}</h3>
            </ImageListItemBar>
            <h3>Likes: {photo.likes}</h3>
            <IconButton href={photo.full}>
              <DownloadForOfflineRoundedIcon></DownloadForOfflineRoundedIcon>
            </IconButton>
            <h5>Saved: {photo.setDate}</h5>
            <p>Height: {photo.height}</p>
            <p>Width: {photo.width}</p>
          </ImageListItem>
        ))}
      </ImageList>
    </div>
  );
}
