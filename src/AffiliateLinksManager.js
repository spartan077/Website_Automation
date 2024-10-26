import React, { useState, useEffect } from 'react';
import axios from 'axios';

function AffiliateLinksManager() {
    const [links, setLinks] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:5000/api/affiliate-links')
            .then(response => setLinks(response.data))
            .catch(error => console.error(error));
    }, []);

    const updateLink = (id, newUrl) => {
        axios.put(`http://localhost:5000/api/affiliate-links/${id}`, { url: newUrl })
            .then(response => {
                setLinks(links.map(link => link.id === id ? response.data : link));
            })
            .catch(error => console.error(error));
    };

    return (
        <div>
            <h1>Manage Affiliate Links</h1>
            <ul>
                {links.map(link => (
                    <li key={link.id}>
                        <input 
                            type="text" 
                            value={link.url} 
                            onChange={(e) => updateLink(link.id, e.target.value)} 
                        />
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default AffiliateLinksManager;
