import '../styles/ortherhome.css'
import React, { useState, useEffect} from 'react';
import { collection,  getDocs } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { firestore, storage } from '../config/firebase'

interface uploadresData {
    id: string;
    image: string;
    info: string;
    button: string;
}
interface uploadmassData {
    id: string;
    image: string;
    info: string;
    button: string;
}
const OrtherHomePage: React.FC = () => {
    const [uploadresData, setUploadresData] = useState<uploadresData[]>([]);
    const [uploadmassData, setUploadmassData] = useState<uploadresData[]>([]);
    const navigate = useNavigate();
    useEffect(() => {
        const resUploadedData = async () => {
            const querySnapshot = await getDocs(collection(firestore, 'resdata'));
            const data: uploadresData[] = querySnapshot.docs.map((doc) => ({
                id: doc.id,
                info: doc.data().info,
                image: doc.data().image,
                button: doc.data().button,
            }));
            setUploadresData(data);
        };
        resUploadedData();
    }, [])
    useEffect(() => {
        const massUploadedData = async () => {
            const querySnapshot = await getDocs(collection(firestore, 'massdatahome'));
            const data: uploadmassData[] = querySnapshot.docs.map((doc) => ({
                id: doc.id,
                info: doc.data().info,
                image: doc.data().image,
                button: doc.data().button,
            }));
            setUploadmassData(data);
        };
        massUploadedData();
    }, []);
    const handleMassClick = () => {
        navigate(`/massage`);
    }
    const handleResClick = () => {
        navigate(`/service/res`);
    }
    return (
        <>
            <div className='utilities-home'>
                <h1>CÁC TIỆN ÍCH KHÁC</h1>
                <div className='res-home'>
                    {uploadresData.map((data) =>
                        <div className='item-res' key={data.id}>
                            <img src={data.image} alt="" />
                            <div className='text-res'>
                                <p className='res'>Nhà hàng</p>
                                <p className='info'>{data.info}</p>
                                <button onClick={handleResClick}>{data.button}</button>
                            </div>
                        </div>
                    )}
                </div>
                <div className='mass-home'>
                    {uploadmassData.map((data) =>
                        <div className='item-mass' key={data.id}>
                            <img src={data.image} alt="" />
                            <div className='text-mass'>
                                <p className='mass'>Massage</p>
                                <p className='info-mass'>{data.info}</p>
                                <button onClick={handleMassClick}>{data.button}</button>
                            </div>
                        </div>
                    )}
                </div>

            </div>
        </>
    );
};
export default OrtherHomePage;