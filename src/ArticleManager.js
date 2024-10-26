import React, { useState, useEffect } from 'react';
import axios from 'axios';

function ArticleManager() {
    const [articles, setArticles] = useState([]);
    const [trendingTopics, setTrendingTopics] = useState([]);
    const [selectedTopic, setSelectedTopic] = useState('');
    const [customTopic, setCustomTopic] = useState('');
    const [niche, setNiche] = useState('');

    useEffect(() => {
        fetchArticles();
    }, []);

    const fetchArticles = () => {
        axios.get('http://localhost:5001/api/articles')
            .then(response => setArticles(response.data))
            .catch(error => console.error('Error fetching articles:', error));
    };

    const fetchTrendingTopics = () => {
        axios.get(`http://localhost:5001/api/trending-topics?niche=${niche}`)
            .then(response => {
                setTrendingTopics(response.data);
            })
            .catch(error => console.error('Error fetching trending topics:', error));
    };

    const createArticle = () => {
        const topic = selectedTopic || customTopic;
        if (topic) {
            axios.post('http://localhost:5001/api/create-article', { topic })
                .then(response => {
                    setArticles([...articles, response.data]);
                    setSelectedTopic('');
                    setCustomTopic('');
                })
                .catch(error => {
                    console.error('Error creating article:', error);
                    if (error.response) {
                        console.error('Error data:', error.response.data);
                    }
                });
        }
    };

    return (
        <div>
            <h2>Article Manager</h2>
            <div>
                <input 
                    type="text" 
                    value={niche} 
                    onChange={(e) => setNiche(e.target.value)} 
                    placeholder="Enter niche"
                />
                <button onClick={fetchTrendingTopics}>Find Trending Topics</button>
            </div>
            <div>
                <select value={selectedTopic} onChange={(e) => setSelectedTopic(e.target.value)}>
                    <option value="">Select a topic</option>
                    {trendingTopics.map((topic, index) => (
                        <option key={index} value={topic}>{topic}</option>
                    ))}
                </select>
                <input 
                    type="text" 
                    value={customTopic} 
                    onChange={(e) => setCustomTopic(e.target.value)} 
                    placeholder="Or enter custom topic"
                />
                <button onClick={createArticle}>Create Article</button>
            </div>
            <ul>
                {articles.map((article, index) => (
                    <li key={index}>
                        <h3>{article.title}</h3>
                        <p>{article.content}</p>
                        <p>Keywords: {article.keywords ? article.keywords.join(', ') : ''}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default ArticleManager;
