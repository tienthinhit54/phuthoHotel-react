import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import img1 from '../../shared/images/room.jpg'
import img2 from '../../shared/images/room1.png'
import img3 from '../../shared/images/room3.png'

const images = [img1, img2, img3];

const SliderWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 520px;
  overflow: hidden;
  object-fit: cover;
`;

const Slide = styled.div<{ background: string; current: boolean }>`
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: center;
  background-image: url(${props => props.background});
  opacity: ${props => (props.current ? 1 : 0)};
  transition: opacity 1s ease-in-out;
  position: absolute;
  top: 0;
  left: 0;
`;

const ImageSliderRoom: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const slidesToScroll = 1;

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + slidesToScroll) % images.length);
    }, 3000); 

    return () => clearInterval(interval);
  }, []);



  return (
    <SliderWrapper>
      {images.map((image, index) => (
        <Slide
          key={index}
          background={image}
          current={index === currentIndex}
        />
      ))}
    </SliderWrapper>
  );
};


export default ImageSliderRoom;
