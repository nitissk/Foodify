import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

// Order item type
export interface OrderItem {
  id: Key | null | undefined;
  name: string;
  quantity: number;
  price: number;
  specialInstructions?: string;
}

// Keep this type as it's the one you're actively using for incoming orders
export type Order = {
  customerPhone: ReactNode;
  orderTime: string | number | Date;
  paymentMethod: ReactNode;
  customerName: string;
  totalAmount: number;
  id: Key | null | undefined;
  _id: string; // This is the ID you're using in your notification component
  userId: string;
  restaurantId: string;
  items: OrderItem[];
  itemTotal: number;
  tax: number;
  platformFee: number;
  deliveryCharges: number;
  discount: number;
  subtotal: number;
  total: number;
  distanceInKm: number;
  couponCode: string | null;
  couponId: string | null;
  status: // Add status to this Order type as well, as you're updating it
    | "pending"
    | "accepted"
    | "preparing"
    | "ready"
    | "delivered"
    | "rejected";
};

// State shape
interface OrderState {
  orders: any;
  activeOrders: Order[];
  orderHistory: Order[];
  notifications: Order[];
  isLoading: boolean;
}

// Initial state
const initialState: OrderState = {
  activeOrders: [
    // IMPORTANT: You need to update these initial orders to match the new 'Order' type (_id instead of id)
    // For demonstration, I'm adapting them. In a real app, these would come from an API.
    {
      _id: "ORD001", // Changed from 'id' to '_id'
      userId: "user123", // Added userId as per new type
      restaurantId: "rest456", // Added restaurantId
      items: [
        { name: "Butter Chicken", quantity: 2, price: 349 },
        { name: "Dal Makhani", quantity: 1, price: 249 },
      ],
      itemTotal: 947, // Assuming this is calculated
      tax: 50,
      platformFee: 10,
      deliveryCharges: 30,
      discount: 0,
      subtotal: 896,
      total: 947,
      distanceInKm: 5,
      couponCode: null,
      couponId: null,
      status: "pending", // Added status
    },
    {
      _id: "ORD002", // Changed from 'id' to '_id'
      userId: "user124",
      restaurantId: "rest456",
      items: [{ name: "Paneer Tikka", quantity: 1, price: 299 }],
      itemTotal: 299,
      tax: 20,
      platformFee: 5,
      deliveryCharges: 20,
      discount: 0,
      subtotal: 299,
      total: 344,
      distanceInKm: 2,
      couponCode: null,
      couponId: null,
      status: "preparing", // Added status
    },
  ],
  orderHistory: [
    {
      _id: "ORD003", // Changed from 'id' to '_id'
      userId: "user125",
      restaurantId: "rest456",
      items: [{ name: "Gulab Jamun", quantity: 1, price: 99 }],
      itemTotal: 99,
      tax: 10,
      platformFee: 2,
      deliveryCharges: 15,
      discount: 0,
      subtotal: 99,
      total: 126,
      distanceInKm: 1,
      couponCode: null,
      couponId: null,
      status: "delivered", // Added status
    },
  ],
  notifications: [],
  isLoading: false,
};

// Create slice
const orderSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    addOrder: (state, action: PayloadAction<Order>) => {
      // Ensure the order has an _id before pushing
      if (action.payload._id) {
        state.activeOrders.push(action.payload);
        state.notifications.push(action.payload);
      } else {
        console.warn("Attempted to add an order without an _id:", action.payload);
      }
    },
    updateOrderStatus: (
      state,
      action: PayloadAction<{ id: string; status: Order["status"] }> // This 'id' refers to the _id
    ) => {
      // Find by _id, not id
      const order = state.activeOrders.find(
        (order) => order._id === action.payload.id // Changed from order.id to order._id
      );
      if (order) {
        // @ts-ignore - attach status dynamically if needed
        order.status = action.payload.status;

        // Move to history if final state
        if (
          action.payload.status === "delivered" ||
          action.payload.status === "rejected"
        ) {
          state.orderHistory.unshift(order);
          state.activeOrders = state.activeOrders.filter(
            (o) => o._id !== action.payload.id // Changed from o.id to o._id
          );
          // Also clear from notifications if it's rejected/delivered
          state.notifications = state.notifications.filter(
            (n) => n._id !== action.payload.id
          );
        }
      }
    },
    clearNotification: (state, action: PayloadAction<string>) => {
      state.notifications = state.notifications.filter(
        (order) => order._id !== action.payload // <-- FIXED: Changed from order.id to order._id
      );
    },
    clearAllNotifications: (state) => {
      state.notifications = [];
    },
  },
});

export const {
  addOrder,
  updateOrderStatus,
  clearNotification,
  clearAllNotifications,
} = orderSlice.actions;

export default orderSlice.reducer;