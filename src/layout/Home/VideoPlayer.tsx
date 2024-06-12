import React, { useRef, useState } from 'react';
import '../../styles/videoplayer.css'

interface VideoPlayerProps {
    videoSrc: string;
    posterSrc: string;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ videoSrc, posterSrc }) => {
    const videoRef = useRef<HTMLVideoElement>(null);

    const [isPlaying, setIsPlaying] = useState(false);

    const handleVideoClick = () => {
        if (videoRef.current) {
          if (isPlaying) {
            videoRef.current.pause();
          } else {
            videoRef.current.play();
          }
          setIsPlaying(!isPlaying);
        }
      };
    return (
        <div className='video-container' onClick={handleVideoClick}>
            <video ref={videoRef} poster={posterSrc}>
                <source src={videoSrc} type="video/mp4" />
            </video>
            <div className='video-text'>
            <h1>Khách sạn Phú Thọ Quận 11</h1>
            <p>Giới thiệu khách sạn Phú Thọ quận 11, trực thuộc Công ty Cổ phần Dịch vụ Du lịch Phú Thọ (Phuthotourist)</p>
            </div>
            {!isPlaying && <div className="play-button"></div>}
        </div>
    );
};

export default VideoPlayer;