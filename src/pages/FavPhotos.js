import { useDispatch, useSelector } from "react-redux";
import {
  removePhoto,
  selectFavoriteState,
} from "../features/photos/FavPhotosSlice";
import { Link } from "react-router-dom";
import {
  ImageList,
  ImageListItem,
  ImageListItemBar,
  Typography,
  IconButton,
  AppBar,
} from "@mui/material";
import { styled, alpha } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import InputBase from "@mui/material/InputBase";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import DownloadForOfflineIcon from "@mui/icons-material/DownloadForOffline";
import HeartBrokenIcon from "@mui/icons-material/HeartBroken";

import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import PopupState, { bindTrigger, bindMenu } from "material-ui-popup-state";

import { ModalPhoto } from "../features/photos/ModalPhoto";
import { useState } from "react";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "18ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));

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
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static" style={{ backgroundColor: "black" }}>
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="open drawer"
              sx={{ mr: 2 }}
            >
              <PopupState variant="popover" popupId="demo-popup-menu">
                {(popupState) => (
                  <>
                    <MenuIcon
                      variant="contained"
                      {...bindTrigger(popupState)}
                      style={{ backgroundColor: "black" }}
                    />

                    <Menu {...bindMenu(popupState)}>
                      <Link
                        to="/"
                        style={{
                          textDecoration: "none",
                          color: "black",
                        }}
                      >
                        <MenuItem>Home</MenuItem>
                      </Link>
                    </Menu>
                  </>
                )}
              </PopupState>
            </IconButton>
            <Typography
              variant="h5"
              noWrap
              component="div"
              sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
            >
              IMAGO
            </Typography>
            <Search>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Search descriptions "
                value={searchDescription}
                onChange={handleChange}
                inputProps={{ "aria-label": "search" }}
              />
            </Search>
          </Toolbar>
        </AppBar>
      </Box>
      <Typography variant="h3" style={{ marginLeft: "20px" }}>
        My Photos
      </Typography>

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
