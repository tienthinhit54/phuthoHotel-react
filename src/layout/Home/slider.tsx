import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import img from '../../shared/images/res.png'
import img2 from '../../shared/images/room.jpg'
import img3 from '../../shared/images/room1.png'

const images = [
    img,img2,img3
];

const SliderWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 200vh;
  overflow: hidden;
`;

const SliderImage = styled.img<{ active: boolean }>`
with: 100%
  position: absolute;
  opacity: ${props => (props.active ? 1 : 0)};
  transition: opacity 1s ease-in-out;
`;

const ImageSlider: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <SliderWrapper>
      {images.map((image, index) => (
        <SliderImage key={index} src={image} alt={`Slide ${index}`} active={index === activeIndex} />
      ))}
    </SliderWrapper>
  );
};

export default ImageSlider;
