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
            email: params.email,
            password: params.password,
            fcmTokenId: params.fcmTokenId
        });
        return res;
    }
);
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const logoutThunk = createAsyncThunk<any, string>(
    "auth/logout",
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    async (fcmTokenId: string) => {
        const res = await authApi.logout(fcmTokenId);
        return res;
    }
);
export const signup = createAsyncThunk(
    "auth/signup",
    async (params: signupState) => {
        const res = await authApi.signupPass({
            email: params.email,
            code: params.code,
            password: params.password,
            firstName: params.firstName,
            lastName: params.lastName,
            fcmTokenId: params?.fcmTokenId
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

        // logout
        builder.addCase(logoutThunk.fulfilled, (state) => {
            state.loading = false;
            state.currentUser = null;
            state.isError = false;
            state.error = "";
        });

        // signup password
        builder.addCase(signup.pending, (state) => {
            state.loading = true;
        });

        builder.addCase(signup.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
            state.isError = true;
        });

        builder.addCase(signup.fulfilled, (state, action) => {
            state.loading = false;
            state.isError = false;
            state.error = undefined;
            state.currentUser = action.payload;
        });
    },
});

export const { refetchTokenStore, resetStoreAuth, updateInformation } =
    authSlice.actions;

export default authSlice.reducer;
