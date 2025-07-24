// restaurantSlice.ts
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface RestaurantInfoT {
  cuisine(cuisine: any): unknown;
  totalOrders: number;
  rating: ReactNode;
  id: any;
  _id: string;
  name: string;
  description: string;
  address: string;
  phone: string;
  imageKey: string;
  location: {
    type: string;
    coordinates: [number, number];
  };
  isActive: boolean;
  isBlocked: boolean;
  tags: string[];
  managerId: string;
}

interface RestaurantState {
  info: RestaurantInfoT | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: RestaurantState = {
  info: null,
  isLoading: false,
  error: null,
};

const restaurantSlice = createSlice({
  name: "restaurant",
  initialState,
  reducers: {
    setRestaurantInfo: (state, action: PayloadAction<RestaurantInfoT>) => {
      state.info = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
    updateRestaurantInfo: (
      state,
      action: PayloadAction<Partial<RestaurantInfoT>>
    ) => {
      if (state.info) {
        state.info = { ...state.info, ...action.payload };
      }
    },
  },
});

export const { setRestaurantInfo, setLoading, setError, updateRestaurantInfo } =
  restaurantSlice.actions;

export default restaurantSlice.reducer;