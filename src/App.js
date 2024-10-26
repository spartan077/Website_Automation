import React, { useState } from 'react';
import SiteManager from './SiteManager';
import ArticleManager from './ArticleManager';
import AdManager from './AdManager';
import AffiliateLinksManager from './AffiliateLinksManager';

import './App.css';

function App() {
  const [activeComponent, setActiveComponent] = useState('sites');

  const renderComponent = () => {
    switch (activeComponent) {
      case 'sites':
        return <SiteManager />;
      case 'articles':
        return <ArticleManager />;
      case 'ads':
        return <AdManager />;
      case 'affiliate-links':
        return <AffiliateLinksManager />;
      default:
        return <SiteManager />;
    }
  };

  return (
    <div>
      <h1>Dashboard</h1>
      <nav>
        <button onClick={() => setActiveComponent('sites')}>Manage Sites</button>
        <button onClick={() => setActiveComponent('articles')}>Manage Articles</button>
        <button onClick={() => setActiveComponent('ads')}>Manage Ads</button>
        <button onClick={() => setActiveComponent('affiliate-links')}>Manage Affiliate Links</button>
      </nav>
      <div>
        {renderComponent()}
      </div>
    </div>
  );
}

export default App;
