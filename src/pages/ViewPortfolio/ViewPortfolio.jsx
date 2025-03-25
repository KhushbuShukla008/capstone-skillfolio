import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Portfolio from '../../components/Portfolio/Portfolio';
import './ViewPortfolio.scss';

function ViewPortfolio() {
const [portfolioData, setPortfolioData] = useState(null);
const [loading, setLoading] = useState(true);
const [error, setError] = useState(null);

    useEffect(() => {
    const fetchPortfolioData = async () => {
    setLoading(true);
    setError(null);
    const user = JSON.parse(localStorage.getItem('user'));
    console.log('User from localStorage:', user);
    if (!user?.id) {
        setError("No valid user found. Please log in.");
        setLoading(false);
        return;
    }
    
    try {
        const response = await axios.get(`http://localhost:8080/portfolio/${user.id}`);
        console.log('Fetched Portfolio Data:', response.data);

        if (response.data && !Array.isArray(response.data)) {
            setPortfolioData([response.data]);
        } else {
        setPortfolioData([]);
        }
    } catch (error) {
        console.error(error);
        setError("Failed to fetch portfolio data.");
    } finally {
        setLoading(false);
    }
    };

    fetchPortfolioData();
}, []);
if (loading) {
    return <p>Loading...</p>;
}
if (error) {
    return <p>{error}</p>;
}

if (!portfolioData || portfolioData.length === 0) {
    return ( 
    <p className='view-data'>No portfolio data available yet. Please{' '}
    <Link to="/createportfolio">add some projects!</Link>
    </p> 
    );
}

return(
    <div>
        <Portfolio portfolioData = { portfolioData } />
    </div>
)
};

export default ViewPortfolio;