import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import { FormControl, Input, InputLabel, Paper } from "@mui/material";
import { updatePhoto } from "./FavPhotosSlice";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export function ModalPhoto({ open, handleClose, editPhoto }) {
  const [edit, setEdit] = useState("");

  const dispatch = useDispatch();

  useEffect(() => {
    if (editPhoto && editPhoto.description) {
      setEdit(editPhoto.description);
    } else {
      setEdit("");
    }
  }, [editPhoto]);

  const handleChange = (e) => {
    setEdit(e.target.value);
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    dispatch(updatePhoto({ id: editPhoto.id, description: edit }));
  };

  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      open={open}
      onClose={handleClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Box sx={style}>
        <Paper variant="outlined">
          <img
            src={editPhoto.thumb}
            style={{ width: "100%" }}
            alt={editPhoto.id}
          />
        </Paper>
        <Typography id="transition-modal-title" variant="h6" component="h2">
          {editPhoto.height} x {editPhoto.width}
        </Typography>
        <form>
          <FormControl>
            <InputLabel htmlFor="my-input">Description:</InputLabel>
            <Input
              id="my-input"
              aria-describedby="my-helper-text"
              value={edit.description}
              onChange={handleChange}
            />
            <button onClick={handleUpdate}>Update</button>
          </FormControl>
        </form>
      </Box>
    </Modal>
  );
}
