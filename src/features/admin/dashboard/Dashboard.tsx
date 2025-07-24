
const Dashboard = () => {
    return (
      <div>
        <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
  
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-4 rounded-lg shadow">
            <h3 className="text-xl font-semibold">Total Orders</h3>
            <p className="text-2xl mt-2 text-red-500">120</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow">
            <h3 className="text-xl font-semibold">Revenue</h3>
            <p className="text-2xl mt-2 text-green-500">$4,200</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow">
            <h3 className="text-xl font-semibold">Active Users</h3>
            <p className="text-2xl mt-2 text-blue-500">89</p>
          </div>
        </div>
      </div>
    );
  };
  
  export default Dashboard;
  