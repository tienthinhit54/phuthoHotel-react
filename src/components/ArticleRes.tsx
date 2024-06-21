import '../styles/massage.css'
import React, { useState, useEffect, } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { firestore, storage } from '../config/firebase'
import '../styles/articleres.css'


interface UploadedData {
    id: string;
    nameroom: string;
    maindescribe: string;
    image: string;
    describe: string;
    admin: string;
    time: string;
}
const ArticleRes: React.FC = () => {
    const [uploadedData, setUploadedData] = useState<UploadedData[]>([]);
    useEffect(() => {
        const fetchUploadedData = async () => {
            const querySnapshot = await getDocs(collection(firestore, 'resatcdata'));
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
        <div className='article-card-res'>
            <h1>CÁC BÀI VIẾT LIÊN QUAN</h1>
            <div className='article-res-article'>
                <div className='article-card-res-item'>
                    <div className='item-articel-cardres'>
                        {uploadedData.map((data) => (
                            <div key={data.id} className='item-articel-res'>
                                <img src={data.image} alt="" />
                                <div className='text-item-res'>
                                    <h2>{data.nameroom}</h2>
                                    <h3>{data.describe}</h3>
                                    <p>{data.maindescribe}</p>
                                    <div className='text-res-admin'>
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

export default ArticleRes; 