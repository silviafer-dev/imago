import { actionTypes } from "./actionTypes";

export const loadPhotos = (photos) => ({
  type: actionTypes.load,
  payload: photos,
});
