import { Edit } from "@/components/SVG/Edit.svg"
import { configRouter } from "@/configs/router"
import { formatVND, messageToast } from "@/utils/hepler"
import { CaretLeft, Timer } from "@phosphor-icons/react"
import { useNavigate } from "react-router-dom"
import { ICheckout, IPropsCheckout } from "./CheckoutDetail"
import { useDispatch, useSelector } from "react-redux"
import { AppDispatch, RootState } from "@/redux/store"
import { Cart, resetStoreCart } from "@/features/cart/cartSlice"
import * as checkoutApi from "@/api/PageApi/checkoutApi"
import useLoading from "@/hooks/useLoading"
import { Spinner } from "@material-tailwind/react"
import { AxiosError } from "axios"
import { toast } from "react-toastify"

function OrderSumary(props: IPropsCheckout) {
    const nav = useNavigate()
    const profileBase = JSON.parse(localStorage?.getItem("profile") as string)
    const cartCurrent = useSelector<RootState, Cart[]>(
        (state) => state?.cartSlice?.cartCurrent as Cart[]
    )
    const { isLoading, startLoading, stopLoading } = useLoading()
    const dispatch = useDispatch<AppDispatch>()

    const handleAddProduct = () => {
        nav(configRouter.searchProduct)
    }

    const handleRedirectProductDetail = (productId: string) => {
        nav(configRouter.productDetail.slice(0, -3) + productId)
    }

    const handleRedirectThanksPage = async () => {
        if (props?.dataCheckout?.type === "Home Delivery") {
            try {
                startLoading()
                const data = await checkoutApi?.orderShipping(Object.fromEntries(Object.entries(props?.dataCheckout).filter(([key]) => (key !== 'type' && key !== "recipientName" && key !== "phoneNumber" && key !== "receiveTime" && key !== "branchId"))) as ICheckout)
                if (data?.success) {
                    stopLoading()
                    if (props?.dataCheckout?.paymentType === "VNPAY" || props?.dataCheckout?.paymentType === "ZALOPAY") {
                        localStorage.setItem("orderId", data?.data?.orderId)
                        localStorage.setItem("transactionId", data?.data?.transactionId)
                        dispatch(resetStoreCart())
                        window.location.href = (data?.data?.paymentUrl as string)
                        if (props?.dataCheckout?.coin > 0) {
                            localStorage.setItem("profile", JSON.stringify(
                                {
                                    ...profileBase,
                                    coin: profileBase?.coin - props?.dataCheckout?.coin
                                }
                            ))
                        }
                    }
                    else {
                        dispatch(resetStoreCart())
                        nav(configRouter?.orderDetail.slice(0, -3) + data?.data?.orderId)
                    }
                }
            }
            catch (e: unknown) {
                if (e instanceof AxiosError && e.response) {
                    stopLoading()
                }
            }
        }
        else {
            try {
                if (props?.dataCheckout?.branchId && props?.dataCheckout?.receiveTime && props?.dataCheckout?.phoneNumber && props?.dataCheckout?.recipientName) {
                    startLoading()
                    const data = await checkoutApi?.orderOnsite(Object.fromEntries(Object.entries(props?.dataCheckout).filter(([key]) => (key !== 'type' && key !== 'addressId' && key !== 'shippingFee'))) as ICheckout)
                    if (data?.success) {
                        stopLoading()
                        if (props?.dataCheckout?.paymentType === "VNPAY" || props?.dataCheckout?.paymentType === "ZALOPAY") {
                            localStorage.setItem("orderId", data?.data?.orderId)
                            localStorage.setItem("transactionId", data?.data?.transactionId)
                            dispatch(resetStoreCart())
                            window.location.href = (data?.data?.paymentUrl as string)
                        }
                        else {
                            dispatch(resetStoreCart())
                            nav(configRouter?.orderDetail.slice(0, -3) + data?.data?.orderId)
                        }
                    }
                }
                else {
                    toast.error(messageToast.fillInput)
                }
            }
            catch (e: unknown) {
                if (e instanceof AxiosError && e.response) {
                    stopLoading()
                }
            }
        }
    }

    const calculateTotalPrice = (cart: Cart[]): number => {
        let totalPrice = 0;

        // Iterate through each item in the cart
        cart.forEach(item => {
            // Calculate subtotal for each item
            const subtotal = item.itemDetailList.reduce((acc, detail) => {
                return acc + (detail.price || 0);
            }, 0);

            // Add subtotal to totalPrice
            totalPrice += subtotal;
        });

        return totalPrice;
    };

    return (
        <div className="w-1/2 ml-10 border shadow-base rounded-lg p-3">
            <p className="font-semibold text-lg mb-2">Order Sumary</p>
            <div>
                {cartCurrent?.map((cart, index) => (
                    <div key={index} className="flex items-center justify-between my-2">
                        <div className="flex items-center">
                            <Edit onClick={() => handleRedirectProductDetail(cart?.productId)} className="w-5 h-5 mr-3 cursor-pointer" />
                            <div>
                                <button onClick={() => handleRedirectProductDetail(cart?.productId)} className="font-semibold text-base">{cart?.itemDetailList?.reduce((value, item) => item?.quantity + value, 0)} x {cart?.name}</button>
                                {cart?.itemDetailList[0]?.size &&
                                    cart?.itemDetailList?.map((item) => (
                                        <div key={item?.size}>
                                            <p className="text-sm text-default italic">Size: {item?.quantity} x {item?.size}</p>
                                            {item?.note && <p className="text-sm text-default italic">Note: {item?.note}</p>}
                                        </div>
                                    ))
                                }
                            </div>
                        </div>
                        <div className="font-semibold text-default">
                            {formatVND(cart?.itemDetailList?.reduce((value, item) => (item?.price ?? 0) + value, 0))}
                        </div>
                    </div>
                ))}
            </div>
            <button onClick={handleAddProduct} className="text-default flex text-sm pb-2 border-b w-full">
                <CaretLeft size={18} /> <span>Add more product</span>
            </button>
            <div className="my-2 border-b pb-2">
                <p className="font-semibold text-base mb-2">Time Order</p>
                <p className="flex items-center text-default">As soon as posible: <Timer weight="fill" size={20} /> <span>Now - 10 Minutes</span></p>
                <input onChange={(e) => props?.setDataCheckout((prev: ICheckout | undefined) => ({
                    ...prev!,
                    note: e.target.value

                }))} placeholder="Additional note for shop..." className="w-2/3 px-4 py-2 my-2 text-sm text-gray-900 border border-gray-300 rounded-md bg-gray-50 focus:ring-blue-500 focus:border-blue-500 active:ring-blue-500 active:border-blue-500" />
            </div>
            <div className="my-2">
                <p className="font-semibold text-base mb-2">Payment sumary</p>
                <div className="flex items-center justify-between mb-2 text-default">
                    <p className="text-black">Item price</p>
                    <p>{formatVND(calculateTotalPrice(cartCurrent) ?? 0)}</p>
                </div>
                {props?.dataCheckout?.type === "Home Delivery" && <div className="flex items-center justify-between mb-2 text-default">
                    <p className="text-black">Shipping Fee</p>
                    <p>{formatVND(props?.dataCheckout?.shippingFee ?? 0)}</p>
                </div>}
                <div className="flex items-center justify-between mb-2">
                    <p className="text-black">Applied Coin</p>
                    <p className="text-yellow-300">-{formatVND(props?.dataCheckout?.coin ?? 0)}</p>
                </div>
                <div className="flex items-center justify-between mb-2">
                    <p className="text-black">Discount</p>
                    <p className="text-yellow-300">-{formatVND(parseInt(localStorage.getItem("discountValue") ?? "0"))}</p>
                </div>
                <div className="flex items-center justify-between mb-2 text-default">
                    <p className="text-black font-semibold">Total</p>
                    <p className="font-semibold">{formatVND(props?.dataCheckout?.total ?? 0)}</p>
                </div>
            </div>
            <button onClick={handleRedirectThanksPage} className="w-full py-4 px-2 text-center bg-btnActive rounded-lg text-white">
                {isLoading ? (
                    <p className="flex items-center justify-center">
                        <span className="mr-2">Order</span>{" "}
                        <Spinner className="h-4 w-4" />
                    </p>
                ) : (
                    <span>Order</span>
                )}
            </button>
        </div>
    )
}

export default OrderSumary