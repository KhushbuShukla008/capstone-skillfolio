import React from 'react';
import { Link } from 'react-router-dom';
import './Portfolio.scss';

const Portfolio = ({ portfolioData }) => {
    console.log("Portfolio Data in Component:", portfolioData);
return (
    <div className='view-portfolio__container'>
    <h2>View Portfolio</h2>
    {portfolioData && portfolioData.length > 0  ? (
        <div>
        <ul>
            {portfolioData.map((project, index) => (
            <li key={index}>
                <h4>{project.project_title}</h4>
                <p>{project.description || 'No description available'}</p>
                <p>Repo Name: {project.repo_name}</p>
                <p>Language: {project.tech_stack || 'Not specified'}</p>
                <a href={project.github_link} target="_blank" rel="noopener noreferrer">GitHub Link</a>
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