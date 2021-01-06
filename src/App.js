import './App.css';
import {
  BrowserRouter as Router, Switch,
} from 'react-router-dom';
import Admin from './app/views/admin/Admin';
import WaiverTemplates from './app/views/dashboard/WaiverTemplates';
import ProtectedRoute from './app/routes/ProtectedRoute';
import Layout from './app/components/Layout';

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <ProtectedRoute exact path="/templates" component={WaiverTemplates} />
          <ProtectedRoute path="/" component={Admin} />
          <Layout>
            <Route exact path="/templates" component={WaiverTemplates} />
            <Route exact path="/" component={Admin} />
          </Layout>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
