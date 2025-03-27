import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ResumeDisplay from '../../components/ResumeDisplay/ResumeDisplay';
import './Resume.scss';
const ResumePage = () => {
    const [resumeData, setResumeData] = useState(null);
    const [selectedTemplate, setSelectedTemplate] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'));
        console.log('User from localStorage:', user);

        if (!user || !user.id) {
            setError("No valid user found. Please log in.");
        }
    }, []);

    const handleTemplateSelect = async (templateType) => {
        setIsLoading(true);
        setSelectedTemplate(templateType);
        setError(null);
        const user = JSON.parse(localStorage.getItem('user'));

        if (!user || !user.id) {
            setError("No valid user found. Please log in.");
            setIsLoading(false);
            return;
        }

        try {
        const projectsResponse = await axios.get(`http://localhost:8080/portfolio/${user.id}`);
        const userProjects = projectsResponse.data;

        console.log("Fetched Projects for Resume:", userProjects);

        if (!userProjects || userProjects.length === 0) {
            setError("No projects found for this user.");
            setIsLoading(false);
            return;
        }
        console.log('Sending request with:', {
            userId: user.id,
            templateType: templateType,
            userProjects: userProjects
        });

        const response = await axios.post('http://localhost:8080/resume/generate', {
                userId: user.id,
                templateType: templateType,
                userProjects: userProjects
            });
            
            console.log('Generated Resume Data:', response.data);
            setResumeData(response.data.resumeData);
        } catch (error) {
            console.error('Error generating resume:', error);
            setError("Failed to generate resume. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className='portfolio-container'>
            <h1 className='portfolio-container__title'>Generate Portfolio</h1>

            {error && <p style={{ color: 'red' }}>{error}</p>}

            <div>
                <button className='portfolio-container__button' onClick={() => handleTemplateSelect('github')}>GitHub Template</button>
                <button className='portfolio-container__button' onClick={() => handleTemplateSelect('standard')}>Standard Template</button>
            </div>

            {isLoading ? (
                <p>Loading...</p>
            ) : (
                resumeData && (
                    <div>
                        <h2 className='portfolio-container__portfolio'>Your Portfolio</h2>
                        <ResumeDisplay resumeData={resumeData} />
                        {/* <button className='portfolio-container__button' onClick={handleDownloadPDF}>Download PDF</button> */}
                    </div>
                )
            )}
        </div>
    );
};

export default ResumePage;
