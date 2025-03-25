import React from 'react';
import { Link } from 'react-router-dom';

const Portfolio = ({ portfolioData }) => {
return (
    <div>
    <h2>View Portfolio</h2>
    {portfolioData && portfolioData.length > 0  ? (
        <div>
        <h3>{portfolioData.name}</h3>
        <ul>
            {portfolioData.map((repo, index) => (
            <li key={index}>
                <h4>{repo.project_title}</h4>
                <p>{repo.description || 'No description available'}</p>
                <p>Repo Name: {repo.repo_name}</p>
                <p>Language: {repo.tech_stack || 'Not specified'}</p>
                <a href={repo.github_url} target="_blank" rel="noopener noreferrer">GitHub Link</a>
            </li>
            ))}
        </ul>
        </div>
        ) : (
        <p>No portfolio data available yet. Please{' '}
        <Link to="/createportfolio">add some projects!</Link>
        </p>
        )}
    </div>
    );
};

export default Portfolio;