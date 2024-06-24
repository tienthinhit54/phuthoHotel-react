import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import '../styles/imageSlider.css'

const CARDS = 100;
const MAX_VISIBILITY = 3;

interface CardProps {
  image: string;
}

const Card: React.FC<CardProps> = ({ image }) => (
  <div className="card">
    <img src={image} alt="" />
  </div>
);

interface CarouselProps {
  children: React.ReactNode;
}

const Carousel: React.FC<CarouselProps> = ({ children }) => {
  const [active, setActive] = useState(2);
  const count = React.Children.count(children);

  return (
    <div className="carousel">
      {active > 0 && (
        <button onClick={() => setActive((i) => i - 1)}>&lt;</button>
      )}
      {React.Children.map(children, (child, i) => (
        <div
          className="container"
          style={{
            '--active': i === active ? 1 : 0,
            '--offset': (active - i) / 3,
            '--direction': Math.sign(active - i),
            '--abs-offset': Math.abs(active - i) / 3,
            'pointer-events': active === i ? 'auto' : 'none',
            opacity: Math.abs(active - i) >= MAX_VISIBILITY ? '0' : '1',
            display: Math.abs(active - i) > MAX_VISIBILITY ? 'none' : 'block',
          } as React.CSSProperties}
        >
          {child}
        </div>
      ))}
      {active < count - 1 && (
        <button className="nav-right" onClick={() => setActive((i) => i + 1)}>
          &gt;
        </button>
      )}
    </div>
  );
};

const Slider: React.FC = () => (
  <div className="slider-image">
    <Carousel>
      {[...new Array(CARDS)].map((_, i) => (
        <Card key={i} image={`https://via.placeholder.com/150?text=Card+${i + 1}`} />
      ))}
    </Carousel>
  </div>
);

export default Slider;
