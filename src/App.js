import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Admin from './Admin';
import Waiver from './Waiver';

function App() {
  return (
    <div className="App">
      <Router>
        <Route path="/" component={Waiver} />
        <Route path="/admin" component={Admin} />
      </Router>
    </div>
  );
}

export default App;
