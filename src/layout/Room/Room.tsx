import React from 'react';
import img from '../../shared/images/room.jpg'
import '../../styles/room.css'
const RoomPage: React.FC = () => {
  return (
    <div className='room'>
      <div className='baner-room'>
        <img src={img} alt="" />
      </div>
      <h1>Room Page</h1>
    </div>
  );
};

export default RoomPage;
