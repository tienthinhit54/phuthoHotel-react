import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { firestore } from '../../config/firebase';
import '../../styles/DetailMass.css'
import { PushData } from '../../Data/PushData';
import ArticleMass from '../../components/ArticleMass';

interface massdetail {
  id: string;
  nameroom: string;
  mota: string;
  nen: string;
  image1: string;
  image2: string;
  image3: string;
  image4: string;
  image5: string;
  image6: string;
  image7: string;
  image8: string;
  image9: string;
  image10: string;

}

const DetailMass: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [massdetail, setmassdetail] = useState<massdetail | null>(null);

  useEffect(() => {
    const fetchmassdetail = async () => {
      if (id) {
        const docRef = doc(firestore, 'massdata', id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setmassdetail({ id: docSnap.id, ...docSnap.data() } as massdetail);
        } else {
          console.log('No such document!');
        }
      }
    };
    fetchmassdetail();
  }, [id]);

  if (!massdetail) {
    return <div>Loading...</div>;
  }

  return (
    <div className="mass-detail">
      <div className='baner-massdetail'>
        <img src={massdetail.nen} alt="" />
        <div className='text-baner-massdetail'>
          <h1>{massdetail.nameroom}</h1>
        </div>
      </div>
      <div className='mota-detailmass'>
        <h1>MÔ TẢ</h1>
        <div className='top-mota'>
          <img src={massdetail.image1} alt="" />
          <div className='img-top-mota'>
            <img src={massdetail.image7} alt="" />
          </div>

        </div>
        <div className='bottom-mota'>
          <img src={massdetail.image2} alt="" />
          <div className='img-bottom-mota'>
            <img src={massdetail.image8} alt="" />
          </div>
        </div>
      </div>
      <div className='sauna-detailmass'>
        <h1>PHÒNG TẮM VÀ SAUNA</h1>
        <div className='top-sauna'>
          <img src={massdetail.image3} alt="" />
          <img src={massdetail.image9} alt="" />
        </div>
        <div className='center-sauna'>
          <img src={massdetail.image4} alt="" />
        </div>
        <div className='bottom-sauna'>
          <img src={massdetail.image5} alt="" />
          <img src={massdetail.image6} alt="" />
          <img src={massdetail.image10} alt="" />
        </div>
      </div>
      <ArticleMass/>
    </div>
  );
};

export default DetailMass;
