import React from 'react';
import '../../styles/fly.css'
import img from '../../shared/images/fly.png'
import img1 from '../../shared/images/fly1.jpg'
import img2 from '../../shared/images/fl2.jpg'
import img3 from '../../shared/images/fly3.jpg'
import ArticleFly from '../../components/ArticleFly';


const Fly: React.FC = () => {
    return (
        <div className='fly'>
            <div className='baner-fly'>
                <img src={img} alt="" />
                <h1>DỊCH VỤ ĐƯA ĐÓN SÂN BAY</h1>
            </div>
            <div className='content-fly'>
                <div className='content1'>

                    <img src={img1} alt="" />
                    <div className='content1-text'>
                        <h1>An toàn</h1>
                        <p>Nhà hàng luôn đặt vấn đề an toàn vệ sinh thực phẩm lên hàng đầu. Tất cả các món buffet của nhà hàng đều được chuẩn bị kỹ lưỡng, cũng như chén
                            đĩa đều được lau rửa sạch sẽ, sắp xếp ngăn nắp trước khi đưa lên thực khách.</p>
                    </div>
                </div>
                <div className='content2'>
                    <img src={img2} alt="" />
                    <div className='content2-text'>
                        <h1>Nhanh chóng</h1>
                        <p>Nhà hàng của khách sạn Phú Thọ được thiết kế ấm cúng, dành cho khách lưu trú và khách vãng lại. Các bàn ghế được làm bằng gỗ sang trọng phục vụ các cuộc tiếp khách của khách lưu trú.</p>
                    </div>
                </div>
                <div className='content3'>
                    <img src={img3} alt="" />
                    <div className='content3-text'>
                        <h1>Uy tín</h1>
                        <p>Nhà hàng của khách sạn Phú Thọ được thiết kế ấm cúng, dành cho khách lưu trú và khách vãng lại. Các bàn ghế được làm bằng gỗ sang trọng phục vụ các cuộc tiếp khách của khách lưu trú.</p>
                    </div>
                </div>
            </div>
            <ArticleFly/>
        </div>
    );
};

export default Fly;
