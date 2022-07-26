import { SearchPhoto } from "../features/photos/SearchPhoto";
import { useSelector } from "react-redux";
import { selectState } from "../features/photos/photoSlice";
import { Link } from "react-router-dom";
import { selectFavoriteState } from "../features/photos/FavPhotosSlice";

export function Home() {
  const photos = useSelector(selectState);
  const favPhotos = useSelector(selectFavoriteState);

  return (
    <div>
      <Link to="/favorite">Favorite </Link>
      <SearchPhoto photos={photos} favPhotos={favPhotos} />
    </div>
  );
}
