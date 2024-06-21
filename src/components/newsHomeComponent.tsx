import React, { useState, useEffect } from 'react';
import { collection, getDocs, limit, query } from 'firebase/firestore';
import { firestore } from '../config/firebase';
import '../styles/newshomepage.css'

interface UploadBreakfastData {
    id: string;
    image: string;
    admin: string;
    info: string;
    maintitle: string;
    title: string;
    time: string;
}
interface UploadRoomData {
    id: string;
    image: string;
    admin: string;
    content: string;
    title: string;
    mess: string;
    time: string;
}
interface UploadMassData {
    id: string;
    image: string;
    admin: string;
    content: string;
    title: string;
    info: string;
    time: string;
}

interface UploadresData {
    id: string;
    image: string;
    admin: string;
    content: string;
    title: string;
    info: string;
    time: string;
}


const NewsHomePage: React.FC = () => {
    const [uploadedData, setUploadedData] = useState<UploadBreakfastData | null>(null);
    const [uploadedDataRoom, setUploadedDataRoom] = useState<UploadRoomData | null>(null);
    const [uploadedDataMass, setUploadedDataMass] = useState<UploadMassData | null>(null);
    const [uploadedDatares, setUploadedDatares] = useState<UploadresData | null>(null);
    useEffect(() => {
        const fetchUploadedData = async () => {
            const q = query(collection(firestore, 'breakfast'), limit(1));
            const querySnapshot = await getDocs(q);
            if (!querySnapshot.empty) {
                const doc = querySnapshot.docs[0];
                const data: UploadBreakfastData = {
                    id: doc.id,
                    info: doc.data().info,
                    image: doc.data().image,
                    admin: doc.data().admin,
                    maintitle: doc.data().maintitle,
                    title: doc.data().title,
                    time: doc.data().time,
                };
                setUploadedData(data);
            } else {
                console.log('No document found!');
            }
        };
        fetchUploadedData();
    }, []);
    useEffect(() => {
        const fetchUploadedDataRoom = async () => {
            const q = query(collection(firestore, 'roomdata'), limit(1));
            const querySnapshot = await getDocs(q);
            if (!querySnapshot.empty) {
                const doc = querySnapshot.docs[0];
                const data: UploadRoomData = {
                    id: doc.id,
                    content: doc.data().content,
                    image: doc.data().image,
                    admin: doc.data().admin,
                    mess: doc.data().mess,
                    title: doc.data().title,
                    time: doc.data().time,
                };
                setUploadedDataRoom(data);
            } else {
                console.log('No document found!');
            }
        };
        fetchUploadedDataRoom();
    }, []);
    useEffect(() => {
        const fetchUploadedDataMass = async () => {
            const q = query(collection(firestore, 'massdata'), limit(1));
            const querySnapshot = await getDocs(q);
            if (!querySnapshot.empty) {
                const doc = querySnapshot.docs[0];
                const data: UploadMassData = {
                    id: doc.id,
                    content: doc.data().content,
                    image: doc.data().image,
                    admin: doc.data().admin,
                    info: doc.data().info,
                    title: doc.data().title,
                    time: doc.data().time,
                };
                setUploadedDataMass(data);
            } else {
                console.log('No document found!');
            }
        };
        fetchUploadedDataMass();
    }, []);
    useEffect(() => {
        const fetchUploadedDatares = async () => {
            const q = query(collection(firestore, 'resdata'), limit(1));
            const querySnapshot = await getDocs(q);
            if (!querySnapshot.empty) {
                const doc = querySnapshot.docs[0];
                const data: UploadresData = {
                    id: doc.id,
                    content: doc.data().content,
                    image: doc.data().image,
                    admin: doc.data().admin,
                    info: doc.data().info,
                    title: doc.data().title,
                    time: doc.data().time,
                };
                setUploadedDatares(data);
            } else {
                console.log('No document found!');
            }
        };
        fetchUploadedDatares();
    }, []);
    return (
        <div className='newshome'>
            <h1>CÁC BÀI VIẾT MỚI</h1>
            <div className='card-newshome'>
                <div className='breakfast'>
                    <div className='iteam-breakfast'>
                        {uploadedData ? (
                            <div key={uploadedData.id} className='item-card-breakfast'>
                                <img src={uploadedData.image} alt={uploadedData.title} />
                                <h2>{uploadedData.info}</h2>
                                <div className='text-card'>
                                    <h3>{uploadedData.title}</h3>
                                    <p>{uploadedData.maintitle}</p>
                                    <div className='text-time'>
                                        <i className="fa-solid fa-clock"><span>{uploadedData.time}</span></i>
                                        <i className="fa-solid fa-user"><span>{uploadedData.admin}</span></i>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <p>Loading...</p>
                        )}
                    </div>
                </div>
                <div className='news-room'>
                    <div className='iteam-news-room'>
                        {uploadedDataRoom ? (
                            <div key={uploadedDataRoom.id} className='item-card-room'>
                                <img src={uploadedDataRoom.image} alt={uploadedDataRoom.content} />
                                <h2>{uploadedDataRoom.content}</h2>
                                <div className='text-card-room'>
                                    <h3>{uploadedDataRoom.title}</h3>
                                    <p>{uploadedDataRoom.mess}</p>
                                    <div className='text-time-room'>
                                        <i className="fa-solid fa-clock"><span>{uploadedDataRoom.time}</span></i>
                                        <i className="fa-solid fa-user"><span>{uploadedDataRoom.admin}</span></i>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <p>Loading...</p>
                        )}
                    </div>
                </div>
                <div className='news-mass'>
                    <div className='iteam-news-mass'>
                        {uploadedDataMass ? (
                            <div key={uploadedDataMass.id} className='item-card-mass'>
                                <img src={uploadedDataMass.image} alt={uploadedDataMass.content} />
                                <h2>{uploadedDataMass.content}</h2>
                                <div className='text-card-mass'>
                                    <h3>{uploadedDataMass.title}</h3>
                                    <p>{uploadedDataMass.info}</p>
                                    <div className='text-time-mass'>
                                        <i className="fa-solid fa-clock"><span>{uploadedDataMass.time}</span></i>
                                        <i className="fa-solid fa-user"><span>{uploadedDataMass.admin}</span></i>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <p>Loading...</p>
                        )}
                    </div>
                </div>
                <div className='news-res'>
                    <div className='iteam-news-res'>
                        {uploadedDatares ? (
                            <div key={uploadedDatares.id} className='item-card-res'>
                                <img src={uploadedDatares.image} alt={uploadedDatares.content} />
                                <h2>{uploadedDatares.content}</h2>
                                <div className='text-card-res'>
                                    <h3>{uploadedDatares.title}</h3>
                                    <p>{uploadedDatares.info}</p>
                                    <div className='text-time-res'>
                                        <i className="fa-solid fa-clock"><span>{uploadedDatares.time}</span></i>
                                        <i className="fa-solid fa-user"><span>{uploadedDatares.admin}</span></i>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <p>Loading...</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NewsHomePage;
