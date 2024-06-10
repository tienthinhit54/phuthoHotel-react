import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import img1 from '../../shared/images/res.png'
import img2 from '../../shared/images/room.jpg'
import img3 from '../../shared/images/room1.png'
import img4 from '../../shared/images/spa.png'

const images = [img1, img2, img3, img4];

const SliderWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 820px;
  overflow: hidden;
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

const DotsWrapper = styled.div`
  position: absolute;
  bottom: 10px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Dot = styled.div<{ active: boolean }>`
  width: 10px;
  height: 10px;
  margin: 0 5px;
  background-color: ${props => (props.active ? 'black' : 'white')};
  border-radius: 50%;
  cursor: pointer;
  transition: background-color 0.3s ease;
`;

const NavigationButton = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(0, 0, 0, 0);
  border: none;
  color: white;
  padding: 10px;
  cursor: pointer;
  z-index: 1000;
  font-size: 2rem;
  font-weight: bold;

  &:hover {
    background: rgba(0, 0, 0, 0.7);
  }
`;

const PrevButton = styled(NavigationButton)`
  left: 10px;
`;

const NextButton = styled(NavigationButton)`
  right: 10px;
`;

const ImageSlider: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const slidesToScroll = 1;

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + slidesToScroll) % images.length);
    }, 3000); 

    return () => clearInterval(interval);
  }, []);

  const handleDotClick = (index: number) => {
    setCurrentIndex(index);
  };

  const handlePrevClick = () => {
    setCurrentIndex((prevIndex) => (prevIndex - slidesToScroll + images.length) % images.length);
  };

  const handleNextClick = () => {
    setCurrentIndex((prevIndex) => (prevIndex + slidesToScroll) % images.length);
  };

  return (
    <SliderWrapper>
      {images.map((image, index) => (
        <Slide
          key={index}
          background={image}
          current={index === currentIndex}
        />
      ))}
      <DotsWrapper>
        {images.map((_, index) => (
          <Dot
            key={index}
            active={index === currentIndex}
            onClick={() => handleDotClick(index)}
          />
        ))}
      </DotsWrapper>
      <PrevButton onClick={handlePrevClick}>‹</PrevButton>
      <NextButton onClick={handleNextClick}>›</NextButton>
    </SliderWrapper>
  );
};


export default ImageSlider;
