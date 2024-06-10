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
  price:string;
}



const HomePage: React.FC = () => {
  const [uploadedData, setUploadedData] = useState<UploadedData[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUploadedData = async () => {
            const querySnapshot = await getDocs(collection(firestore, 'roomdata'));
            const data: UploadedData[] = querySnapshot.docs.map((doc) => ({
                id: doc.id,
                nameroom: doc.data().nameroom,
                des: doc.data().des,
                info: doc.data().info,
                name:doc.data().name,
                phone: doc.data().phone,
                image:doc.data().image,
                mail: doc.data().mail,
                mess:doc.data().mess,
                price:doc.data().price,
            }));
            setUploadedData(data);
        };

        fetchUploadedData();
    }, []);
    const handleContentClick = (id: string) => {
        navigate(`/article/${id}`);
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
      <div className='room-home'>
        <h1>CÁC LOẠI PHÒNG NGHỈ</h1>
        <p>Khách sạn Phú Thọ có 35 phòng nghỉ các loại Standard, Deluxe, Suite.
        Mỗi phòng đều đầy đủ tiện nghi cao cấp, giúp quý khách có những giấc ngủ ngon sau những hành trình dài.</p>
        <div className='card-homeroom' >
         {uploadedData.map((data)=>(
          <div className='item-card' key={data.id}>
            <h2>{data.nameroom}</h2>
            <p>{data.price}</p>
            <img src={data.image} alt="" />
          </div>
         ))}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
