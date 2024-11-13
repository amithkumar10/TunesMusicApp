// import { useState } from "react";
// import Carousel from "react-bootstrap/Carousel";
// import GenreCard from "./GenreCard";

// function ControlledGenresCarousel({ genres, coverImages, onClick }) {
//   const [index, setIndex] = useState(0);

//   const handleSelect = (selectedIndex) => {
//     setIndex(selectedIndex);
//   };

//   return (
//     <Carousel activeIndex={index} onSelect={handleSelect} indicators={false}>
//       {genres.map((genre, i) => (
//         <Carousel.Item key={genre._id}>
//           <div onClick={() => onClick(genre)}>
//             {" "}
//             {/* Pass the onClick handler */}
//             <GenreCard genre={genre} coverImage={coverImages} />
//           </div>
//         </Carousel.Item>
//       ))}
//     </Carousel>
//   );
// }

// export default ControlledGenresCarousel;

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
        <Carousel.Item key={genre._id}>
          <GenreCard
            genre={genre}
            coverImage={coverImages[i]}
            onClick={() => onClick(genre)}
          />
        </Carousel.Item>
      ))}
    </Carousel>
  );
}

export default ControlledGenresCarousel;
