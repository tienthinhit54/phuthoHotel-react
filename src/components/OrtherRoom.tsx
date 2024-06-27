import React, { useState, useEffect, } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { firestore, storage } from '../config/firebase'
import '../styles/OrtherRoom.css'
interface UploadedData {
  id: string;
  image: string;
  admin: string;
  content: string;
  nameroom: string;
  mess: string;
  time: string;
}

const OrtherRoom: React.FC = () => {
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
        nameroom: doc.data().nameroom,
        time: doc.data().time,
      }));
      setUploadedData(data);
    };
    fetchUploadedData();
  }, []);
  const handleContentClick = (id: string) => {
    navigate(`/roomdetail/${id}`);
  };
  return (
    <div className='orther-room'>
      <div className='roomorther'>
        <h1>CÁC LOẠI PHÒNG KHÁC</h1>
          <div className='iteam-orther-room'>
            {uploadedData.map((data) => (<div key={data.id} className='item-card-ortherroom'>
              <img src={data.image} alt={data.content} />
              <h2>{data.content}</h2>
              <div className='text-card-ortherroom'>
                <h3 key={data.id} onClick={() => handleContentClick(data.id)} >{data.nameroom}</h3>
                <p>{data.mess}</p>
                <div className='text-time-ortherroom'>
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

export default OrtherRoom;
