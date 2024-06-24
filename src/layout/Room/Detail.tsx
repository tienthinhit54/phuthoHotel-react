import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { firestore } from '../../config/firebase';
import ImageSliderRoom from './Sliceder';
import '../../styles/DetailRoom.css'
import Slider from '../../components/Slider';

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
  sofa1: string;
  safe: string;
  fly: string;
  modelPath: string; // Path to the 3D model of the room
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
        <Slider/>
      </div>
      <div className='text-contentroom'>
        <div className='text-left'>
          <p> {roomDetail.info}</p>
        </div>
      </div>

    </div>
  );
};

export default Detailroom;
