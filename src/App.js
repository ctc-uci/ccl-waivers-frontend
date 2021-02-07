import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import waiverDisplay from './app/components/waiverSigning/waiverdisplay/WaiverDisplay';
import Admin from './app/views/adminDashboard/Admin';
import WaiverTemplates from './app/views/templates/WaiverTemplates';
import ProtectedRoute from './app/components/routes/ProtectedRoute';
import Layout from './app/components/layout/Layout';

function App() {
  return (
    <div className="App">
      <Router>
        <Layout />
        <div className="content">
          <Switch>
            <Route path="/waiverdisplay" exact component={waiverDisplay} />
            <ProtectedRoute exact path="/" component={Admin} />
            <WaiverTemplates exact path="/templates" />
          </Switch>
        </div>
      </Router>
    </div>
  );
}

export default App;
