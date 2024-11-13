import { useState } from "react";
import Carousel from "react-bootstrap/Carousel";
import ArtistCard from "./ArtistCard";

function ControlledArtistsCarousel({ artists }) {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };

  return (
    <Carousel activeIndex={index} onSelect={handleSelect} indicators={false}>
      {artists.map((artist) => (
        <Carousel.Item key={artist.id}>
          <ArtistCard
            artistName={artist.artistName}
            coverImage={artist.artistImg}
          />
        </Carousel.Item>
      ))}
    </Carousel>
  );
}

export default ControlledArtistsCarousel;
