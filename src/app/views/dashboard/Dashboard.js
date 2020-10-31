import './Dashboard.css';
import {
  BrowserRouter as Router,
  Switch,
  // Route,
  Link,
  Route,
} from 'react-router-dom';

function Waivers() {
  return (
    <div>
      <div className="waiver-row">waiver #1</div>
      <div className="waiver-row">waiver #2</div>
      <div className="waiver-row">waiver #3</div>
      <div className="waiver-row">waiver #4</div>
      <div className="waiver-row">waiver #5</div>
      <div className="waiver-row">waiver #1</div>
      <div className="waiver-row">waiver #2</div>
      <div className="waiver-row">waiver #3</div>
      <div className="waiver-row">waiver #4</div>
      <div className="waiver-row">waiver #5</div>
      <div className="waiver-row">waiver #1</div>
      <div className="waiver-row">waiver #2</div>
      <div className="waiver-row">waiver #3</div>
      <div className="waiver-row">waiver #4</div>
      <div className="waiver-row">waiver #5</div>
      <div className="waiver-row">waiver #1</div>
      <div className="waiver-row">waiver #2</div>
      <div className="waiver-row">waiver #3</div>
      <div className="waiver-row">waiver #4</div>
      <div className="waiver-row">waiver #5</div>
      <div className="waiver-row">waiver #1</div>
      <div className="waiver-row">waiver #2</div>
      <div className="waiver-row">waiver #3</div>
      <div className="waiver-row">waiver #4</div>
      <div className="waiver-row">waiver #5</div>
      <div className="waiver-row">waiver #1</div>
      <div className="waiver-row">waiver #2</div>
      <div className="waiver-row">waiver #3</div>
      <div className="waiver-row">waiver #4</div>
      <div className="waiver-row">waiver #5</div>
    </div>
  );
}

function Dashboard() {
  const routes = [
    {
      name: 'Waivers',
      route: '/waivers',
      component: Waivers,
    },
    {
      name: 'Volunteers',
      route: '/volunteers',
      component: () => <p>volunteers</p>,
    },
    {
      name: 'Forms',
      route: '/forms',
      component: () => <p>forms</p>,
    },
  ];

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <div><h1>Dashboard</h1></div>
      </div>
      <div className="dashboard-container">
        <Router>
          <div className="dashboard-sidebar">
            {routes.map((route) => (
              <Link to={route.route}><div className="sidebar-link">{route.name}</div></Link>
            ))}
          </div>
          <div className="dashboard-content">
            <Switch>
              {routes.map((route) => (
                <Route
                  path={route.route}
                >
                  <route.component />
                </Route>
              ))}
            </Switch>
          </div>
        </Router>
      </div>
    </div>
  );
}

export default Dashboard;
