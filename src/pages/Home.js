import { SearchPhoto } from "../features/photos/SearchPhoto";
import { useSelector } from "react-redux";
import { selectState } from "../features/photos/photoSlice";
import { Link } from "react-router-dom";
export function Home() {
  const photos = useSelector(selectState);
  return (
    <div>
      <Link to="/favorite">Favorite </Link>
      <SearchPhoto photos={photos} />
    </div>
  );
}
