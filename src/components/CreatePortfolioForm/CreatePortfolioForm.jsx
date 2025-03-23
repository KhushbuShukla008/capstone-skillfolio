import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./CreatePortfolioForm.scss";

function CreatePortfolioForm() {
    const [repos, setRepos] = useState([]);
    const [selectedRepo, setSelectedRepo] = useState('');
    const [projectTitle, setProjectTitle] = useState('');
    const [description, setDescription] = useState('');
    const [language, setLanguage] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);


useEffect(() => {
        const fetchRepos = async () => {
            try {
            const token = localStorage.getItem('access_token');
            const user = JSON.parse(localStorage.getItem('user'));
            const login = user?.githubUsername;
            if (!token || !login) {
                throw new Error('No token or login found in localStorage');
            }
            console.log('Using token:', token);
            console.log('Using login:', login);
            const response = await axios.get(`https://api.github.com/users/${login}/repos`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            console.log('GitHub API Response:', response.data);
            setRepos(response.data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching repositories:', error);
            if (error.response && error.response.status === 401) {
                console.error('Unauthorized. Please check your access token and its permissions.');
                setError('Unauthorized. Please check your access token.');
            } else {
                setError('Failed to fetch repositories.');
            }
            setLoading(false);
        }
        };
    
        fetchRepos();
    }, []);

    const handleRepoChange = async (e) => {
        const selectedRepoName = e.target.value;
        setSelectedRepo(selectedRepoName);

        try {
            const token = localStorage.getItem('access_token');
            const user = JSON.parse(localStorage.getItem('user'));
            const login = user?.githubUsername;
            if (!token || !login) {
                throw new Error('No token or login found in localStorage');
            }

            const selectedRepoDetails = repos.find(repo => repo.name === selectedRepoName);

            if (selectedRepoDetails) {
            setProjectTitle(selectedRepoDetails.name);
            setDescription(selectedRepoDetails.description);
            const languagesResponse = await axios.get(`http://localhost:8080/repos/${login}/${selectedRepoName}/languages`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setLanguage(Object.keys(languagesResponse.data).join(', '));
        }
        } catch (error) {
            console.error('Error fetching repository details:', error);
        }
    };

const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const token = localStorage.getItem('access_token');
        const user = JSON.parse(localStorage.getItem('user'));
        const login = user?.githubUsername;
        if (!token || !login) {
            alert('No token or login found in localStorage');
            return;
        }
        
        await axios.post('http://localhost:8080/portfolio', {
            repo: selectedRepo,
            title: projectTitle,
            description,
            login,
        }, {
            headers: { Authorization: `Bearer ${token}` },
        });
    alert('Portfolio created successfully!');
    selectedRepo('');
    setProjectTitle('');
    setDescription('');
    setLanguage('');
    } catch (err) {
    console.error('Error creating portfolio:', err);
    alert('Failed to create portfolio, please try again.');
    }
};
if (loading) {
    return <p>Loading...</p>;
    }

    if (error) {
    return <p>{error}</p>;
    }

return (
    <form onSubmit={handleSubmit} className="create-portfolio-form">
    <label htmlFor="repo">Select Repository:</label>
    <select 
        id="repo"
        value={selectedRepo} 
        onChange={handleRepoChange}
        required 
    >
        <option value="" disabled>Select a repository</option>
        {repos.map((repo) => (
            <option key={repo.id} value={repo.name}>
            {repo.name}
            </option>
        ))}
    </select>
    <input 
        type="text" 
        placeholder="Project Title" 
        value={projectTitle} 
        onChange={(e) => setProjectTitle(e.target.value)} 
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
        placeholder="Languages"
        value={language}
        readOnly
    />
    <button type="submit">Create Portfolio</button>
    </form>
);
}

export default CreatePortfolioForm;
