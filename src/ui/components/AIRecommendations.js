// src/ui/components/AIRecommendations.js

import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AIRecommendations = () => {
    const [recommendations, setRecommendations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchRecommendations = async () => {
            try {
                const response = await axios.get('/api/recommendations'); // Replace with your API endpoint
                setRecommendations(response.data);
            } catch (err) {
                setError('Failed to fetch recommendations');
            } finally {
                setLoading(false);
            }
        };

        fetchRecommendations();
    }, []);

    if (loading) {
        return <div>Loading recommendations...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div className="ai-recommendations">
            <h2>AI-Generated Recommendations</h2>
            <ul>
                {recommendations.map((rec, index) => (
                    <li key={index}>
                        <h3>{rec.title}</h3>
                        <p>{rec.description}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default AIRecommendations;
