import { useNavigate, useParams } from "react-router-dom";
import { configRouter } from "@/configs/router";
import { ArrowLeft } from "@phosphor-icons/react";
import { messageToast } from "@/utils/hepler";
import { useEffect, useState } from "react";
import * as checkoutApi from "@/api/PageApi/checkoutApi"
import { BaseResponseApi, User } from "@/type";
import { AxiosError } from "axios";
import { toast } from "react-toastify";
import useLoading from "@/hooks/useLoading";
import OrderStatusLine from "@/components/PageComponents/OrderDetail/OrderStatusLine";
import DetailStatusLine from "@/components/PageComponents/OrderDetail/DetailStatusLine";
import OrderProductDetail from "@/components/PageComponents/OrderDetail/OrderProductDetail";
import OrderPayment from "@/components/PageComponents/OrderDetail/OrderPayment";
import DialogReviewProduct from "@/components/PageComponents/OrderDetail/DialogReviewProduct";
import socket from "@/socket/socket";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

interface ItemDetail {
    quantity: number;
    toppingList: {
        name: string;
        price: number
    }[]; // Assuming toppingList contains strings
    price: number;
    productDiscount: number;
    note: string;
    size: string; //
}

interface Item {
    productId: string;
    name: string;
    itemDetailList: ItemDetail[];
}

interface RewardInformation {
    orderDiscount: string | null;
    shippingDiscount: string | null;
    productDiscount?: string | null;
    productGiftList: string[] | null; // Assuming productGiftList contains strings
}

interface ReceiverInformation {
    userId: string;
    detail: string;
    longitude: number;
    latitude: number;
    note: string;
    recipientName: string;
    phoneNumber: string;
}

interface Transaction {
    id: string;
    status: string;
    paymentType: string;
    paymentUrl?: string | null;
}

interface Branch {
    id: string;
    address: string;
}

export interface IOrderDetail extends BaseResponseApi {
    data: {
        id: string;
        note: string;
        itemList: Item[];
        totalItemPrice: number;
        shippingFee: number;
        coin: number;
        totalPayment: number;
        rewardInformation: RewardInformation;
        orderType: string;
        receiverInformation: ReceiverInformation;
        createdAt: number;
        transaction: Transaction;
        branch: Branch;
        needReview: boolean;
        refundStatus: string;
    }
}

export interface OrderStatusData extends BaseResponseApi {
    data: {
        orderStatus: string;
        createdAt: string;
        description: string;
        actor: string;
    }[]
}

export interface IOrderItemReview extends BaseResponseApi {
    data: {
        id: string;
        name: string;
        thumbnailUrl: string;
        review: {
            content: string;
            star: number;
            createdAt: string
        } | null;
    }[]
}

function OrderDetail() {
    const [orderDetail, setOrderDetail] = useState<IOrderDetail>()
    const [open, setOpen] = useState<boolean>(false);
    const [statusOrderLine, setStatusOrderLine] = useState<OrderStatusData>()
    const [productReview, setProductReview] = useState<{
        itemId: string,
        star: number,
        content: string,
    }>({
        itemId: "",
        star: 0,
        content: ""
    })
    const [orderItemReview, setOrderItemReview] = useState<IOrderItemReview>()
    const { isLoading, startLoading, stopLoading } = useLoading()
    const [error, setError] = useState<string>("")
    const [activeStep, setActiveStep] = useState<number>(0);

    const useCurrentUser = useSelector<RootState, User>(
        (state) => state.authSlice.currentUser as User
    );

    const handleOpen = () => setOpen((cur) => !cur);

    const nav = useNavigate();
    const { id } = useParams()

    const handleRedirectOrders = () => {
        nav(configRouter.myOrder);
    };

    const handleAddreview = async () => {
        console.log(orderItemReview?.data?.filter((product) => product?.id === productReview?.itemId))
        if ((orderItemReview?.data?.filter((product) => product?.id === productReview?.itemId) && orderItemReview?.data?.filter((product) => product?.id === productReview?.itemId)?.length > 0)) {
            if (!orderItemReview?.data?.filter((product) => product?.id === productReview?.itemId)[0]?.review) {
                try {
                    if (productReview?.content !== "" && productReview?.star !== 0) {
                        startLoading()
                        const data = await checkoutApi?.reviewProductOrder(productReview?.itemId, productReview?.star, productReview?.content)
                        if (data?.success) {
                            stopLoading()
                            setProductReview({
                                itemId: "",
                                star: 0,
                                content: ""
                            })
                            setError("")
                            setOpen(prev => !prev)
                            toast.success("Review product success")
                        }
                    }
                    else {
                        setError(messageToast?.fillInput)
                    }
                }
                catch (e: unknown) {
                    if (e instanceof AxiosError && e.response) {
                        stopLoading()
                        setError(e?.response?.data?.error?.errorMessage)
                    }
                }
            }
            else {
                setError("")
                setOpen(prev => !prev)
                setProductReview({
                    itemId: "",
                    star: 0,
                    content: ""
                })
            }
        }
        else {
            setError("")
            setOpen(prev => !prev)
            setProductReview({
                itemId: "",
                star: 0,
                content: ""
            })
        }
    }

    const handleOpenReview = (itemId: string) => {
        setOpen(prev => !prev)
        if (orderItemReview?.data?.filter((product) => product?.id === itemId) && orderItemReview?.data?.filter((product) => product?.id === itemId)?.length > 0) {
            setProductReview((prev: {
                itemId: string,
                star: number,
                content: string
            }) => ({
                ...prev!,
                itemId: itemId,
                star: orderItemReview?.data?.filter((product) => product?.id === itemId)[0]?.review?.star ?? 0,
                content: orderItemReview?.data?.filter((product) => product?.id === itemId)[0]?.review?.content ?? ""
            }))
        }
        else {
            setProductReview((prev: {
                itemId: string,
                star: number,
                content: string
            }) => ({
                ...prev!,
                itemId: itemId
            }))
        }
    }

    const getOrderDetails = async () => {
        try {
            const data = await checkoutApi?.getOrderDetail(id as string)
            if (data?.success) {
                setOrderDetail(data)
            }
        }
        catch (e: unknown) {
            if (e instanceof AxiosError && e.response) {
                nav(configRouter.myOrder);
                toast.error("Order not found with id: " + id);
            }
        }
    }

    const getOrderStatusLine = async () => {
        const data = await checkoutApi?.getOrderStatusLine(id as string)
        if (data?.success) {
            setStatusOrderLine(data)
            setActiveStep(data?.data?.length - 1)
        }
    }

    const getOrderItemReview = async () => {
        const data = await checkoutApi?.getReviewOrderDetail(id as string)
        if (data?.success) {
            setOrderItemReview(data)
        }
    }

    const handleRedirectOrderRefund = (orderId: string) => {
        nav(configRouter?.requireRefundOrder.slice(0, -3) + orderId)
    }

    useEffect(() => {
        socket.on('connect', () => {
            console.log('Connected to socket server');
            socket.emit('joinUser', useCurrentUser?.data?.userId); // Join the user-specific room
        });

        socket.on('employee_update_order', (data) => {
            console.log('Order update received:', data);
            // Handle the order update here
        });
        
        id && getOrderDetails()
        id && getOrderStatusLine()
        id && getOrderItemReview()
    }, [id])

    return (
        <div className="px-2 mt-20 mx-40">
            <div className="flex items-center">
                <button
                    onClick={handleRedirectOrders}
                    className="mr-3 cursor-pointer p-2 rounded-full hover:bg-gray-300"
                >
                    <ArrowLeft />
                </button>
                <h1 className="my-6 text-lg font-bold text-gray-700"> Invoice </h1>
            </div>

            {/* info order */}
            <div className="bg-white p-6 lg:p-8 rounded-xl shadow-base overflow-hidden">
                {/* order status line */}
                <div>
                    {/* Step status */}
                    <OrderStatusLine activeStep={activeStep} statusOrderLine={statusOrderLine} />
                    <DetailStatusLine getOrderDetails={getOrderDetails} getOrderItemReview={getOrderItemReview} getOrderStatusLine={getOrderStatusLine} orderDetail={orderDetail} statusOrderLine={statusOrderLine} />
                </div>

                {/* Order product */}
                <OrderProductDetail orderDetail={orderDetail} statusOrderLine={statusOrderLine} orderItemReview={orderItemReview} handleOpenReview={handleOpenReview} />

                {/* Order payment */}
                <OrderPayment orderDetail={orderDetail} />
                {
                    (orderDetail?.data?.refundStatus !== "NOT_REFUND" && statusOrderLine?.message && statusOrderLine?.data?.filter(prev => prev?.orderStatus === "SUCCEED")?.length > 0) &&
                    <div className="mt-3 flex justify-end">
                        <button
                            onClick={() => handleRedirectOrderRefund(orderDetail?.data?.id as string)}
                            className="flex items-center text-sm leading-5 transition-colors duration-150 font-medium focus:outline-none px-5 py-2 rounded-md text-white bg-green-500 border border-transparent w-auto"
                        >
                            {orderDetail?.data?.refundStatus === "CAN_REFUND" ? "Require refund" : "See Require Refund"}
                        </button>
                    </div>
                }
            </div>

            {/* review product in order */}
            <DialogReviewProduct
                open={open}
                handleOpen={handleOpen}
                productReview={productReview}
                setProductReview={setProductReview}
                error={error}
                orderItemReview={orderItemReview}
                isLoading={isLoading}
                handleAddreview={handleAddreview}
            />
        </div >
    )
}

export default OrderDetail