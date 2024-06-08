import React from "react";
import logo from '../../shared/images/logo.png'
import '../../styles/footer.css'
const Footer: React.FC = () => {
  return (
    <div className="footer">
      <div className="footer-top">
        <div className="logo">
          <img src={logo} alt="" />
        </div>
        <div className="contact">
          <h1>LIÊN HỆ</h1>
          <div className="text-contact">
            <i className="fa-solid fa-location-dot">
              <span> 915 Đường 3 Tháng 2, Phường 7, Quận 11</span>
            </i>
            <i className="fa-solid fa-envelope">
              <span>phutho@phuthohotel.vn</span>
            </i>
            <i className="fa-solid fa-phone">
              <span>(028) 38551310</span>
            </i>
            <i className="fa-solid fa-door-open">
              <span>Check in: 2:00 PM - Check out: 12:00 PM</span>
            </i>
            <i className="fa-brands fa-square-facebook">
              <span>phuthohotel</span>
            </i>
          </div>
        </div>
        <div className="donvi">
          <h2>CÁC ĐƠN VỊ CÙNG HỆ THỐNG PHUTHOTOURIST</h2>
          <p className="p-donvi"> • Công viên Văn hóa Đầm Sen</p>
          <p className="p-donvi"> • Khu du lịch sinh thái Vàm Sát</p>
          <p className="p-donvi"> • Khách sạn Ngọc Lan (Quận 1)</p>
          <p className="p-donvi"> • Khách sạn Phú Thọ (Quận 11)</p>
          <p className="p-donvi"> • Trung tâm Du lịch Đầm Sen</p>
        </div>
      </div>
      <div className="copy">
        <p>Copyright © Công ty Cổ phần Dịch vụ Du lịch Phú Thọ (Phuthotourist) </p>
      </div>
    </div>
  );
};
export default Footer;