import '../styles/massage.css'
import React, { useState, useEffect, } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { firestore, storage } from '../config/firebase';
import { useNavigate } from 'react-router-dom';



interface UploadedData {
    id: string;
    image: string;
    describe: string;
    nameroom: string;
}
const MassageData: React.FC = () => {
    const [uploadedData, setUploadedData] = useState<UploadedData[]>([]);
    const navigate = useNavigate();
    useEffect(() => {
        const fetchUploadedData = async () => {
            const querySnapshot = await getDocs(collection(firestore, 'massdata'));
            const data: UploadedData[] = querySnapshot.docs.map((doc) => ({
                id: doc.id,
                nameroom: doc.data().nameroom,
                image: doc.data().image,
                describe: doc.data().describe,
            }));
            setUploadedData(data);
        };
        fetchUploadedData();
    }, []);
    const handleContentClick = (id: string) => {
        navigate(`/massdetail/${id}`);
      };
    return (
        <div className='card-room-massge'>
            <div className='massage-room'>
                <h2>CÁC LOẠI PHÒNG MASSAGE</h2>
                <div className='card-massage'>
                    <div className='item-cardmassge'>
                        {uploadedData.map((data) => (
                            <div key={data.id} onClick={() => handleContentClick(data.id)} className='item'>
                                <img src={data.image} alt="" />
                                <div className='text-itemmassge'>
                                    <h3>{data.nameroom}</h3>
                                    <p>{data.describe}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MassageData; 