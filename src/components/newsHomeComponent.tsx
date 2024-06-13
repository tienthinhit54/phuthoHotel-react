import '../../styles/homepage.css'
import React, { useState, useEffect, ChangeEvent, useRef } from 'react';
import { doc, getDoc, collection, query, where, limit, getDocs, orderBy } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { firestore, storage } from '../config/firebase'
import { useParams } from 'react-router-dom';

interface uploadmassData {
    id: string;
    image: string;
    admin: string;
    info: string;
    maintitle: string;
    title: string;
}
const newsHomePage: React.FC = () => {

    const { id } = useParams<{ id: string }>();
    const [breakfast, setBreakfast] = useState<any>(null);
    return (
        <></>
    );
}
