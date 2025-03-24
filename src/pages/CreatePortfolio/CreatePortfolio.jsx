import React from "react";
import CreatePortfolioForm from "../../components/CreatePortfolioForm/CreatePortfolioForm";
import './CreatePortfolio.scss';

function CreatePortfolioPage() {
    return (
    <div className="create-portfolio-page">
        <h1>Create Portfolio</h1>
        <CreatePortfolioForm />
    </div>
    );
}

export default CreatePortfolioPage;