import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import * as authApi from "../../api/authApi/authApi";

import { User, Auth, signupState } from "../../type";

export interface AuthState {
  currentUser: User | null;
  loading: boolean;
  error: string | undefined;
  isError: boolean;
}

const initialState: AuthState = {
  currentUser: null,
  loading: false,
  error: undefined,
  isError: false,
};

export const login = createAsyncThunk<User, Auth>(
  "auth/login",
  async (params: Auth) => {
    const res = await authApi.loginPass({
      username: params.username,
      password: params.password,
    });
    return res;
  }
);
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const logoutThunk = createAsyncThunk<any>(
  "auth/logout",
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async () => {
    const res = await authApi.logout();
    return res;
  }
);
export const signup = createAsyncThunk(
  "auth/signup",
  async (params: signupState) => {
    const res = await authApi.signup({
      username: params.username,
      password: params.password,
      email: params.email,
      full_name: params.full_name,
    });
    return res;
  }
);
export const test = createAsyncThunk("auth/test", async () => {
  const res = await authApi.test();
  return res;
});
export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    refetchTokenStore: (state, action: PayloadAction<User>) => {
      state.currentUser = action.payload;
    },
    resetStoreAuth: (state) => {
      state.currentUser = null;
      state.loading = false;
      state.error = undefined;
    },
    updateInformation: (state, action: PayloadAction<User>) => {
      state.currentUser = action.payload;
    },
  },
  extraReducers: (builder) => {
    // login password
    builder.addCase(login.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(login.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
      state.isError = true;
    });

    builder.addCase(login.fulfilled, (state, action) => {
      state.loading = false;
      state.isError = false;
      state.error = undefined;
      state.currentUser = action.payload;
    });

    builder.addCase(logoutThunk.fulfilled, (state) => {
      state.loading = false;
      state.currentUser = null;
      state.isError = false;
      state.error = "";
    });
    // test login
    builder.addCase(signup.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(signup.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
      state.isError = true;
    });

    builder.addCase(signup.fulfilled, (state) => {
      state.loading = false;
    });
  },
});

export const { refetchTokenStore, resetStoreAuth, updateInformation } =
  authSlice.actions;

export default authSlice.reducer;
