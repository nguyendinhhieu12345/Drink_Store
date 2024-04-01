import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as cartApi from "@/api/cartApi/cartApi"

export interface Cart {
    cart_id?: string;
    product_id?: string;
    price: number;
    title: string;
    image: string;
}

export interface CartState {
    cartCurrent: Cart[] | null;
    loading: boolean | null;
    error: boolean | null;
}

interface AddCart {
    product_id: string;
}

const initialState: CartState = {
    cartCurrent: null,
    loading: false,
    error: false,
};

export const getCarts = createAsyncThunk<Cart[], string>(
    "/cart/getcart",
    async (student_id: string) => {
        const res = await cartApi.getCarts(student_id);
        return res;
    }
);

export const addToCart = createAsyncThunk<Cart, AddCart>(
    "/cart/addtocart",
    async (addCart: AddCart) => {
        const res = await cartApi.addToCart(addCart.product_id);
        return res;
    }
);

export const removeToCart = createAsyncThunk<Cart, string>(
    "/cart/removetocart",
    async (cart_id: string) => {
        const res = await cartApi.removeToCart(cart_id);
        return res;
    }
);

export const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        resetStoreCart: (state) => {
            state.cartCurrent = null;
            state.loading = false;
            state.error = false;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(getCarts.pending, (state) => {
            state.loading = true;
        });

        builder.addCase(getCarts.rejected, (state) => {
            state.loading = false;
            state.error = true;
        });

        builder.addCase(getCarts.fulfilled, (state, action) => {
            state.loading = false;
            state.cartCurrent = action.payload;
        });

        builder.addCase(addToCart.pending, (state) => {
            state.loading = true;
        });

        builder.addCase(addToCart.rejected, (state) => {
            state.loading = false;
            state.error = true;
        });

        builder.addCase(addToCart.fulfilled, (state) => {
            state.loading = false;
            // state.cartCurrent?.push(action.payload);
        });

        builder.addCase(removeToCart.pending, (state) => {
            state.loading = true;
        });

        builder.addCase(removeToCart.rejected, (state) => {
            state.loading = false;
            state.error = true;
        });

        builder.addCase(removeToCart.fulfilled, (state) => {
            state.loading = false;
            // state.cartCurrent?.filter(
            //   (data) => data?.cart_id !== action.payload?.cart_id
            // );
        });
    },
});

export const { resetStoreCart } = cartSlice.actions;

export default cartSlice.reducer;
