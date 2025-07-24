import { Clock, User, Phone, MapPin, CreditCard } from 'lucide-react';
import { useAppSelector, useAppDispatch } from '../hooks/useAppSelector';
import { updateOrderStatus } from '../../../store/slices/orderSlice';
import type { Order } from '../../../store/slices/orderSlice';

const Orders = () => {
  const dispatch = useAppDispatch();
  const activeOrders = useAppSelector(state => state.orders.activeOrders);

  const handleStatusUpdate = (orderId: string, status: Order['status']) => {
    dispatch(updateOrderStatus({ id: orderId, status }));
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'accepted': return 'bg-blue-100 text-blue-800';
      case 'preparing': return 'bg-orange-100 text-orange-800';
      case 'ready': return 'bg-green-100 text-green-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getNextStatus = (currentStatus: string) => {
    switch (currentStatus) {
      case 'pending': return 'accepted';
      case 'accepted': return 'preparing';
      case 'preparing': return 'ready';
      case 'ready': return 'delivered';
      default: return null;
    }
  };

  const getActionLabel = (status: string) => {
    switch (status) {
      case 'pending': return 'Accept Order';
      case 'accepted': return 'Start Preparing';
      case 'preparing': return 'Mark Ready';
      case 'ready': return 'Mark Delivered';
      default: return null;
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Active Orders</h1>
        <p className="text-gray-600">Manage your current orders</p>
      </div>

      {activeOrders.length === 0 ? (
        <div className="bg-white shadow rounded-lg p-12 text-center">
          <h3 className="text-lg font-medium text-gray-900 mb-2">No active orders</h3>
          <p className="text-gray-600">New orders will appear here when customers place them.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {activeOrders.map((order) => (
            <div key={order.id} className="bg-white shadow rounded-lg overflow-hidden flex flex-col">
              {/* Header */}
              <div className="flex justify-between items-start px-6 py-4 border-b border-gray-200">
                <div>
                  <h2 className="text-lg font-semibold">Order #{order.id}</h2>
                  <div className="flex items-center text-sm text-gray-600 mt-1">
                    <Clock className="h-4 w-4 mr-1" />
                    {new Date(order.orderTime).toLocaleTimeString()}
                  </div>
                </div>
                <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(order.status)}`}>
                  {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                </span>
              </div>

              {/* Content */}
              <div className="p-6 space-y-6 flex-grow flex flex-col justify-between">
                {/* Customer Info */}
                <div className="space-y-3">
                  <div className="flex items-center space-x-2 text-gray-700">
                    <User className="h-4 w-4 text-gray-400" />
                    <span className="font-medium">{order.customerName}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-gray-700">
                    <Phone className="h-4 w-4 text-gray-400" />
                    <span className="text-sm">{order.customerPhone}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-gray-700">
                    <MapPin className="h-4 w-4 text-gray-400" />
                    <span className="text-sm">{order.deliveryCharges}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-gray-700">
                    <CreditCard className="h-4 w-4 text-gray-400" />
                    <span className="text-sm">{order.paymentMethod}</span>
                  </div>
                </div>

                {/* Items */}
                <div>
                  <h4 className="font-medium mb-2 text-gray-800">Items:</h4>
                  <div className="space-y-2">
                    {order.items.map((item) => (
                      <div key={item.id} className="flex justify-between items-center bg-gray-50 p-2 rounded">
                        <div>
                          <span className="font-medium">{item.name}</span>
                          <span className="text-gray-600 ml-2">x{item.quantity}</span>
                        </div>
                        <span className="font-medium">₹{item.price * item.quantity}</span>
                      </div>
                    ))}
                  </div>
                  <div className="flex justify-between items-center mt-3 pt-3 border-t border-gray-200">
                    <span className="font-semibold text-gray-900">Total Amount:</span>
                    <span className="font-bold text-lg text-green-600">₹{order.totalAmount}</span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-3 pt-4">
                  {order.status === 'pending' ? (
                    <>
                      <button
                        onClick={() => handleStatusUpdate(order.id, 'accepted')}
                        className="flex-1 bg-green-600 hover:bg-green-700 text-white font-semibold py-2 rounded cursor-pointer"
                      >
                        Accept Order
                      </button>
                      <button
                        onClick={() => handleStatusUpdate(order.id, 'rejected')}
                        className="flex-1 border border-red-600 text-red-600 hover:bg-red-50 font-semibold py-2 rounded cursor-pointer"
                      >
                        Reject
                      </button>
                    </>
                  ) : (
                    getNextStatus(order.status) && (
                      <button
                        onClick={() => handleStatusUpdate(order.id, getNextStatus(order.status)!)}
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded cursor-pointer"
                      >
                        {getActionLabel(order.status)}
                      </button>
                    )
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Orders;
