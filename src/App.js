import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Waiver from './Waiver';

function App() {
  return (
    <div className="App">
      <Router>
        <Route path="/" component={Waiver} />
      </Router>
    </div>
  );
}

export default App;
