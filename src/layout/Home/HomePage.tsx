import ImageSlider from './slider';
import '../../styles/homepage.css'
import { PushData } from '../../Data/PushData';
import React, { useState, useEffect, ChangeEvent, useRef } from 'react';
import { doc, getDoc, collection, query, where, limit, getDocs, orderBy } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { firestore, storage } from '../../config/firebase'
import VideoPlayer from './VideoPlayer';
import video from '../../shared/videos/videophutho.mp4'
import img from '../../shared/images/homevideo.png'
import { useParams } from 'react-router-dom';
import RoomHomePage from '../../components/DataRoomhomeComponents';
import OrtherHomePage from '../../components/OtherHome';
import NewsHomePage from '../../components/newsHomeComponent';




const HomePage: React.FC = () => {
  const navigate = useNavigate();

  const handleContentClick = () => {
    navigate(`/room`);
  }
  const handleMassClick = () => {
    navigate(`/massage`);
  }

  return (
    <div className='homepage'>
      <ImageSlider />
      <div className='content-homepage'>
        <h1>CHÀO MỪNG ĐẾN VỚI KHÁCH SẠN PHÚ THỌ</h1>
        <p>Khách sạn Phú Thọ quận 11 (thuộc Công ty Cổ phần Dịch vụ Du lịch Phú Thọ quản lý),có vị trí nằm ngay ngã tư đường 3 tháng 2 và Lê Đại Hành (Quận 11, TP.HCM).
          Đối diện khách sạn là khu mua sắm Lotte Mart, và đường vào CVVH Đầm Sen.
          Khách sạn đã được Phuthotourist cải tạo nâng cấp trong năm 2017.</p>
      </div>
      <RoomHomePage/>
      <div className='video-home'>
        <VideoPlayer videoSrc={video} posterSrc={img} />
      </div>
      <OrtherHomePage/>
      <NewsHomePage/>
    </div>
  );
};

export default HomePage;
