import React, { useState, ChangeEvent } from 'react';
import ImageSliderContact from "./slider";
import '../../styles/contact.css'
import img from '../../shared/images/contact.png'
import { collection, addDoc } from 'firebase/firestore';
import { ref as storageRef, uploadBytes, getDownloadURL } from 'firebase/storage';
import { firestore, storage } from '../../config/firebase';
import MapComponent from '../../components/GooglemapComponent';

interface upContact {
  id: string;
  fullname: string;
  phone: string;
  email: string;
  mess: string;
}

const HomePage: React.FC = () => {
  const apiKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY as string;
  const [fullname, setFullname] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [mess, setMess] = useState<string>('');
  const [uploading, setUploading] = useState<boolean>(false);
  const [uploadedData, setUploadedData] = useState<upContact[]>([]);

  const handleFullnameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFullname(e.target.value);
  };

  const handlePhoneChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPhone(e.target.value);
  };

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleMessChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setMess(e.target.value);
  };

  const handleUpload = async () => {
    if (fullname && phone && email && mess) {
      setUploading(true);
      try {
        const docRef = await addDoc(collection(firestore, 'contactdata'), {
          fullname,
          phone,
          email,
          mess,
        });

        setUploadedData((prevData) => [
          ...prevData,
          {
            id: docRef.id,
            fullname,
            phone,
            email,
            mess,
          },
        ]);

        alert('Cảm ơn vì đã liên hệ!');
      } catch (error) {
        console.error('Error uploading file:', error);
        alert('Upload failed!');
      } finally {
        setUploading(false);
        setFullname('');
        setPhone('');
        setEmail('');
        setMess('');
      }
    } else {
      alert('Làm ơn nhập đầy đủ các thông tin trên!');
    }
  };
  return (
    <div className='contact'>
      <div className="slider">
        <img src={img} alt="" />
        <div className="text-slider">
          <h1>LIÊN HỆ</h1>
        </div>
      </div>
      <div className="phone">
        <h2>LIÊN HỆ VỚI CHÚNG TÔI</h2>
        <div className="item-contact">
          <i className="fa-solid fa-phone">
            <p className="first">HOTLINE</p>
            <p className="last">(028) 38551310</p>
          </i>
          <i className="fa-solid fa-location-dot">
            <p className="first">ĐỊA CHỈ</p>
            <p className="last-location">915 Đường 3 Tháng 2, Phường 7,Quận 11, TP. Hồ Chí Minh</p>
          </i>
          <i className="fa-solid fa-envelope">
            <p className="first">EMAIL</p>
            <p className="last">phutho@phuthohotel.vn</p>
          </i>
        </div>
      </div>
      <div className="wellcom">
        <div className="wellcom-item">
          <h3>Xin chào!</h3>
          <p>Chúng tôi có thể giúp gì cho quý khách?</p>
          <div className="contact-form">
            <input type="text" value={fullname} onChange={handleFullnameChange} placeholder="Họ và Tên" />
            <input type="text" value={phone} onChange={handlePhoneChange} placeholder="Số điện thoại" />
            <input type="email" value={email} onChange={handleEmailChange} placeholder="Email" />
            <textarea value={mess} onChange={handleMessChange} placeholder="Lời nhắn..." />
            <button onClick={handleUpload} disabled={uploading}>
              {uploading ? 'Đang gửi...' : 'Gửi'} 
            </button>
          </div>
        </div>
      </div>
      <div className='map'><MapComponent apiKey={apiKey} /></div>
    </div>
  );
};

export default HomePage;
