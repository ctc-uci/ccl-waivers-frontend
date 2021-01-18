import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import WaiverSuccess from './WaiverSuccess';
import waiverDisplay from './WaiverDisplay';
import Admin from './app/views/admin/Admin';
import WaiverTemplates from './app/views/dashboard/WaiverTemplates';
import ProtectedRoute from './app/routes/ProtectedRoute';
import Layout from './app/components/Layout';

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/Waiverdisplay" exact component={waiverDisplay} />
          <Route path="/Waiversuccess" exact component={WaiverSuccess} />
          <Layout>
            <ProtectedRoute exact path="/" component={Admin} />
            <WaiverTemplates path="/templates" />
          </Layout>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
