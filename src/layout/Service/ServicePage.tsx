import React from 'react';
import img from '../../shared/images/res1.png'
import img1 from '../../shared/images/res2.png'
import img2 from '../../shared/images/res3.png'
import img3 from '../../shared/images/res4.png'
import '../../styles/Res.css'
import ArticleRes from '../../components/ArticleRes';


const Res: React.FC = () => {
  return (
    <div className='Res'>
      <div className='baner-Res'>
        <img src={img} alt="" />
        <div className='text-baner-res'>
          <h1>NHÀ HÀNG ĐIỂM TÂM</h1>
        </div>
      </div>
      <div className='content-Res'>
        <div className='contentres1'>
          <img src={img1} alt="" />
          <img src={img2} alt="" />
          <div className='contentres1-text'>
            <h1>Tiện nghi</h1>
            <p>Bàn ăn được sắp xếp ngay ngắn, ngay cửa ra vào của khách sạn. Thuận tiện cho khách lưu trú dùng bữa sáng, hoặc các bữa ăn trong ngày.</p>
          </div>
        </div>
        <div className='contentres2'>
          <img src={img3} alt="" />
          <div className='contentres2-text'>
            <h1>Sang trọng</h1>
            <p>Nhà hàng của khách sạn Phú Thọ được thiết kế ấm cúng, dành cho khách lưu trú và khách vãng lai. Các bàn ghế được làm bằng gỗ sang trọng phục vụ các cuộc tiếp khách của khách lưu trú.</p>
          </div>
        </div>
        <div className='contentres3'>
          <img src={img} alt="" />
          <div className='contentres3-text'>
            <h1>Sạch sẽ</h1>
            <p>Nhà hàng luôn đặt vấn đề an toàn vệ sinh thực phẩm lên hàng đầu. Tất cả các món buffet của nhà hàng đều được chuẩn bị kỹ lưỡng, cũng như chén đĩa đều được lau rửa sạch sẽ, sắp xếp ngăn nắp trước khi đưa lên thực khách.</p>
          </div>
        </div>
      </div>
      <ArticleRes/>
    </div>
  );
};

export default Res;
