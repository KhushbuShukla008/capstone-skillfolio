
import { useState } from 'react';
import CreatePortfolio from '../../components/CreatePortfolio/CreatePortfolio';
import EditPortfolio from '../../components/EditPortfolio/EditPortfolio';
import ViewPortfolio from '../../components/ViewPortfolio/ViewPortfolio';

function Portfolio() {
  const [view, setView] = useState('view'); // Default to viewing the portfolio

return (
    <div className="portfolio">
    <h1>Portfolio</h1>
    <nav>
        <button onClick={() => setView('create')}>Create Portfolio</button>
        <button onClick={() => setView('view')}>View Portfolio</button>
        <button onClick={() => setView('edit')}>Edit Portfolio</button>
    </nav>

    {view === 'create' && <CreatePortfolio />}
    {view === 'view' && <ViewPortfolio />}
    {view === 'edit' && <EditPortfolio />}
    </div>
);
}

export default Portfolio;
