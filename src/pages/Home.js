import { SearchPhoto } from "../features/photos/SearchPhoto";
import { useSelector } from "react-redux";
import { selectState } from "../features/photos/photoSlice";

import { selectFavoriteState } from "../features/photos/FavPhotosSlice";

function Home() {
  const photos = useSelector(selectState);
  const favPhotos = useSelector(selectFavoriteState);

  return (
    <div>
      <SearchPhoto photos={photos} favPhotos={favPhotos} />
    </div>
  );
}
export default Home;
