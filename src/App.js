import './App.css';
import {
  BrowserRouter as Router, Route, Switch,
} from 'react-router-dom';
import Admin from './app/views/admin/Admin';
import WaiverTemplates from './app/views/dashboard/WaiverTemplates';

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/templates" component={WaiverTemplates} />
          <Route path="/" component={Admin} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
