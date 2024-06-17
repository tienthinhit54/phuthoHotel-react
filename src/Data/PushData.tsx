import React, { useState, ChangeEvent } from 'react';
import { collection, addDoc } from 'firebase/firestore';
import { ref as storageRef, uploadBytes, getDownloadURL } from 'firebase/storage';
import { firestore, storage } from '../config/firebase';

interface UploadedData {
    id: string;
    nameroom: string;
    image: string;
    describe: string;
    time: { seconds: number; nanoseconds: number };
}

export const PushData: React.FC = () => {
    const [nameroom, setnameroom] = useState<string>('Điểm tâm');
    const [image, setImage] = useState<File | null>(null);
    const [describe, setdescribe] = useState<string>('Điểm tâm sáng tại khách sạn Phú Thọ');
    // const [maindescribe, setMaindescribe] = useState<string>('Phòng Standard khách sạn Phú Thọ (Quận 11, TP.HCM) là loại phòng tiêu chuẩn, diện tích 25m2...');
    // const [admin, setAdmin] = useState<string>('Admin');
    const [uploading, setUploading] = useState<boolean>(false);
    const [uploadedData, setUploadedData] = useState<UploadedData[]>([]);

    const handlenameroomChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setnameroom(e.target.value);
    };

    const handledescribeChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setdescribe(e.target.value);
    };

    // const handleMaindescribeChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    //     setMaindescribe(e.target.value);
    // };

    // const handleAdminChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    //     setAdmin(e.target.value);
    // };

    const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setImage(e.target.files[0]);
        }
    };

    const handleUpload = async () => {
        if (nameroom && image) {
            setUploading(true);
            try {
                const imgRef = storageRef(storage, `images/${image.name}`);
                const snapshot = await uploadBytes(imgRef, image);
                const downloadURL = await getDownloadURL(snapshot.ref);

                const docRef = await addDoc(collection(firestore, 'data'), {
                    nameroom,
                    describe,
                    // maindescribe,
                    // admin,
                    image: downloadURL,
                    timestamp: new Date(),
                });

                setUploadedData((prevData) => [
                    ...prevData,
                    {
                        id: docRef.id,
                        nameroom,
                        describe,
                        // maindescribe,
                        // admin,
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
                setdescribe('');
                setnameroom('');
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
                value={nameroom}
                onChange={handlenameroomChange}
                placeholder="nameroom"
                rows={5}
                style={{ width: '100%' }}
            />
            <textarea
                value={describe}
                onChange={handledescribeChange}
                placeholder="describe"
                rows={5}
                style={{ width: '100%' }}
            />
            {/* <textarea
                value={maindescribe}
                onChange={handleMaindescribeChange}
                placeholder="maindescribe"
                rows={5}
                style={{ width: '100%' }}
            />
            <textarea
                value={admin}
                onChange={handleAdminChange}
                placeholder="admin"
                rows={5}
                style={{ width: '100%' }}
            /> */}
            <button onClick={handleUpload} disabled={uploading}>
                {uploading ? 'Uploading...' : 'Upload'}
            </button>
        </div>
    );
};
