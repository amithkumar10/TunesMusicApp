import { useState } from "react";
import Carousel from "react-bootstrap/Carousel";
import GenreCard from "./GenreCard";

function ControlledGenresCarousel({ genres, coverImages, onClick }) {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };

  return (
    <Carousel activeIndex={index} onSelect={handleSelect} indicators={false}>
      {genres.map((genre, i) => (
        <Carousel.Item key={genre.id}>
          <div onClick={() => onClick(genre)}>
            {" "}
            {/* Pass the onClick handler */}
            <GenreCard genre={genre} coverImage={coverImages[i]} />
          </div>
        </Carousel.Item>
      ))}
    </Carousel>
  );
}

export default ControlledGenresCarousel;
