import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { firestore } from '../../config/firebase';
import ImageSliderRoom from './Sliceder';
import '../../styles/DetailRoom.css'
import Slider from '../../components/Slider';
import { PushData } from '../../Data/PushData';
import { Complant } from '../../components/ComplantComponent';

interface RoomDetail {
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
  sofa: string;
  safe: string;
  fly: string;
  modelPath: string; // Path to the 3D model of the room
  TV: string;
  air: string;
  bathroom: string;
  tea: string;
  table: string;
}

const Detailroom: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [roomDetail, setRoomDetail] = useState<RoomDetail | null>(null);

  useEffect(() => {
    const fetchRoomDetail = async () => {
      if (id) {
        const docRef = doc(firestore, 'roomdata', id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setRoomDetail({ id: docSnap.id, ...docSnap.data() } as RoomDetail);
        } else {
          console.log('No such document!');
        }
      }
    };
    fetchRoomDetail();
  }, [id]);

  if (!roomDetail) {
    return <div>Loading...</div>;
  }

  return (
    <div className="room-detail">
      <div className='slider-room'>
        <Slider />
      </div>
      <div className='room-detailname'>
        <h1>{roomDetail.nameroom}</h1>
        <p>{roomDetail.des}</p>
      </div>
      <div className='text-contentroom'>
        <div className='text-left'>
          <h1>Thông tin phòng </h1>
          <p> {roomDetail.info}</p>
        </div>
        <div className='text-right'>
          <h1>Tiện nghi</h1>
          <div className='text-right-text'>
            <div className='text-right-left'>
              <i className="fa-sharp fa-solid fa-chart-area">
                <span>{roomDetail.acreage}</span>
              </i>
              <i className="fa-solid fa-bed">
                <span>{roomDetail.bed}</span>
              </i>
              <i className="fa-solid fa-bell-concierge">
                <span>{roomDetail.buffet}</span>
              </i>
              <i className="fa-solid fa-wifi">
                <span>{roomDetail.wf}</span>
              </i>
              <i className="fa-solid fa-couch">
                <span>{roomDetail.sofa}</span>
              </i>

              <i className="fa-solid fa-tv">
                <span>{roomDetail.TV}</span>
              </i>

            </div>
            <div className='text-right-right'>
              <i className="fa-solid fa-wind">
                <span>{roomDetail.air}</span>
              </i>
              <i className="fa-solid fa-shower">
                <span>{roomDetail.bathroom}</span>
              </i>
              <i className="fa-solid fa-mug-hot">
                <span>{roomDetail.tea}</span>
              </i>
              <i className="fa-solid fa-table">
                <span>{roomDetail.table}</span>
              </i>
              <i className="fa-solid fa-truck-plane">
                <span>{roomDetail.fly}</span>
              </i>
            </div>
          </div>
        </div>
      </div>
      <div className='complant-room'>
        
        <Complant/>
      </div>
    </div>
  );
};

export default Detailroom;
