import React from 'react';

const GitHubAuth = () => {
const handleGithubLogin = () => {
    console.log("GitHub Login Clicked!");
    window.location.href = 'http://localhost:8080/oauth/github';
};

return (
    <button type="button" onClick={handleGithubLogin}>
    Login with GitHub
    </button>
);
};

export default GitHubAuth;
