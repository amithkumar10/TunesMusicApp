import { useState } from "react";
import Carousel from "react-bootstrap/Carousel";
import ChartCard from "./ChartCard";

function ControlledChartsCarousel({ charts }) {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };

  return (
    <Carousel activeIndex={index} onSelect={handleSelect} indicators={false}>
      {charts.map((chart) => (
        <Carousel.Item key={chart.id}>
          <ChartCard
            songTitle={chart.title}
            artist={chart.artistName}
            coverImage={chart.albumCover}
            onClick={() => {
              window.open(chart.link, "_blank");
            }}
          />
        </Carousel.Item>
      ))}
    </Carousel>
  );
}

export default ControlledChartsCarousel;
