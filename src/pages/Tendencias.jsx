import { useState, useEffect } from "react";
import { getPopularTracks } from "../services/deezerApi";
import TrackCardSmalll from "../components/cards/TrackCardSmalll";
import PageHeader from "../components/Ui/PageSection";

function Tendencias() {
  const [popularTracks, setPopularTracks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchTracks = async () => {
      setIsLoading(true);
      const tracks = await getPopularTracks();
      setPopularTracks(tracks);
      setIsLoading(false);
    };
    fetchTracks();
  }, []);

  return (
    <div className="p-4 sm:p-6">
      <PageHeader title="Tendencias" />

      {isLoading ? (
        <p className="text-gray-400">Cargando tendencias...</p>
      ) : (
        <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {popularTracks?.map((track) => (
            <li key={track.id} className="flex justify-center">
              <TrackCardSmalll track={track} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Tendencias;
