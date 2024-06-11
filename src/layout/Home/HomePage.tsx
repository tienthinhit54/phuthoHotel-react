import ImageSlider from './slider';
import '../../styles/homepage.css'
import { PushData } from '../../Data/PushData';
import React, { useState, useEffect, ChangeEvent } from 'react';
import { collection, addDoc, getDocs } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { firestore, storage } from '../../config/firebase'
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
interface uploadresData {
  id: string;
  image: string;
  info: string;
  button:string;
}
interface uploadmassData{
  id: string;
  image: string;
  info: string;
  button:string;
}


const HomePage: React.FC = () => {
  const [uploadedData, setUploadedData] = useState<UploadedData[]>([]);
  const [uploadresData, setUploadresData] = useState<uploadresData[]>([]);
  const [uploadmassData, setUploadmassData] = useState<uploadresData[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUploadedData = async () => {
      const querySnapshot = await getDocs(collection(firestore, 'roomdata'));
      const data: UploadedData[] = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        nameroom: doc.data().nameroom,
        des: doc.data().des,
        info: doc.data().info,
        name: doc.data().name,
        phone: doc.data().phone,
        image: doc.data().image,
        mail: doc.data().mail,
        mess: doc.data().mess,
        price: doc.data().price,
        acreage: doc.data().acreage,
        bed: doc.data().bed,
        buffet: doc.data().buffet,
        wf: doc.data().wf,
        sofa1: doc.data().sofa1,
        safe: doc.data().safe,
        fly: doc.data().fly,
      }));
      setUploadedData(data);
    };

    fetchUploadedData();
  }, []);
  useEffect(() => {
    const resUploadedData = async () => {
      const querySnapshot = await getDocs(collection(firestore, 'resdata'));
      const data: uploadresData[] = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        info: doc.data().info,
        image: doc.data().image,
        button: doc.data().button,
      }));
      setUploadresData(data);
    };
    resUploadedData();
  }, [])
  useEffect(() => {
    const massUploadedData = async () => {
      const querySnapshot = await getDocs(collection(firestore, 'massdata'));
      const data: uploadmassData[] = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        info: doc.data().info,
        image: doc.data().image,
        button: doc.data().button,
      }));
      setUploadmassData(data);
    };
    massUploadedData();
  }, [])
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
      <div className='room-home' onClick={handleContentClick}>
        <div className='top-room'>
          <h1 >CÁC LOẠI PHÒNG NGHỈ</h1>
          <p>Khách sạn Phú Thọ có 35 phòng nghỉ các loại Standard, Deluxe, Suite.</p>
          <p>Mỗi phòng đều đầy đủ tiện nghi cao cấp, giúp quý khách có những giấc ngủ ngon sau những hành trình dài.</p>
        </div>
        <div className='card-homeroom' >
          {uploadedData.map((data) => (
            <div className='item-card' key={data.id}>
              <img src={data.image} alt="" />
              <div className='text-img'>
                <h2>{data.nameroom}</h2>
                <p>{data.price}</p>
                <div className='text-img-bottom'>
                  <i className='fa-sharp fa-solid fa-chart-area'>
                    <span>{data.acreage}</span>
                  </i>
                  <i className='fa-solid fa-bed'>
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
      <div className='utilities-home'>
        <h1>CÁC TIỆN ÍCH KHÁC</h1>
        <div className='res-home'>
          {uploadresData.map((data) =>
            <div className='item-res' key={data.id}>
              <img src={data.image} alt="" />
              <div className='text-res'>
                <p className='res'>Nhà hàng</p>
                <p className='info'>{data.info}</p>
                <button>{data.button}</button>
              </div>
            </div>
          )}
        </div>
        <div className='mass-home'>
          {uploadmassData.map((data)=>
          <div className='item-mass' key={data.id}>
            <img src={data.image} alt="" />
            <div className='text-mass'>
                <p className='mass'>Massage</p>
                <p className='info-mass'>{data.info}</p>
                <button onClick={handleMassClick}>{data.button}</button>
              </div>
          </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
