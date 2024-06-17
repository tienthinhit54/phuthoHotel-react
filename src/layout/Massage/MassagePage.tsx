import ImageSliderMass from './Slider';
import React from 'react';
import MassageData from '../../components/DataMassComponent';
import img from '../../shared/images/mass3.png'
import img1 from '../../shared/images/mass.png'
import img2 from '../../shared/images/mass4.png'
import img3 from '../../shared/images/mass.png'
import '../../styles/massage.css'


const MassagePage: React.FC = () => {

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
      <MassageData />
      {/* <div className='content-massagepage'>
        <div className='card1-massagepage'>
            <img src={img} alt="" />
            <h2>Khu massage nữ</h2>
            <p>Khu Massage dành cho nữ được thiết kế kín đáo, tiện nghi 
              đầy đủ trong phòng, phù hợp cho các nhóm bạn nữ đi cùng nhau.</p>
        </div>
        <div className='card2-massagepage'>
            <img src={img1} alt="" />
            <h2>Phòng xông hơi nam</h2>
            <p>Phòng dịch vụ massage dành cho Nam được thiết kế rộng rãi, với hệ thống bồn tắm sục khí, bồn tắm thảo dược của 
              người Dao đỏ vùng Sa Pa, bồn sỏi ngâm chân nước nóng, phòng Sauna tắm hơi.</p>
        </div>
        <div className='card3-massagepage'>
            <img src={img2} alt="" />
            <h2>Phòng VIP</h2>
            <p>Không chỉ đơn thuần là đến đây để Massage, quý khách còn có thể tận hưởng không gian riêng cho chính mình. Khách sạn Phú Thọ có 6 phòng VIP massage dành cho khách lựa chọn để tận hưởng những phút giây thư giãn của mình. Điểm đặc biệt là các phòng VIP đều được trang trí thiết kết theo mô típ của các nước như Ai Cập, Nhật Bản, Thái Lan, Trung Quốc… Bên trong đầy đủ các trang 
              thiết bị như buồng Sauna riêng, bồn tắm riêng, và các thiết bị thư giãn khác.</p>
        </div>
        <div className='card4-massagepage'>
            <img src={img3} alt="" />
            <h2>Phòng thư giãn</h2>
            <p>Là nơi thư giãn nghỉ ngơi sau khi quý khách trải qua các bài massage phục hồi sức khỏe. Phòng được thiết kế với các bộ ghế nghỉ ngơi thư giãn, cùng một số thiết bị tập cá nhân, và gội đầu thư giãn.</p>
        </div>
      </div> */}
    </div>
  );
};

export default MassagePage;
