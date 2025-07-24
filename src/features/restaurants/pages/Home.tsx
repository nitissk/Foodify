import { useState, useEffect } from "react";
import { TrendingUp, Clock, Star } from "lucide-react";
import { useAppSelector } from "../hooks/useAppSelector";
import { BiRupee } from "react-icons/bi";
import { websocketService } from "../../../services/websocket";

const Home = () => {
  const restaurantInfo = useAppSelector((state) => state.restaurant.info);
  const activeOrders = useAppSelector((state) => state.orders.activeOrders);
  const orderHistory = useAppSelector((state) => state.orders.orderHistory);
  const menuItems = useAppSelector((state) => state.menu.items);
  const [isConnected, setIsConnected] = useState<boolean>(false);

  if (!restaurantInfo) {
    return (
      <div className="p-6">
        <p className="text-center text-gray-500">Loading restaurant info...</p>
      </div>
    );
  }

  useEffect(() => {
    if (!restaurantInfo.id) {
      console.warn("Restaurant ID is not available. Cannot establish WebSocket connection.");
      if (isConnected) {
        setIsConnected(false);
      }
      return;
    }

    if (isConnected) {
      console.log("Attempting to connect WebSocket from Home component...");
      websocketService.connect(restaurantInfo.id);
    } else {
      console.log("Attempting to disconnect WebSocket from Home component...");
      websocketService.disconnect();
    }

    return () => {
      websocketService.disconnect();
    };
  }, [isConnected, restaurantInfo.id]);

  const todayRevenue = activeOrders.reduce(
    (sum, order) => sum + (order.totalAmount ?? order.total ?? 0),
    0
  );
  const averageOrderValue =
    activeOrders.length > 0 ? todayRevenue / activeOrders.length : 0;
  const availableItems = menuItems.filter((item) => item.isAvailable).length;

  return (
    <div className="p-6 space-y-6">
      <section className="bg-gradient-to-r from-red-500 to-orange-500 rounded-lg p-6 text-white relative">
        <h1 className="text-3xl font-bold mb-2">Welcome back!</h1>
        <p className="text-red-100">
          Here's what's happening at {restaurantInfo.name} today
        </p>
        <div className="absolute top-4 right-4 flex items-center rounded-full p-1">
          <span className="text-sm font-medium mr-2">WebSocket:</span>
          <label htmlFor="websocket-toggle" className="flex items-center cursor-pointer">
            <div className="relative">
              <input
                type="checkbox"
                id="websocket-toggle"
                className="sr-only"
                checked={isConnected}
                onChange={() => setIsConnected(!isConnected)}
              />
              <div
                className={`block w-14 h-8 rounded-full transition-colors ${
                  isConnected ? "bg-green-500" : "bg-gray-600"
                }`}
              ></div>
              <div
                className={`dot absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition-transform ${
                  isConnected
                    ? "translate-x-full border-green-500"
                    : "border-gray-600"
                }`}
              ></div>
            </div>
            <div className="ml-3 text-sm font-medium text-white">
              {isConnected ? "ON" : "OFF"}
            </div>
          </label>
        </div>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow p-4">
          <div className="flex items-center justify-between pb-2 border-b border-gray-200">
            <h3 className="text-sm font-medium text-gray-700">Active Orders</h3>
            <Clock className="h-5 w-5 text-gray-400" />
          </div>
          <div className="mt-4">
            <p className="text-2xl font-bold text-gray-900">
              {activeOrders.length}
            </p>
            <p className="text-xs text-gray-500">
              {orderHistory.length} completed today
            </p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-4">
          <div className="flex items-center justify-between pb-2 border-b border-gray-200">
            <h3 className="text-sm font-medium text-gray-700">Today's Revenue</h3>
            <BiRupee className="h-5 w-5 text-gray-400" />
          </div>
          <div className="mt-4">
            <p className="text-2xl font-bold text-gray-900">
              ₹{todayRevenue.toFixed(2)}
            </p>
            <p className="text-xs text-gray-500">+12% from yesterday</p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-4">
          <div className="flex items-center justify-between pb-2 border-b border-gray-200">
            <h3 className="text-sm font-medium text-gray-700">Average Order</h3>
            <TrendingUp className="h-5 w-5 text-gray-400" />
          </div>
          <div className="mt-4">
            <p className="text-2xl font-bold text-gray-900">
              ₹{Math.round(averageOrderValue)}
            </p>
            <p className="text-xs text-gray-500">
              Based on {activeOrders.length} orders
            </p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-4">
          <div className="flex items-center justify-between pb-2 border-b border-gray-200">
            <h3 className="text-sm font-medium text-gray-700">Rating</h3>
            <Star className="h-5 w-5 text-gray-400" />
          </div>
          <div className="mt-4">
            <p className="text-2xl font-bold text-gray-900">
              {restaurantInfo.rating}
            </p>
            <p className="text-xs text-gray-500">
              {availableItems} items available
            </p>
          </div>
        </div>
      </section>

      <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow p-4">
          <header className="pb-3 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">Recent Orders</h3>
          </header>
          <div className="mt-4 space-y-4">
            {activeOrders.slice(0, 3).map((order) => (
              <div
                key={order._id || order.id}
                className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
              >
                <div>
                  <p className="font-medium text-gray-900">
                    {order.customerName || order.userId}
                  </p>
                  <p className="text-sm text-gray-600">#{order._id || order.id}</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-gray-900">
                    ₹{(order.total ?? order.totalAmount ?? 0).toFixed(2)}
                  </p>
                  <span
                    className={`text-xs px-2 py-1 rounded-full ${
                      order.status === "pending"
                        ? "bg-yellow-100 text-yellow-800"
                        : order.status === "preparing"
                        ? "bg-blue-100 text-blue-800"
                        : "bg-green-100 text-green-800"
                    }`}
                  >
                    {order.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-4">
          <header className="pb-3 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">Restaurant Overview</h3>
          </header>
          <div className="mt-4 space-y-4 text-sm text-gray-700">
            <div>
              <h4 className="font-semibold">{restaurantInfo.name}</h4>
              <p className="text-gray-600">
                {restaurantInfo.description || "No description available"}
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <span className="text-gray-600">Cuisine:</span>
                {/* <p className="font-medium">
                  {Array.isArray(restaurantInfo.cuisine)
                    ? restaurantInfo.cuisine.join(", ")
                    : "N/A"}
                </p> */}
              </div>
              <div>
                <span className="text-gray-600">Total Orders:</span>
                <p className="font-medium">{restaurantInfo.totalOrders ?? 0}</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
