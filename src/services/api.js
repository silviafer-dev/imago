import axios from "axios";

const accessKey = "5LfVRts4D2P9eRWo9qJGsl4ZUIGLn761Zgv_kTXULM0";

const endPoint = "https://api.unsplash.com/photos";

export async function getPhotos() {
  return axios.get(`${endPoint}?client_id=${accessKey}&per_page=20`);
}

// async function getImages(query) {
//   let response = await fetch(
//     endPoint + "?query=" + query + "&client_id=" + accessKey
//   );
//   let jsonResponse = await response.json();
//   let imagesList = await jsonResponse.results;
// }
