function stringifySafely(obj) {
    const cache = new Set();
    return JSON.stringify(obj, (key, value) => {
        if (typeof value === 'object' && value !== null) {
            if (cache.has(value)) {
                return;             }
            cache.add(value);
        }
        return value;
    });
}

import React from 'react';
import axios from 'axios';


const ResumeDisplay = ({userId, resumeData }) => {
    const handleDownloadPDF = async () => {
        try {
            const response = await fetch('http://localhost:8080/resume/download', {
                method: 'POST',
                body: JSON.stringify({ resumeData }),
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            if (!response.ok) {
                throw new Error('Failed to download PDF');
            }

            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);

            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'resume.pdf');
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            window.URL.revokeObjectURL(url);
        } catch (err) {
            console.error('Failed to download PDF', err);
        }
    };
    const saveResume = async (userId, resumeData) => {
        try {
            const cleanResumeData = {
                ...resumeData,
                projects: resumeData.projects.map(project => ({
                    title: project.title,
                    description: project.description,
                    tech_stack: project.tech_stack,
                    github_link: project.github_link,
                })) || [],
            };
            const sanitizedData = stringifySafely(cleanResumeData); 
            const response = await axios.post('http://localhost:8080/resume/save', {
                userId,
                resumeData:sanitizedData,
            });
    
            if (response.data.success) {
                alert('Portfolio saved successfully!');
                console.log('Saved Resume:', response.data.savedResume);
            } else {
                alert('Failed to save resume.');
            }
        } catch (error) {
            console.error('Error saving resume:', error);
            alert('An error occurred while saving the resume.');
        }
    };

    return (
        <div>
            {/* <h2>Generated Portfolio</h2> */}
            <p><strong>Summary:</strong> {resumeData.description || 'No description available.'}</p>
            <h3>Projects:</h3>
            {resumeData?.projects?.length > 0 ? (
            <ul>
                {resumeData.projects.map((project, index) => (
                    <li key={index}>
                        <strong>{project.title}</strong><br />
                        Description: {project.description || 'No description provided.'}<br />
                        Tech Stack: {project.tech_stack || 'Not specified.'}<br />
                        GitHub Link: <a href={project.github_link || '#'} target="_blank" rel="noopener noreferrer">View Project</a>
                    </li>
                ))}
            </ul>
            ) : (
                <p>No projects available to display.</p>
            )}
            <button className='portfolio-container__button' onClick={() => saveResume(userId, resumeData)}>Save PDF</button>
            <button className='portfolio-container__button' onClick={handleDownloadPDF}>Download PDF</button>
        </div>
    );
};

export default ResumeDisplay;
