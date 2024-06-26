import React, { useState, ChangeEvent, useEffect } from 'react';
import { collection, addDoc, getDocs, query, limit } from 'firebase/firestore';
import { ref as storageRef, uploadBytes, getDownloadURL } from 'firebase/storage';
import { firestore, storage } from '../config/firebase';
import '../styles/Complant.css'

interface UploadedData {
    id: string;
    name: string;
    image1: string;
    mess: string;
    phone: string;
    email: string;
    time1: string;
}

export const Complant: React.FC = () => {
    const [name, setName] = useState<string>('');
    const [image1, setImage1] = useState<File | null>(null);
    const [mess, setMess] = useState<string>('');
    const [phone, setPhone] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [uploading, setUploading] = useState<boolean>(false);
    const [uploadedData, setUploadedData] = useState<UploadedData[]>([]);

    const handleNameChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setName(e.target.value);
    };

    const handleMessChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setMess(e.target.value);
    };

    const handlePhoneChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setPhone(e.target.value);
    };

    const handleEmailChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setEmail(e.target.value);
    };

    const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setImage1(e.target.files[0]);
        }
    };

    const handleUpload = async () => {
        if (image1) {
            setUploading(true);
            try {
                const imgRef = storageRef(storage, `images/${image1.name}`);
                const snapshot = await uploadBytes(imgRef, image1);
                const downloadURL = await getDownloadURL(snapshot.ref);

                const docRef = await addDoc(collection(firestore, 'roomdata'), {
                    name,
                    email,
                    phone,
                    mess,
                    image1: downloadURL,
                    time1: new Date().toISOString(),
                    timestamp: new Date(),
                });

                setUploadedData((prevData) => [
                    ...prevData,
                    {
                        id: docRef.id,
                        name,
                        email,
                        phone,
                        mess,
                        image1: downloadURL,
                        time1: new Date().toISOString(),
                    },
                ]);

                alert('Đã gửi!');
            } catch (error) {
                console.error('Error uploading file:', error);
                alert('Upload failed!');
            } finally {
                setUploading(false);
                setImage1(null);
            }
        } else {
            alert('Please provide all required fields.');
        }
    };

    useEffect(() => {
        const fetchUploadedData = async () => {
            const q = query(collection(firestore, 'roomdata'), limit(3));
            const querySnapshot = await getDocs(q);
            const data: UploadedData[] = querySnapshot.docs.map((doc) => ({
                id: doc.id,
                name: doc.data().name,
                image1: doc.data().image1,
                mess: doc.data().mess,
                phone: doc.data().phone,
                email: doc.data().email,
                time1: doc.data().time1,
            }));
            setUploadedData(data);
        };
        fetchUploadedData();
    }, []);

    return (
        <div className="complant">
            <h1>PHẢN HỒI TỪ KHÁCH HÀNG</h1>
            <div className='container-complant'>
                <div className='iteam-complant'>
                    {uploadedData.map((data) => (
                        <div key={data.id} className='item-card-complant'>
                            <div className='img-text-complant'>
                                <img src={data.image1} alt={data.name} />
                                <div className='text-right-complant'>
                                    <h2>{data.name}</h2>
                                    <p>{data.time1}</p>
                                </div>
                            </div>

                            <h3>{data.mess}</h3>
                        </div>
                    ))}
                </div>
            </div>
            <div className='input-complant'>
                <h1>Bình luận</h1>
                <div className='input-complant-text'>
                    <textarea
                        value={name}
                        onChange={handleNameChange}
                        placeholder="Họ và tên(Bắt buộc)"
                        rows={2}
                    />
                    <textarea
                        value={phone}
                        onChange={handlePhoneChange}
                        placeholder="SĐT"
                        rows={2}
                    />
                    <textarea
                        value={email}
                        onChange={handleEmailChange}
                        placeholder="Email"
                        rows={2}
                    />
                    <textarea
                        value={mess}
                        onChange={handleMessChange}
                        placeholder="Lời nhắn"
                        rows={10}
                    />
                    {/* <input type="file" onChange={handleImageChange} /> */}
                    <button onClick={handleUpload} disabled={uploading}>
                        {uploading ? 'Đang gửi...' : 'Gửi'}
                    </button>
                </div>
            </div>
        </div>
    );
};
