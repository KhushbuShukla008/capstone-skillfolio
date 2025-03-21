import React, { useState } from 'react';
import axios from 'axios';
import jsPDF from 'jspdf';


const Resume = () => {
const [resumeData, setResumeData] = useState({
    name: '',
    contact: '',
    skills: '',
    experience: '',
});

const handleChange = (e) => {
    setResumeData({ ...resumeData, [e.target.name]: e.target.value });
};

const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    try {
    const response = await axios.post('/api/resume', resumeData, {
        headers: { Authorization: `Bearer ${token}` },
    });
    console.log(response.data);
    generatePDF(response.data.resumeUrl);
    } catch (error) {
    console.error(error);
    }
};

const generatePDF = (resumeUrl) => {
    const doc = new jsPDF();
    doc.text('Resume', 10, 10);
    doc.save('resume.pdf');
};

return (
    <div>
    <h2>Generate Resume</h2>
    {/* <img src={resumeImage} alt="Resume Page" /> */}
    <form onSubmit={handleSubmit}>
        <input type="text" name="name" placeholder="Name" onChange={handleChange} required />
        <input type="text" name="contact" placeholder="Contact" onChange={handleChange} required />
        <input type="text" name="skills" placeholder="Skills" onChange={handleChange} required />
        <input type="text" name="experience" placeholder="Experience" onChange={handleChange} required />
        <button type="submit">Generate Resume</button>
    </form>
    </div>
);
};

export default Resume;