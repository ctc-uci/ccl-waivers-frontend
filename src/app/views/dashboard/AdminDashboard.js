import './AdminDashboard.css';
import {
  BrowserRouter as Router,
  Switch,
  // Route,
  Link,
  Route,
} from 'react-router-dom';
import waivers from './waivers';

function Waivers() {
  const waiverItems = waivers.info.map((waiver) => (
    <>
      <div className="waiver-item">
        <p>{waiver.waiver}</p>
        <p>{waiver.name}</p>
        <p>{waiver.date}</p>
        <button type="button">
          <img src="https://image.flaticon.com/icons/png/512/60/60721.png" alt="download button" width="15" />
        </button>
        <button type="button">
          <img src="https://cdn.onlinewebfonts.com/svg/img_416864.png" alt="delete button" width="15" />
        </button>
      </div>
    </>
  ));
  return (
    <div className="waiver-list">
      <div className="table-operations">
        <button type="button">
          Sort
        </button>
        <button type="button">
          Filter
        </button>
        <div style={{ display: 'inline-block', float: 'right' }}>
          <input type="search" />
          <button type="button">
            Search
          </button>
        </div>
      </div>
      {waiverItems}
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
