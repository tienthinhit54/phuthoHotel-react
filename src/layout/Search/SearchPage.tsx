import React, { useState, ChangeEvent, useEffect } from 'react';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { firestore } from '../../config/firebase';
import '../../styles/Search.css'
interface UploadedData {
    id: string;
    name: string;
    image1: string;
    mess: string;
    phone: string;
    email: string;
    time1: string;
}

const SearchPage: React.FC = () => {
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [searchResults, setSearchResults] = useState<UploadedData[]>([]);

    const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.target.value);
    };

    const handleSearch = async () => {
        if (searchQuery.trim() === '') {
            setSearchResults([]);
            return;
        }

        const q = query(collection(firestore, 'roomdata'), where('name', '>=', searchQuery), where('name', '<=', searchQuery + '\uf8ff'));
        const querySnapshot = await getDocs(q);
        const results: UploadedData[] = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            name: doc.data().name,
            image1: doc.data().image1,
            mess: doc.data().mess,
            phone: doc.data().phone,
            email: doc.data().email,
            time1: doc.data().time1,
        }));

        setSearchResults(results);
    };

    return (
        <div className="search-container">
            <input
                type="text"
                value={searchQuery}
                onChange={handleSearchChange}
                placeholder="Search by name"
                style={{ width: '100%', padding: '8px', marginBottom: '10px' }}
            />
            <button onClick={handleSearch} style={{ padding: '8px', width: '100%' }}>Search</button>

            <div className="search-results">
                {searchResults.length > 0 ? (
                    searchResults.map((data) => (
                        <div key={data.id} className="search-result-item">
                            <img src={data.image1} alt={data.name} style={{ width: '100px', height: '100px' }} />
                            <h2>{data.name}</h2>
                            <p>{data.mess}</p>
                        </div>
                    ))
                ) : (
                    <p>No results found</p>
                )}
            </div>
        </div>
    );
};

export default SearchPage;
