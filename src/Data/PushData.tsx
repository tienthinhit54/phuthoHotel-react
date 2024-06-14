import React, { useState, ChangeEvent } from 'react';
import { collection, addDoc } from 'firebase/firestore';
import { ref as storageRef, uploadBytes, getDownloadURL } from 'firebase/storage';
import { firestore, storage } from '../config/firebase';

interface UploadedData {
    id: string;
    info: string;
    image: string;
    title: string;
    maintitle: string;
    admin: string;
    time: { seconds: number; nanoseconds: number };
}

export const PushData: React.FC = () => {
    const [info, setInfo] = useState<string>('Điểm tâm');
    const [image, setImage] = useState<File | null>(null);
    const [title, setTitle] = useState<string>('Điểm tâm sáng tại khách sạn Phú Thọ');
    const [maintitle, setMaintitle] = useState<string>('Phòng Standard khách sạn Phú Thọ (Quận 11, TP.HCM) là loại phòng tiêu chuẩn, diện tích 25m2...');
    const [admin, setAdmin] = useState<string>('Admin');
    const [uploading, setUploading] = useState<boolean>(false);
    const [uploadedData, setUploadedData] = useState<UploadedData[]>([]);

    const handleInfoChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setInfo(e.target.value);
    };

    const handleTitleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setTitle(e.target.value);
    };

    const handleMaintitleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setMaintitle(e.target.value);
    };

    const handleAdminChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setAdmin(e.target.value);
    };

    const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setImage(e.target.files[0]);
        }
    };

    const handleUpload = async () => {
        if (info && image) {
            setUploading(true);
            try {
                const imgRef = storageRef(storage, `images/${image.name}`);
                const snapshot = await uploadBytes(imgRef, image);
                const downloadURL = await getDownloadURL(snapshot.ref);

                const docRef = await addDoc(collection(firestore, 'breakfast'), {
                    info,
                    title,
                    maintitle,
                    admin,
                    image: downloadURL,
                    timestamp: new Date(),
                });

                setUploadedData((prevData) => [
                    ...prevData,
                    {
                        id: docRef.id,
                        info,
                        title,
                        maintitle,
                        admin,
                        image: downloadURL,
                        time: { seconds: new Date().getTime() / 1000, nanoseconds: 0 }, // Example
                    },
                ]);

                alert('Upload successful!');
            } catch (error) {
                console.error('Error uploading file:', error);
                alert('Upload failed!');
            } finally {
                setUploading(false);
                setAdmin('');
                setTitle('');
                setMaintitle('');
                setInfo('');
                setImage(null);
            }
        } else {
            alert('Please provide all required fields.');
        }
    };

    return (
        <div className="container">
            <input type="file" onChange={handleImageChange} />
            <textarea
                value={info}
                onChange={handleInfoChange}
                placeholder="info"
                rows={5}
                style={{ width: '100%' }}
            />
            <textarea
                value={title}
                onChange={handleTitleChange}
                placeholder="title"
                rows={5}
                style={{ width: '100%' }}
            />
            <textarea
                value={maintitle}
                onChange={handleMaintitleChange}
                placeholder="maintitle"
                rows={5}
                style={{ width: '100%' }}
            />
            <textarea
                value={admin}
                onChange={handleAdminChange}
                placeholder="admin"
                rows={5}
                style={{ width: '100%' }}
            />
            <button onClick={handleUpload} disabled={uploading}>
                {uploading ? 'Uploading...' : 'Upload'}
            </button>
        </div>
    );
};
