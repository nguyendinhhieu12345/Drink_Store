import { AuthState } from "@/features/auth/authSlice";

export interface SliceState {
  authSlice: AuthState;
}

export interface IUser {
  username: string;
  full_name: string;
  email: string;
  avatar: string;
  phone: string;
  role: string;
  birthday: string;
  address: string;
  created_at?: string;
  updated_at?: string;
}

export interface ICategory {
  id: string;
  name: string;
  imageUrl: string;
  status: string;
}

export interface IProduct {
  id: string;
  name: string;
  thumbnailUrl: string;
  status: string;
  price: number;
}

export interface IBranch {
  id: string;
  province: string;
  district: string;
  ward: string;
  detail: string;
  longitude: number;
  latitude: number;
  phoneNumber: number;
  createdAt: string;
  updatedAt: string;
  orderBillList?: [];
  employeeList?: [];
  fullAddress: string;
}
