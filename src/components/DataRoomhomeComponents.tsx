import React, { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { firestore } from '../config/firebase';
import '../styles/roomhome.css';

interface UploadedData {
  id: string;
  nameroom: string;
  des: string;
  info: string;
  name: string;
  phone: string;
  image: string;
  mail: string;
  mess: string;
  price: string;
  acreage: string;
  bed: string;
  buffet: string;
  wf: string;
  sofa1: string;
  safe: string;
  fly: string;
}

const RoomHomePage: React.FC = () => {
  const [uploadedData, setUploadedData] = useState<UploadedData[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUploadedData = async () => {
      const querySnapshot = await getDocs(collection(firestore, 'roomdata'));
      const data: UploadedData[] = querySnapshot.docs.map((doc) => {
        const docData = doc.data() as Omit<UploadedData, 'id'>;
        return {
          id: doc.id,
          ...docData
        };
      });
      setUploadedData(data);
    };
    fetchUploadedData();
  }, []);

  const handleContentClick = (id: string) => {
    navigate(`/roomdetail/${id}`);
  };

  return (
    <div className="room-home">
      <div className="top-room">
        <h1>CÁC LOẠI PHÒNG NGHỈ</h1>
        <p>Khách sạn Phú Thọ có 35 phòng nghỉ các loại Standard, Deluxe, Suite.</p>
        <p>Mỗi phòng đều đầy đủ tiện nghi cao cấp, giúp quý khách có những giấc ngủ ngon sau những hành trình dài.</p>
      </div>
      <div className="card-homeroom">
        {uploadedData.map((data) => (
          <div className="item-card" key={data.id} onClick={() => handleContentClick(data.id)}>
            <img src={data.image} alt="" />
            <div className="text-img">
              <h2>{data.nameroom}</h2>
              <p>{data.price}</p>
              <div className="text-img-bottom">
                <i className="fa-sharp fa-solid fa-chart-area">
                  <span>{data.acreage}</span>
                </i>
                <i className="fa-solid fa-bed">
                  <span>{data.bed}</span>
                </i>
                <i className="fa-solid fa-bell-concierge">
                  <span>{data.buffet}</span>
                </i>
                <i className="fa-solid fa-wifi">
                  <span>{data.wf}</span>
                </i>
                <i className="fa-solid fa-truck-plane">
                  <span>{data.fly}</span>
                </i>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RoomHomePage;
