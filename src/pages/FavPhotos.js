import { useDispatch, useSelector } from "react-redux";
import {
  getFavoritePhotos,
  removePhoto,
  selectFavoriteState,
} from "../features/photos/FavPhotosSlice";
import { Link } from "react-router-dom";
import {
  ImageList,
  ImageListItem,
  ImageListItemBar,
  Typography,
} from "@mui/material";
import { IconButton } from "@mui/material";
import DownloadForOfflineIcon from "@mui/icons-material/DownloadForOffline";
import HeartBrokenIcon from "@mui/icons-material/HeartBroken";
import { ModalPhoto } from "../features/photos/ModalPhoto";
import { useState } from "react";

export function FavPhotos() {
  const favPhotos = useSelector(selectFavoriteState);
  const [open, setOpen] = useState(false);
  const [editPhoto, setEditPhoto] = useState("");
  const [searchDescription, setSearchDescription] = useState("");

  const dispatch = useDispatch();

  const handleChange = (e) => {
    let lowerCase = e.target.value.toLowerCase();
    setSearchDescription(lowerCase);
  };
  const filteredPhoto = favPhotos.filter((item) => {
    if (searchDescription === "") {
      return item;
    } else {
      return item.description
        ? item.description.toLowerCase().includes(searchDescription)
        : "";
    }
  });

  const handleOpen = (photo) => {
    setEditPhoto(photo);
    setOpen(true);
  };
  const handleClose = () => setOpen(false);

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

  const removeFromFavorite = (id) => {
    dispatch(removePhoto(id));
  };

  return (
    <div>
      <Typography variant="h3" style={{ marginLeft: "20px" }}>
        My Photos
      </Typography>
      <Link to="/">Home</Link>

      <form
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <input
          type="text"
          placeholder="Search descriptions"
          value={searchDescription}
          onChange={handleChange}
        />
      </form>
      <ImageList sx={{ width: "100%" }} variant="woven" cols={3} gap={8}>
        {filteredPhoto.map((photo) => (
          <div key={photo.id}>
            <ModalPhoto
              favPhotos={favPhotos}
              open={open}
              handleClose={handleClose}
              photo={photo.thumb}
              description={photo.description}
              editPhoto={editPhoto}
            />
            <ImageListItem
              key={photo.id}
              sx={{ height: "400px", width: "100%" }}
            >
              <img
                onClick={() => {
                  handleOpen(photo);
                }}
                src={photo.thumb}
                alt={photo.id}
                loading="lazy"
              />

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
                    <IconButton onClick={() => removeFromFavorite(photo.id)}>
                      <HeartBrokenIcon
                        style={{
                          width: "40px",
                          height: "40px",
                          color: "white",
                        }}
                      />
                    </IconButton>
                  </>
                }
              />
            </ImageListItem>
            <h3>
              Description:
              {!photo.description
                ? ` The user has not included any description.`
                : ` ${photo.description}`}
            </h3>
            <p>Height: {photo.height}</p>
            <p>Width: {photo.width}</p>
          </div>
        ))}
      </ImageList>
    </div>
  );
}
