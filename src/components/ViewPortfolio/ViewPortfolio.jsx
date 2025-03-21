import { useEffect, useState } from 'react';
import axios from 'axios';

function ViewPortfolio() {
const [portfolio, setPortfolio] = useState(null);

useEffect(() => {
    const fetchPortfolio = async () => {
    try {
        const user = JSON.parse(localStorage.getItem('user'));
        const userId = user?.id;

        if (!userId) {
        alert("User not logged in!");
        return;
        }

        const response = await axios.get(`http://localhost:8080/api/portfolio/${userId}`);
        setPortfolio(response.data.portfolioData);
    } catch (err) {
        console.error('Error fetching portfolio:', err);
    }
    };

    fetchPortfolio();
}, []);

return (
    <div>
    <h2>View Portfolio</h2>
    {portfolio ? (
        <div>
        <p><strong>Name:</strong> {portfolio.name}</p>
        {portfolio.projects.map((project, idx) => (
            <div key={idx}>
            <h3>{project.projectName}</h3>
            <p>{project.description}</p>
            <p><strong>Tech Stack:</strong> {project.techStack.join(', ')}</p>
            <a href={project.url} target="_blank" rel="noreferrer">GitHub Link</a>
            </div>
        ))}
    </div>
    ) : (
        <p>Loading...</p>
    )}
    </div>
);
}

export default ViewPortfolio;
