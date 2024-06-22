import '../styles/massage.css'
import React, { useState, useEffect, } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { firestore, storage } from '../config/firebase'
import '../styles/ArticleMass.css'


interface UploadedData {
    id: string;
    nameroom: string;
    maindescribe: string;
    image: string;
    describe: string;
    admin: string;
    time: string;
}
const ArticleMass: React.FC = () => {
    const [uploadedData, setUploadedData] = useState<UploadedData[]>([]);
    useEffect(() => {
        const fetchUploadedData = async () => {
            const querySnapshot = await getDocs(collection(firestore, 'acticlemassdata'));
            const data: UploadedData[] = querySnapshot.docs.map((doc) => ({
                id: doc.id,
                nameroom: doc.data().nameroom,
                image: doc.data().image,
                describe: doc.data().describe,
                maindescribe: doc.data().maindescribe,
                admin: doc.data().admin,
                time: doc.data().time,
            }));
            setUploadedData(data);
        };
        fetchUploadedData();
    }, []);
    return (
        <div className='card-massdetail'>
            <h1>CÁC BÀI VIẾT LIÊN QUAN</h1>
            <div className='massdetail-article'>
                <div className='card-massdetail-item'>
                    <div className='item-cardmassdetail'>
                        {uploadedData.map((data) => (
                            <div key={data.id} className='item-massdetail'>
                                <img src={data.image} alt="" />
                                <div className='text-item-massdetail'>
                                    <h2>{data.nameroom}</h2>
                                    <h3>{data.describe}</h3>
                                    <p>{data.maindescribe}</p>
                                    <div className='text-massdetail-admin'>
                                    <i className="fa-solid fa-clock"><span>{data.time}</span></i>
                                    <i className="fa-solid fa-user"><span>{data.admin}</span></i>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ArticleMass; 