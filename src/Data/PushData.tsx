import React, { useState, ChangeEvent } from 'react';
import { collection, addDoc } from 'firebase/firestore';
import { ref as storageRef, uploadBytes, getDownloadURL } from 'firebase/storage';
import { firestore, storage } from '../config/firebase';

interface UploadedData {
    id: string;
    nameroom: string;
    des: string;
    info: string;
    name: string;
    phone: string;
    image: string;
    mail: string;
    mess: string;
}

export const PushData: React.FC = () => {
    const [nameroom, setNameroom] = useState<string>('');
    const [des, setDes] = useState<string>('');
    const [info, setInfo] = useState<string>('');
    const [name, setName] = useState<string>('Nguyen Van B');
    const [phone, setPhone] = useState<string>('0388106728');
    const [image, setImage] = useState<File | null>(null);
    const [mail, setMail] = useState<string>('dtthinh@gmail.com');
    const [mess, setMess] = useState<string>('');
    const [uploading, setUploading] = useState<boolean>(false);
    const [uploadedData, setUploadedData] = useState<UploadedData[]>([]);

    const handleNameRoomChange = (e: ChangeEvent<HTMLInputElement>) => {
        setNameroom(e.target.value);
    };

    const handleDesChange = (e: ChangeEvent<HTMLInputElement>) => {
        setDes(e.target.value);
    };

    const handleInfoChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setInfo(e.target.value);
    };

    const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value);
    };

    const handlePhoneChange = (e: ChangeEvent<HTMLInputElement>) => {
        setPhone(e.target.value);
    };

    const handleMailChange = (e: ChangeEvent<HTMLInputElement>) => {
        setMail(e.target.value);
    };

    const handleMessChange = (e: ChangeEvent<HTMLInputElement>) => {
        setMess(e.target.value);
    };

    const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setImage(e.target.files[0]);
        }
    };

    const handleUpload = async () => {
        if (nameroom && des && info && name && phone && mail && mess && image) {
            setUploading(true);
            try {
                // Upload image to Firebase Storage
                const imgRef = storageRef(storage, `images/${image.name}`);
                const snapshot = await uploadBytes(imgRef, image);
                const downloadURL = await getDownloadURL(snapshot.ref);

                const docRef = await addDoc(collection(firestore, 'roomdata'), {
                    nameroom,
                    des,
                    info,
                    name,
                    phone,
                    image: downloadURL,
                    mail,
                    mess,
                    timestamp: new Date(),
                });

                // Add the new data to the local state
                setUploadedData((prevData) => [
                    ...prevData,
                    {
                        id: docRef.id,
                        nameroom,
                        des,
                        info,
                        name,
                        phone,
                        image: downloadURL,
                        mail,
                        mess,
                    },
                ]);

                alert('Upload successful!');
            } catch (error) {
                console.error('Error uploading file:', error);
                alert('Upload failed!');
            } finally {
                setUploading(false);
                setNameroom('');
                setDes('');
                setInfo('');
                setName('');
                setPhone('');
                setImage(null);
                setMail('');
                setMess('');
            }
        } else {
            alert('Please provide all required fields.');
        }
    };

    return (
        <div className="container">
            <input type="text" value={nameroom} onChange={handleNameRoomChange} placeholder="Enter nameroom" />
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
            <input type="text" value={mess} onChange={handleMessChange} placeholder="Enter mess" />
            <button onClick={handleUpload} disabled={uploading}>
                {uploading ? 'Uploading...' : 'Upload'}
            </button>
        </div>
    );
};
