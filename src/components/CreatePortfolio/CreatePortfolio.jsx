import { useState } from 'react';
import axios from 'axios';

function CreatePortfolio() {
const [name, setName] = useState('');
const [projectName, setProjectName] = useState('');
const [description, setDescription] = useState('');
const [techStack, setTechStack] = useState('');
const [githubUrl, setGithubUrl] = useState('');

const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const user = JSON.parse(localStorage.getItem('user')); // Fetching user from localStorage
        const userId = user?.id;

        if (!userId) {
        alert("User not logged in!");
        return;
        }
    
        await axios.post('http://localhost:8080/api/portfolio', {
        userId,
        portfolioData: {
        name,
        projects: [{ projectName, description, techStack: techStack.split(','), url: githubUrl }],
        }
    });
    alert('Portfolio created successfully!');
    } catch (err) {
    console.error('Error creating portfolio:', err);
    }
};

return (
    <form onSubmit={handleSubmit}>
    <input 
        type="text" 
        placeholder="Your Name" 
        value={name} 
        onChange={(e) => setName(e.target.value)} 
        required 
    />
    <input 
        type="text" 
        placeholder="Project Name" 
        value={projectName} 
        onChange={(e) => setProjectName(e.target.value)} 
        required 
    />
    <textarea 
        placeholder="Project Description" 
        value={description} 
        onChange={(e) => setDescription(e.target.value)} 
        required 
    />
    <input 
        type="text" 
        placeholder="Tech Stack (comma-separated)" 
        value={techStack} 
        onChange={(e) => setTechStack(e.target.value)} 
        required 
    />
    <input 
        type="url" 
        placeholder="GitHub URL" 
        value={githubUrl} 
        onChange={(e) => setGithubUrl(e.target.value)} 
    />
    <button type="submit">Create Portfolio</button>
    </form>
);
}

export default CreatePortfolio;
