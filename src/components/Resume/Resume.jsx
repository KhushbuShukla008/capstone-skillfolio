import { useState } from 'react';
import axios from 'axios';
import jsPDF from 'jspdf';

function Resume() {
const [name, setName] = useState('');
const [email, setEmail] = useState('');
const [skills, setSkills] = useState('');
const [experience, setExperience] = useState('');
const [education, setEducation] = useState('');

const handleGeneratePDF = () => {
    const doc = new jsPDF();
    doc.text('Resume', 20, 20);
    doc.text(`Name: ${name}`, 20, 40);
    doc.text(`Email: ${email}`, 20, 60);
    doc.text(`Skills: ${skills}`, 20, 80);
    doc.text(`Experience: ${experience}`, 20, 100);
    doc.text(`Education: ${education}`, 20, 120);
    doc.save(`${name}_Resume.pdf`);
};

const handleSaveResume = async () => {
    try {
    const user = JSON.parse(localStorage.getItem('user'));
    const userId = user?.id;

    if (!userId) {
        alert('User not logged in!');
        return;
    }

    await axios.post('http://localhost:8080/api/resume', {
        userId,
        resumeData: {
        name,
        email,
        skills: skills.split(','),
        experience,
        education,
        },
    });

    alert('Portfolio data saved successfully!');
    } catch (err) {
    console.error('Error saving resume:', err);
    }
};

return (
    <div>
    <h2>Portfolio Generator</h2>
    <input
        type="text"
        placeholder="Your Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
    />
    <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
    />
    <input
        type="text"
        placeholder="Skills (comma-separated)"
        value={skills}
        onChange={(e) => setSkills(e.target.value)}
        required
    />
    <textarea
        placeholder="Experience"
        value={experience}
        onChange={(e) => setExperience(e.target.value)}
        required
    />
    <textarea
        placeholder="Education"
        value={education}
        onChange={(e) => setEducation(e.target.value)}
        required
    />
    <button onClick={handleGeneratePDF}>Generate PDF</button>
    <button onClick={handleSaveResume}>Save Portfolio</button>
    </div>
);
}

export default Resume;
