import React, { useState, ChangeEvent } from 'react';
import { collection, addDoc } from 'firebase/firestore';
import { ref as storageRef, uploadBytes, getDownloadURL } from 'firebase/storage';
import { firestore, storage } from '../config/firebase';

interface UploadedData {
    id: string;
    info: string;
    image: string;
    title:string;
    maintitle:string;
    admin:string;
}

export const PushData: React.FC = () => {
    const [info, setInfo] = useState<string>('Điểm tâm');
    const [image, setImage] = useState<File | null>(null);
    const [title, setTitle] = useState<string>('Điểm tâm sáng tại khách sạn Phú Thọ');
    const [maintitle, setMaintitle] = useState<string>('Phòng Standard khách sạn Phú Thọ (Quận 11, TP.HCM) là loại phòng tiêu chuẩn, diện tích 25m2...');
    const [admin, setAdmin] = useState<string>('Admin');
    const [uploading, setUploading] = useState<boolean>(false);
    const [uploadedData, setUploadedData] = useState<UploadedData[]>([]);

    // const handleNameRoomChange = (e: ChangeEvent<HTMLInputElement>) => {
    //     setNameroom(e.target.value);
    // };

    // const handleDesChange = (e: ChangeEvent<HTMLInputElement>) => {
    //     setDes(e.target.value);
    // };

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

    // const handleMessChange = (e: ChangeEvent<HTMLInputElement>) => {
    //     setMess(e.target.value);
    // };

    const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setImage(e.target.files[0]);
        }
    };

    const handleUpload = async () => {
        if (info && image) {
            setUploading(true);
            try {
                // Upload image to Firebase Storage
                const imgRef = storageRef(storage, `images/${image.name}`);
                const snapshot = await uploadBytes(imgRef, image);
                const downloadURL = await getDownloadURL(snapshot.ref);

                const docRef = await addDoc(collection(firestore, 'breakfast'), {
                    // nameroom,
                    // des,
                    info,
                    title,
                    // phone,
                    maintitle,
                    admin,
                    image: downloadURL,
                    // mail,
                    // mess,
                    timestamp: new Date(),

                });


                // Add the new data to the local state
                setUploadedData((prevData) => [
                    ...prevData,
                    {
                        id: docRef.id,
                        // nameroom,
                        // des,
                        info,
                        title,
                        maintitle,
                        admin,
                        // name,
                        // phone,
                        image: downloadURL,
                        // mail,
                        // mess,
                    },
                ]);

                alert('Upload successful!');
            } catch (error) {
                console.error('Error uploading file:', error);
                alert('Upload failed!');
            } finally {
                setUploading(false);
                // setNameroom('');
                // setDes('');
                setAdmin('');
                setTitle('');
                setMaintitle('');
                setInfo('');
                // setName('');
                // setPhone('');
                setImage(null);
                // setMail('');
                // setMess('');
            }
        } else {
            alert('Please provide all required fields.');
        }
    };

    return (
        <div className="container">
            {/* <input type="text" value={nameroom} onChange={handleNameRoomChange} placeholder="Enter nameroom" />
            <input type="text" value={des} onChange={handleDesChange} placeholder="Enter des" />
            <textarea
                value={info}
                onChange={handleInfoChange}
                placeholder="info"
                rows={5}
                style={{ width: '100%' }}
            />
            <input type="text" value={name} onChange={handleNameChange} placeholder="Enter name" />
            <input type="text" value={phone} onChange={handlePhoneChange} placeholder="Enter phone" />
            <input type="text" value={mail} onChange={handleMailChange} placeholder="Enter mail" />
            <input type="file" onChange={handleImageChange} />
            <input type="text" value={mess} onChange={handleMessChange} placeholder="Enter mess" /> */}
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
                placeholder="info"
                rows={5}
                style={{ width: '100%' }}
            />
              <textarea
                value={maintitle}
                onChange={handleMaintitleChange}
                placeholder="info"
                rows={5}
                style={{ width: '100%' }}
            />
              <textarea
                value={admin}
                onChange={handleAdminChange}
                placeholder="info"
                rows={5}
                style={{ width: '100%' }}
            />
            <button onClick={handleUpload} disabled={uploading}>
                {uploading ? 'Uploading...' : 'Upload'}
            </button>
        </div>
    );
};
