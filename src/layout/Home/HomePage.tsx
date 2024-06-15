import ImageSlider from './slider';
import '../../styles/homepage.css'
import { useNavigate } from 'react-router-dom';
import VideoPlayer from './VideoPlayer';
import video from '../../shared/videos/videophutho.mp4'
import img from '../../shared/images/homevideo.png'
import RoomHomePage from '../../components/DataRoomhomeComponents';
import OrtherHomePage from '../../components/OtherHome';
import NewsHomePage from '../../components/newsHomeComponent';
import MapComponent from '../../components/GooglemapComponent';




const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const apiKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY as string;;

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
      <RoomHomePage />
      <div className='video-home'>
        <VideoPlayer videoSrc={video} posterSrc={img} />
      </div>
      <OrtherHomePage />
      <NewsHomePage />
      <MapComponent apiKey={apiKey} />
    </div>
  );
};

export default HomePage;
