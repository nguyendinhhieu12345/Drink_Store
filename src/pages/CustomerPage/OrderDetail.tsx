import { useNavigate, useParams } from "react-router-dom";
import { configRouter } from "@/configs/router";
import { ArrowLeft } from "@phosphor-icons/react";
import { formatVND } from "@/utils/hepler";
import { Edit } from "@/components/SVG/Edit.svg";
import {
    Button,
    Dialog,
    Card,
    CardBody,
    CardFooter,
    Rating,
    Spinner,
} from "@material-tailwind/react";
import { useEffect, useState } from "react";
import * as checkoutApi from "@/api/PageApi/checkoutApi"
import { BaseResponseApi } from "@/type";
import { AxiosError } from "axios";
import { toast } from "react-toastify";
import useLoading from "@/hooks/useLoading";

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

interface IOrderDetail extends BaseResponseApi {
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

interface OrderStatusData extends BaseResponseApi {
    data: {
        orderStatus: string;
        createdAt: string;
        description: string;
        actor: string;
    }[]
}

function OrderDetail() {
    const [orderDetail, setOrderDetail] = useState<IOrderDetail>()
    const [open, setOpen] = useState<boolean>(false);
    const [statusOrderLine, setStatusOrderLine] = useState<OrderStatusData>()
    const [productReview, setProductReview] = useState<{
        productId: string,
        star: number,
        content: string
    }>({
        productId: "",
        star: 0,
        content: ""
    })
    const { isLoading, startLoading, stopLoading } = useLoading()

    const handleOpen = () => setOpen((cur) => !cur);

    const nav = useNavigate();
    const { id } = useParams()

    const handleRedirectOrders = () => {
        nav(configRouter.home);
    };

    const handleAddreview = async () => {
        console.log(productReview)
        try {
            startLoading()
            const data = await checkoutApi?.reviewProductOrder(productReview?.productId, productReview?.star, productReview?.content)
            if (data?.success) {
                stopLoading()
                setOrderDetail(data)
            }
        }
        catch (e: unknown) {
            if (e instanceof AxiosError && e.response) {
                stopLoading()
                nav(configRouter.myOrder);
                toast.error("Order not found with id: " + id);
            }
        }
    }

    useEffect(() => {
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
            }
        }
        id && getOrderDetails()
        id && getOrderStatusLine()
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

            <div className="bg-white mb-4 p-6 lg:p-8 rounded-xl shadow-base overflow-hidden">
                <div>
                    <div className="flex lg:flex-row md:flex-row flex-col lg:items-center justify-between pb-4 border-b border-gray-50 ">
                        <h1 className="font-bold text-xl uppercase">
                            Invoice
                            <p className="text-xs mt-1 text-gray-500">
                                Status
                                <span className="pl-2 font-medium text-xs capitalize">
                                    {" "}
                                    <span className="font-serif">
                                        <span className="inline-flex text-center px-2 text-sm font-medium leading-5 rounded-full text-yellow-600 bg-yellow-100 ">
                                            {statusOrderLine?.data[0]?.orderStatus} {!statusOrderLine?.data[0]?.orderStatus && <button className="ml-2"><Edit /></button>}
                                        </span>
                                    </span>
                                </span>
                            </p>
                            <span className="italic text-sm lowercase text-red-400">{statusOrderLine?.data[0]?.description}</span>
                        </h1>
                        <div className="lg:text-right text-left">
                            <p className="text-sm text-gray-500  mt-2">
                                {orderDetail?.data?.branch?.address} <br></br>
                            </p>
                        </div>
                    </div>
                    <div className="flex lg:flex-row md:flex-row flex-col justify-between pt-4">
                        <div className="mb-3 md:mb-0 lg:mb-0 flex flex-col">
                            <span className="font-bold font-serif text-sm uppercase text-gray-600 block">
                                DATE
                            </span>
                            <span className="text-sm text-gray-500  block">
                                {new Date(orderDetail?.data?.createdAt as number).toLocaleString().split(", ")[0]}
                            </span>
                        </div>
                        <div className="mb-3 md:mb-0 lg:mb-0 flex flex-col">
                            <span className="font-bold font-serif text-sm uppercase text-gray-600  block">
                                INVOICE NO
                            </span>
                            <span className="text-sm text-gray-500  block">
                                {orderDetail?.data?.id}
                            </span>
                        </div>
                        <div className="flex flex-col lg:text-right text-left">
                            <span className="font-bold font-serif text-sm uppercase text-gray-600  block">
                                INVOICE TO
                            </span>
                            <p className="text-sm text-gray-500  mt-2">
                                {orderDetail?.data?.receiverInformation?.detail} <br></br>
                                {orderDetail?.data?.receiverInformation?.phoneNumber}
                                <br></br>
                                <span>
                                    {orderDetail?.data?.receiverInformation?.recipientName}
                                </span>
                            </p>
                        </div>
                    </div>
                </div>
                <div>
                    <div className="w-full overflow-hidden border border-gray-200  rounded-lg my-8">
                        <div className="w-full overflow-x-auto">
                            <table className="w-full whitespace-nowrap">
                                <thead className="text-xs font-semibold tracking-wide text-left text-gray-500 uppercase border-b border-gray-200  bg-gray-100 ">
                                    <tr>
                                        <td className="px-4 py-2 text-center">SR.</td>
                                        <td className="px-4 py-2 text-center">Product Title</td>
                                        <td className="px-4 py-2 text-center">DETAIL</td>
                                    </tr>
                                </thead>
                                <tbody className="text-gray-800  bg-white  divide-y divide-gray-100 text-serif text-sm my-2">
                                    {orderDetail?.data?.itemList?.map((item, index) => (
                                        <tr className="my-2" key={index}>
                                            <td className="whitespace-nowrap font-normal text-gray-500 text-center my-2">
                                                {index + 1}
                                            </td>
                                            <td className="whitespace-nowrap font-normal text-gray-500 text-center my-2">
                                                <span className="text-gray-700 font-semibold  text-xs text-center my-2">
                                                    {item?.name}
                                                </span>
                                            </td>
                                            <td className="whitespace-nowrap font-bold text-center my-2">
                                                <ul>
                                                    {item?.itemDetailList?.map((size, index) => (
                                                        <li key={index}>
                                                            Size: {size?.size} -Quantity: {size?.quantity} -
                                                            price: {formatVND(size?.price)}{" "}
                                                            <br></br>
                                                            Topping list: {
                                                                size?.toppingList?.map((topping, index) => (
                                                                    <span key={index}>
                                                                        {topping?.name} -{" "}
                                                                        {formatVND(
                                                                            topping?.price ?? 0
                                                                        )}
                                                                    </span>
                                                                ))}
                                                        </li>
                                                    ))}
                                                </ul>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                <div className="border rounded-xl border-gray-100 p-8 py-6 bg-gray-50 ">
                    <div className="flex lg:flex-row md:flex-row flex-col justify-between">
                        <div className="mb-3 md:mb-0 lg:mb-0  flex flex-col sm:flex-wrap">
                            <span className="mb-1 font-bold font-serif text-sm uppercase text-gray-600  block">
                                PAYMENT METHOD
                            </span>
                            <span className="text-sm text-gray-500  font-semibold font-serif block">
                                {orderDetail?.data?.transaction?.paymentType} <span className="text-yellow-300 px-2.5 py-1 border border-yellow-300 rounded-xl">{orderDetail?.data?.transaction?.status}</span>
                            </span>
                        </div>
                        <div className="mb-3 md:mb-0 lg:mb-0  flex flex-col sm:flex-wrap">
                            <span className="mb-1 font-bold font-serif text-sm uppercase text-gray-600  block">
                                SHIPPING COST
                            </span>
                            <span className="text-sm text-gray-500  font-semibold font-serif block">
                                {formatVND(
                                    orderDetail?.data?.shippingFee ?? 0
                                )}
                            </span>
                        </div>
                        <div className="mb-3 md:mb-0 lg:mb-0  flex flex-col sm:flex-wrap">
                            <span className="mb-1 font-bold font-serif text-sm uppercase text-gray-600  block">
                                TOAL ITEM PRICE
                            </span>
                            <span className="text-sm text-gray-500  font-semibold font-serif block">
                                {formatVND(
                                    orderDetail?.data?.totalItemPrice ?? 0
                                )}
                            </span>
                        </div>
                        <div className="flex flex-col sm:flex-wrap">
                            <span className="mb-1 font-bold font-serif text-sm uppercase text-gray-600  block">
                                TOTAL AMOUNT
                            </span>
                            <span className="text-xl font-serif font-bold text-red-500  block">
                                {formatVND(
                                    orderDetail?.data?.totalPayment ?? 0
                                )}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
            <Dialog
                size="sm"
                open={open}
                handler={handleOpen}
                className="bg-transparent shadow-none"
                placeholder=""
            >
                <Card placeholder="" className="mx-auto w-full">
                    <CardBody placeholder="" className="flex flex-col gap-4">
                        <div className="flex flex-col items-center justify-center">
                            <img src="https://underconstructionpage.com/wp-content/uploads/2018/03/paid-reviews.png" alt="image review" className="w-full max-h-32 rounded-lg object-cover" />
                            <p className="font-semibold text-lg my-2">Leave a review</p>
                            <div className="text-left w-full">
                                <p>Rating</p>
                                <Rating onChange={(e) => {
                                    setProductReview((prev: {
                                        productId: string,
                                        star: number,
                                        content: string
                                    }) => (
                                        {
                                            ...prev,
                                            star: e
                                        }
                                    ))
                                }
                                } placeholder="" unratedColor="amber" ratedColor="amber" className="my-2" />
                                <p>Content</p>
                                <input onChange={(e) => {
                                    setProductReview((prev: {
                                        productId: string,
                                        star: number,
                                        content: string
                                    }) => (
                                        {
                                            ...prev,
                                            content: e.target.value
                                        }
                                    ))
                                }} placeholder="Additional review..." className="w-full px-4 py-2 my-2 text-sm text-gray-900 border border-gray-300 rounded-md bg-gray-50 focus:ring-blue-500 focus:border-blue-500 active:ring-blue-500 active:border-blue-500" />
                                <p className="italic text-sm">*Review will be visible to the public</p>
                            </div>
                        </div>
                    </CardBody>
                    <CardFooter placeholder="" className="pt-0">
                        <Button placeholder="" variant="gradient" onClick={handleAddreview} fullWidth>
                            {isLoading ? (
                                <p className="flex items-center justify-center">
                                    <span className="mr-2">Send Review</span>{" "}
                                    <Spinner className="h-4 w-4" />
                                </p>
                            ) : (
                                <span>Send Review</span>
                            )}
                        </Button>
                    </CardFooter>
                </Card>
            </Dialog>
        </div >
    )
}

export default OrderDetail