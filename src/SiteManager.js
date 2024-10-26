import React, { useState, useEffect } from 'react';
import axios from 'axios';

function SiteManager() {
    const [sites, setSites] = useState([]);

    useEffect(() => {
        fetchSites();
    }, []);

    const fetchSites = () => {
        axios.get('http://localhost:5001/api/sites')
            .then(response => {
                setSites(response.data);
            })
            .catch(error => {
                console.error('Error fetching sites:', error);
                if (error.response) {
                    console.error('Response data:', error.response.data);
                    console.error('Response status:', error.response.status);
                }
            });
    };

    const updateSite = (id, newName) => {
        axios.put(`http://localhost:5000/api/sites/${id}`, { name: newName })
            .then(response => {
                setSites(sites.map(site => site.id === id ? response.data : site));
            })
            .catch(error => console.error(error));
    };

    return (
        <div>
            <h2>Site Manager</h2>
            <ul>
                {sites.map((site, index) => (
                    <li key={index}>
                        <input 
                            type="text" 
                            value={site.name} 
                            onChange={(e) => updateSite(site.id, e.target.value)} 
                        />
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default SiteManager;
