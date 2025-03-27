import React from 'react';

const ResumeDisplay = ({ resumeData }) => {
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
            <button className='portfolio-container__button' onClick={handleDownloadPDF}>Download PDF</button>
        </div>
    );
};

export default ResumeDisplay;
