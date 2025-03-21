import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ViewPortfolio = () => {
const [portfolioData, setPortfolioData] = useState(null);

    useEffect(() => {
    const fetchPortfolioData = async () => {
    const token = localStorage.getItem('token');
    try {
        const response = await axios.get('/api/portfolio/1', {
        headers: { Authorization: `Bearer ${token}` },
        });
        setPortfolioData(response.data);
    } catch (error) {
        console.error(error);
    }
    };

    fetchPortfolioData();
}, []);

return (
    <div>
    <h2>View Portfolio</h2>
    {/* <img src={viewPortfolioImage} alt="View Portfolio Page" /> */}
    {portfolioData ? (
        <div>
        <h3>{portfolioData.name}</h3>
        <ul>
            {portfolioData.projects.map((project, index) => (
            <li key={index}>
                <h4>{project.name}</h4>
                <p>{project.description}</p>
                <p>{project.techStack.join(', ')}</p>
                <a href={project.url} target="_blank" rel="noopener noreferrer">GitHub Link</a>
            </li>
            ))}
        </ul>
        </div>
        ) : (
        <p>Loading...</p>
        )}
    </div>
    );
};

export default ViewPortfolio;