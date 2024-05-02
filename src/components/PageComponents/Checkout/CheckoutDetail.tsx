import { Cart } from "@/features/cart/cartSlice"
import AddAddress from "./AddAddress"
import AddPayment from "./AddPayment"
import OrderSumary from "./OrderSumary"
import { useEffect, useState } from "react"
import AddCoupon from "./AddCoupon"
import { useSelector } from "react-redux"
import { RootState } from "@/redux/store"

export interface ICheckout {
    userId: string,
    itemList: Cart[],
    note: string,
    paymentType: string,
    addressId: string,
    shippingFee: number,
    productCouponCode: string,
    orderCouponCode: string,
    shippingCouponCode: string,
    total: number,
    coin: number,
    type?: string,
    receiveTime?: string,
    branchId?: string,
    phoneNumber?: string,
    recipientName?: string
}

export interface IPropsCheckout {
    dataCheckout: ICheckout | undefined,
    setDataCheckout: React.Dispatch<React.SetStateAction<ICheckout | undefined>>
}

function CheckoutDetail() {
    const [dataCheckout, setDataCheckout] = useState<ICheckout>()
    const cartCurrent = useSelector<RootState, Cart[]>(
        (state) => state?.cartSlice?.cartCurrent as Cart[]
    )

    useEffect(() => {
        setDataCheckout((prev: ICheckout | undefined) => (
            {
                ...prev!,
                type: "Home Delivery",
                itemList: cartCurrent.map(item => {
                    const { productId, itemDetailList } = item;
                    return {
                        productId,
                        itemDetailList: itemDetailList.map(detail => {
                            const { quantity, toppingNameList, size, note } = detail;
                            if (size) {
                                return {
                                    quantity,
                                    toppingNameList,
                                    size,
                                    note
                                };
                            }
                            else {
                                return {
                                    quantity,
                                    note
                                };
                            }
                        })
                    }
                }) as Cart[],
                total: cartCurrent.reduce((total, item) => {
                    return total + (item?.itemDetailList ?? []).reduce((subtotal, item) => {
                        return subtotal + (item?.price ?? 0);
                    }, 0);
                }, 0) + (prev?.shippingFee as number ?? 0),
            }
        ))
    }, [])

    return (
        <div className="flex items-start">
            <div className="flex flex-col w-1/2">
                <AddAddress dataCheckout={dataCheckout} setDataCheckout={setDataCheckout} />
                <AddPayment dataCheckout={dataCheckout} setDataCheckout={setDataCheckout} />
                <AddCoupon dataCheckout={dataCheckout} setDataCheckout={setDataCheckout} />
            </div>
            <OrderSumary dataCheckout={dataCheckout} setDataCheckout={setDataCheckout} />
        </div>
    )
}

export default CheckoutDetail