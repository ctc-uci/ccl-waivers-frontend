import './App.css';
import {
  BrowserRouter as Router, Route, Switch,
} from 'react-router-dom';
import Admin from './app/views/admin/Admin';
import WaiverTemplates from './app/views/dashboard/WaiverTemplates';
import Layout from './app/components/Layout';

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
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
