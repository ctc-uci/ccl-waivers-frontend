import './Dashboard.css';

function Dashboard() {
  return (
    <div style={{ margin: '20px' }}>
      <h1>Dashboard</h1>
      <div>
        <div className="dashboard-sidebar">
          {/* <div>volunteers</div> */}
          <div>waivers</div>
        </div>
        <div className="dashboard-content">
          <div>
            <div>waiver #1</div>
            <div>waiver #2</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
