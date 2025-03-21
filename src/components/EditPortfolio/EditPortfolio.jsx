import { useState, useEffect } from 'react';
import axios from 'axios';

function EditPortfolio() {
const [portfolio, setPortfolio] = useState(null);
const [editedName, setEditedName] = useState('');

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
        setEditedName(response.data.portfolioData.name);
    } catch (err) {
        console.error('Error fetching portfolio:', err);
    }
    };

    fetchPortfolio();
}, []);

const handleSave = async () => {
    try {
      const userId = 1; // Placeholder user ID
    await axios.post('http://localhost:8080/api/portfolio', {
        userId,
        portfolioData: { ...portfolio, name: editedName }
    });
    alert('Portfolio updated successfully!');
    } catch (err) {
    console.error('Error updating portfolio:', err);
    }
};

return portfolio ? (
    <div>
    <h2>Edit Portfolio</h2>
    <input 
        type="text" 
        value={editedName} 
        onChange={(e) => setEditedName(e.target.value)} 
    />
    <button onClick={handleSave}>Save Changes</button>
    </div>
    ) : (
    <p>Loading...</p>
);
}

export default EditPortfolio;


