import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Admin from './app/views/adminDashboard/Admin';
import WaiverTemplates from './app/views/templates/WaiverTemplates';
import ProtectedRoute from './app/components/routes/ProtectedRoute';
import Layout from './app/components/layout/Layout';
import Logout from './app/components/adminDashboard/logout/Logout';
import WaiverDisplay from './app/components/waiverSigning/waiverdisplay/WaiverDisplay';
import WaiverSuccess from './app/components/waiverSigning/waiversuccess/WaiverSuccess';

function App() {
  const waiverDisplayTitle = () => (
    <div className="waiver-screen-title">
      <h6 className="waiver-screen-text">Fill out this form</h6>
    </div>
  );

  const empty = () => <div />;

  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/" component={Layout} />
          <Route exact path="/waiverSuccess" component={empty} />
          <Route exact path="/templates" component={Layout} />
          <Route exact path="/logout" component={empty} />
          <Route path="/:id" component={waiverDisplayTitle} />
        </Switch>
        <div className="content">
          <Switch>
            <ProtectedRoute exact path="/" component={Admin} />
            <WaiverTemplates exact path="/templates" />
            <Route exact path="/waiverSuccess" component={WaiverSuccess} />
            <Route exact path="/logout" component={Logout} />
            <Route path="/:id" component={WaiverDisplay} />
          </Switch>
        </div>
      </Router>
    </div>
  );
}

export default App;
