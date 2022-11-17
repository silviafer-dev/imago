import { useState } from "react";
import { Photos } from "./Photos";

import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import PopupState, { bindTrigger, bindMenu } from "material-ui-popup-state";
import { SvgIcon } from "@mui/material";
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import { Link } from "react-router-dom";
import CameraOutlinedIcon from "@mui/icons-material/CameraOutlined";

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
      width: "20ch",
      "&:focus": {
        width: "25ch",
      },
    },
  },
}));

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
      <Box sx={{ flexGrow: 1, height: "90px" }} onSubmit={handleSubmit}>
        <AppBar position="fixed" style={{ backgroundColor: "black" }}>
          <Toolbar style={{ height: "100px" }}>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="open drawer"
              sx={{ mr: 2, display: { xs: "block", sm: "none" } }}
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
                        to="/favorite"
                        style={{
                          textDecoration: "none",
                          color: "black",
                        }}
                      >
                        <MenuItem>Favorite</MenuItem>
                      </Link>
                    </Menu>
                  </>
                )}
              </PopupState>
            </IconButton>
            <div
              style={{
                display: "flex",
                width: "100%",
               alignItems: 'center'
              }}
            >
              <SvgIcon
                component={CameraOutlinedIcon}
                sx={{ fontSize: "70px", marginLeft: "10%" , paddingRight: '30px'}}
              />
              <Typography
                variant="h4"
                noWrap
                component="div"
                sx={{
                  fontFamily: "Pacifico",
                  height: '50px',
                  flexGrow: 1,
                  display: { xs: "none", sm: "block" },
                }}
              >
                IMAGO
              </Typography>
            </div>
            <Link
              to="/favorite"
              style={{
                textDecoration: "none",
                color: "white",
              }}
            >
              <Typography
                variant="h5"
                sx={{
                  fontFamily: "Roboto",
                  mr: 10,
                  flexGrow: 1,
                  display: { xs: "none", sm: "block" },
                }}
              >
                FAVORITE
              </Typography>
            </Link>

            <Search>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Search…"
                value={keyword}
                onChange={handleChange}
                inputProps={{ "aria-label": "search" }}
              />
            </Search>
          </Toolbar>
        </AppBar>
      </Box>
      <Photos query={keyword} photos={photos} favPhotos={favPhotos} />
    </div>
  );
}
