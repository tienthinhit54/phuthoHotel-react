import React, { useState, ChangeEvent } from 'react';
import { collection, addDoc } from 'firebase/firestore';
import { ref as storageRef, uploadBytes, getDownloadURL } from 'firebase/storage';
import { firestore, storage } from '../config/firebase';

interface UploadedData {
    id: string;
    // nameroom: string;
    // maindescribe: string;
     image: string;
    // describe: string;
    info: string;
}

export const PushData: React.FC = () => {
    // const [nameroom, setnameroom] = useState<string>('DỊCH VỤ');
     const [image, setImage] = useState<File | null>(null);
    // const [describe, setdescribe] = useState<string>('Xe khách đạt chuẩn');
    // const [maindescribe, setMaindescribe] = useState<string>('Phòng Standard khách sạn Phú Thọ (Quận 11, TP.HCM) là loại phòng tiêu chuẩn, diện tích 25m2, với 1 giường khổ 1,6m x 2m. Phòng được được lát sàn gỗ, đèn trần ánh sáng vàng. Các thiết bị điều khiển đèn, ổ cắm điện được thiết kế đầu giường. Phòng có 2 ghế salon và bàn uống trà, bình đun nước sôi. Bàn làm việc có ổ cắm điện. Nhà vệ sinh có phòng tắm đứng, nước nóng lạnh, và các thiết bị vệ sinh tối thiểu. TV màn hình phẳng đời mới, sử dụng truyền hình cáp. Rèm cửa sổ có hoa văn nhẹ, làm giảm ánh sáng, giúp du khách có những giấc nghỉ êm ái.');
    const [info, setinfo] = useState<string>('info');
    const [uploading, setUploading] = useState<boolean>(false);
    const [uploadedData, setUploadedData] = useState<UploadedData[]>([]);

    // const handlenameroomChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    //     setnameroom(e.target.value);
    // };

    // const handledescribeChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    //     setdescribe(e.target.value);
    // };

    // const handleMaindescribeChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    //     setMaindescribe(e.target.value);
    // };

    const handleinfoChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setinfo(e.target.value);
    };

     const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
         if (e.target.files && e.target.files[0]) {
             setImage(e.target.files[0]);
         }
     };

    const handleUpload = async () => {
        if (image) {
            setUploading(true);
            try {
                const imgRef = storageRef(storage, `images/${image.name}`);
                const snapshot = await uploadBytes(imgRef, image);
                const downloadURL = await getDownloadURL(snapshot.ref);

                const docRef = await addDoc(collection(firestore, 'roomdata'), {
                    // nameroom,
                    // describe,
                    // maindescribe,
                    info,
                    image: downloadURL,
                    timestamp: new Date(),
                });

                setUploadedData((prevData) => [
                    ...prevData,
                    {
                        id: docRef.id,
                        // nameroom,
                        // describe,
                        // maindescribe,
                        info,
                        image: downloadURL,
                    },
                ]);

                alert('Upload successful!');
            } catch (error) {
                console.error('Error uploading file:', error);
                alert('Upload failed!');
            } finally {
                setUploading(false);
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
                onChange={handleinfoChange}
                placeholder="nameroom"
                rows={5}
                style={{ width: '100%' }}

            />            
            <button onClick={handleUpload} disabled={uploading}>
                {uploading ? 'Uploading...' : 'Upload'}
            </button>
        </div>
    );
};
