import React, { useState } from 'react';
import axios from 'axios';

const CreatePortfolio = () => {
    const [portfolioData, setPortfolioData] = useState({
    projects: [],
    });

    const handleChange = (e) => {
    setPortfolioData({ ...portfolioData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    try {
    const response = await axios.post('/api/portfolio', portfolioData, {
        headers: { Authorization: `Bearer ${token}` },
    });
    console.log(response.data);
    } catch (error) {
    console.error(error);
    }
    };

    return (
    <div>
    <h2>Create Portfolio</h2>
    {/* <img src={portfolioImage} alt="Create Portfolio Page" /> */}
    <form onSubmit={handleSubmit}>
        <input type="text" name="projectName" placeholder="Project Name" onChange={handleChange} required />
        <input type="text" name="description" placeholder="Description" onChange={handleChange} required />
        <input type="text" name="techStack" placeholder="Tech Stack" onChange={handleChange} required />
        <input type="url" name="githubLink" placeholder="GitHub Link" onChange={handleChange} required />
        <button type="submit">Create Portfolio</button>
    </form>
    </div>
    );
};

export default CreatePortfolio;