import React, { useState, useEffect } from 'react';
import axios from 'axios';

function AdManager() {
    const [ads, setAds] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:5000/api/ads')
            .then(response => setAds(response.data))
            .catch(error => console.error(error));
    }, []);

    const updateAd = (id, newContent) => {
        axios.put(`http://localhost:5000/api/ads/${id}`, { content: newContent })
            .then(response => {
                setAds(ads.map(ad => ad.id === id ? response.data : ad));
            })
            .catch(error => console.error(error));
    };

    return (
        <div>
            <h1>Manage Ads</h1>
            <ul>
                {ads.map(ad => (
                    <li key={ad.id}>
                        <input 
                            type="text" 
                            value={ad.content} 
                            onChange={(e) => updateAd(ad.id, e.target.value)} 
                        />
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default AdManager;
