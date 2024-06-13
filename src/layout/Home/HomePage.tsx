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




const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [breakfast, setBreakfast] = useState<any>(null);
  const [relatedBreakfast, setRelatedBreakfast] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      if (id) {
        try {
          const docRef = doc(firestore, 'breakfast', id);
          const docSnap = await getDoc(docRef);

          if (docSnap.exists()) {
            setBreakfast(docSnap.data());

            const articlesRef = collection(firestore, 'breakfast');
            const q = query(articlesRef, orderBy('timestamp', 'desc'), limit(5));
            const querySnapshot = await getDocs(q);

            const articles = querySnapshot.docs
              .filter(doc => doc.id !== id) // Exclude the current article
              .map(doc => ({
                id: doc.id,
                ...doc.data()
              }));

            setRelatedBreakfast(articles.slice(0, 4)); // Ensure only 4 related articles are shown
          } else {
            console.log('No such document!');
          }
        } catch (error) {
          console.error('Error fetching articles:', error);
        }
      }
    };

    fetchData();
  }, [id]);
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
    </div>
  );
};

export default HomePage;
