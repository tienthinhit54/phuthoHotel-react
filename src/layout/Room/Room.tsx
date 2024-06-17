import React, { useState, useEffect, } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { firestore, storage } from '../../config/firebase'
import '../../styles/room.css'
import ImageSliderRoom from './Sliceder';
import RoomHomePage from '../../components/DataRoomhomeComponents';

interface UploadedData {
  id: string;
  image: string;
  admin: string;
  content: string;
  title: string;
  mess: string;
  time: string;
}

const RoomPage: React.FC = () => {
  const [uploadedData, setUploadedData] = useState<UploadedData[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUploadedData = async () => {
      const querySnapshot = await getDocs(collection(firestore, 'roomdata'));
      const data: UploadedData[] = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        content: doc.data().content,
        image: doc.data().image,
        admin: doc.data().admin,
        mess: doc.data().mess,
        title: doc.data().title,
        time: doc.data().time,
      }));
      setUploadedData(data);
    };
    fetchUploadedData();
  }, []);
  return (
    <div className='room'>
      <ImageSliderRoom />
      <div className='baner-room'>
        <h1>CÁC LOẠI PHÒNG NGHỈ KHÁCH SẠN PHÚ THỌ QUẬN 11</h1>
        <p>Khách sạn Phú Thọ có 35 phòng nghỉ các loại Standard, Deluxe, Suite.
          Mỗi phòng đều đầy đủ tiện nghi cao cấp, giúp quý khách có những giấc ngủ ngon sau những hành trình dài.</p>
      </div>
      <RoomHomePage />
      <div className='article'>
        <h2>CÁC BÀI VIẾT LIÊN QUAN</h2>
          <div className='iteam-acticle-room'>
            {uploadedData.map((data) => (<div key={data.id} className='item-card-articleroom'>
              <img src={data.image} alt={data.content} />
              <h2>{data.content}</h2>
              <div className='text-card-articleroom'>
                <h3>{data.title}</h3>
                <p>{data.mess}</p>
                <div className='text-time-room'>
                  <i className="fa-solid fa-clock"><span>{data.time}</span></i>
                  <i className="fa-solid fa-user"><span>{data.admin}</span></i>
                </div>
              </div>
            </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default RoomPage;
