import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Admin from './app/views/adminDashboard/Admin';
import WaiverTemplates from './app/views/templates/WaiverTemplates';
import ProtectedRoute from './app/components/routes/ProtectedRoute';
import Layout from './app/components/layout/Layout';
import WaiverDisplay from './app/components/waiverSigning/waiverdisplay/WaiverDisplay';

function App() {
  const waiverDisplayTitle = () => (
    <div className="waiver-screen-title">
      <h6 className="waiver-screen-text">Waiver Page</h6>
    </div>
  );

  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/" component={Layout} />
          <Route exact path="/templates" component={Layout} />
          <Route path="/:id" component={waiverDisplayTitle} />
        </Switch>
        <div className="content">
          <Switch>
            <ProtectedRoute exact path="/" component={Admin} />
            <WaiverTemplates exact path="/templates" />
            <Route path="/:id" component={WaiverDisplay} />
          </Switch>
        </div>
      </Router>
    </div>
  );
}

export default App;
