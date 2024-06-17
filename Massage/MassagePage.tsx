import ImageSliderMass from './Slider';
import '../../styles/massage.css'
import { PushData } from '../src/Data/PushData';
import React, { useState, useEffect, } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { firestore, storage } from '../src/config/firebase'

interface UploadedData {
  id: string;
  image: string;
  describe: string;
  nameroom: string;
}


const MassagePage: React.FC = () => {
  const [uploadedData, setUploadedData] = useState<UploadedData[]>([]);
  useEffect(() => {
    const fetchUploadedData = async () => {
      const querySnapshot = await getDocs(collection(firestore, 'massdata'));
      const data: UploadedData[] = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        nameroom: doc.data().nameroom,
        image: doc.data().image,
        describe: doc.data().describe,
      }));
      setUploadedData(data);
    };
    fetchUploadedData();
  }, []);
  return (
    <div className='massage'>
      <ImageSliderMass />
      <div className='textslider'>
        <h1>DỊCH VỤ MASSAGE KHÁCH SẠN PHÚ THỌ QUẬN 11</h1>
        <p >Là một trong những dịch vụ Massage danh tiếng lành mạnh tại TP.HCM, với đội ngũ kỹ
          thuật viên rành nghề, và nhiều bài xoa bóp giúp bạn nhanh chóng phục hồi sức khỏe. </p>
        <p >Dịch vụ Massage Khách sạn Phú Thọ quận 11 được xem là một trong những nơi phục hồi sức khỏe lành mạnh, với các
          bài xoa bóp cổ truyền Việt Nam, kết hợp với các phương pháp của Thái Lan, Hồng Kông.</p>
      </div>
      <div className='card-room-massge'>
        <div className='massage-room'>
          <h2>CÁC LOẠI PHÒNG MASSAGE</h2>
          <div className='card-massage'>
            <div className='item-cardmassge'>
              {uploadedData.map((data) => (
                <div key={data.id} className='item'>
                  <img src={data.image} alt="" />
                  <div className='text-itemmassge'>
                    <h3>{data.nameroom}</h3>
                    <p>{data.describe}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MassagePage;
