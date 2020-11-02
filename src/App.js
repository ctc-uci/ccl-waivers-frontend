import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import AdminDashboard from './app/views/dashboard/AdminDashboard';
import Waiver from './Waiver';

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/" component={Waiver} />
          <Route path="/admin" component={AdminDashboard} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
