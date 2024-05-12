import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

export interface Cart {
    productId: string;
    itemDetailList: IItemDetailList[],
    name?: string,
    imageUrl?: string
}

export interface IItemDetailList {
    quantity: number;
    toppingNameList?: string[];
    size?: string;
    note?: string;
    price?: number
}

export interface CartState {
    cartCurrent: Cart[] | null;
    loading: boolean | null;
    error: boolean | null;
}

const initialState: CartState = {
    cartCurrent: null,
    loading: false,
    error: false,
};

export const addToCart = createAsyncThunk<Cart, Cart>(
    "/cart/addtocart",
    (addCart: Cart) => {
        return addCart;
    }
);

export const updateCart = createAsyncThunk(
    "/cart/updateCart",
    (editCart: { productId: string, itemDetail: IItemDetailList }) => {
        return editCart;
    }
);

export const removeToCart = createAsyncThunk(
    "/cart/removetocart",
    (productId: string) => {
        return productId;
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

        builder.addCase(addToCart.pending, (state) => {
            state.loading = true;
        });

        builder.addCase(addToCart.rejected, (state) => {
            state.loading = false;
            state.error = true;
        });

        builder.addCase(addToCart.fulfilled, (state, action) => {
            state.loading = false;
            if (state.cartCurrent) {
                state.cartCurrent.push(action.payload);
            } else {
                state.cartCurrent = [action.payload];
            }
        });

        builder.addCase(updateCart.pending, (state) => {
            state.loading = true;
        });

        builder.addCase(updateCart.rejected, (state) => {
            state.loading = false;
            state.error = true;
        });

        builder.addCase(updateCart.fulfilled, (state, action) => {
            state.loading = false;
            if (state.cartCurrent) {
                const productId = action?.payload?.productId;
                const newItemDetail = action?.payload?.itemDetail;

                // Tìm kiếm sản phẩm trong giỏ hàng
                let foundProductIndex = -1;
                for (let i = 0; i < state.cartCurrent.length; i++) {
                    const product = state.cartCurrent[i];
                    if (product.productId === productId) {
                        foundProductIndex = i;
                        break;
                    }
                }

                // Nếu sản phẩm đã tồn tại trong giỏ hàng
                if (foundProductIndex !== -1) {
                    const currentData = state.cartCurrent[foundProductIndex];

                    // Kiểm tra xem có sản phẩm cùng kích thước không
                    let sameSizeItemIndex = -1;
                    for (let j = 0; j < currentData.itemDetailList.length; j++) {
                        const item = currentData.itemDetailList[j];
                        if (item.size === newItemDetail.size) {
                            sameSizeItemIndex = j;
                            break;
                        }
                    }

                    // Nếu đã có sản phẩm cùng kích thước
                    if (sameSizeItemIndex !== -1) {
                        const existingItem = currentData.itemDetailList[sameSizeItemIndex];
                        // Kiểm tra nếu cùng topping
                        if (existingItem.toppingNameList === newItemDetail.toppingNameList) {
                            toast.error("The product already exists in the shopping cart!");
                        } else {
                            // Cập nhật topping
                            // currentData.itemDetailList[sameSizeItemIndex].toppingNameList = newItemDetail.toppingNameList;
                            // Ghi đè lên phần tử hiện tại
                            // state.cartCurrent[foundProductIndex] = currentData;
                            // Cập nhật topping
                            currentData.itemDetailList[sameSizeItemIndex].toppingNameList = newItemDetail.toppingNameList;
                            currentData.itemDetailList[sameSizeItemIndex].price = newItemDetail.price;
                            currentData.itemDetailList[sameSizeItemIndex].note = newItemDetail.note;
                            currentData.itemDetailList[sameSizeItemIndex].quantity = newItemDetail.quantity;

                            // Ghi đè lên phần tử hiện tại trong giỏ hàng   
                            state.cartCurrent[foundProductIndex] = currentData;

                        }
                    } else {
                        // Không có sản phẩm cùng kích thước, thêm mới
                        state.cartCurrent[foundProductIndex].itemDetailList.push(newItemDetail);
                    }
                }
            }
        });

        builder.addCase(removeToCart.pending, (state) => {
            state.loading = true;
        });

        builder.addCase(removeToCart.rejected, (state) => {
            state.loading = false;
            state.error = true;
        });

        builder.addCase(removeToCart.fulfilled, (state, action) => {
            state.loading = false;
            if (state.cartCurrent) {
                state.cartCurrent = state?.cartCurrent?.filter(product => product?.productId !== action?.payload)
            }
        });
    },
});

export const { resetStoreCart } = cartSlice.actions;

export default cartSlice.reducer;
