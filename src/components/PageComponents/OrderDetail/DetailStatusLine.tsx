import { Edit } from "@/components/SVG/Edit.svg"
import { IOrderDetail, OrderStatusData } from "@/pages/CustomerPage/OrderDetail"
import { useState } from "react"
import DialogRequestCancelOrder from "./DialogRequesCancelOrder"

interface IOrderStatusLine {
    orderDetail: IOrderDetail | undefined,
    statusOrderLine: OrderStatusData | undefined,
    getOrderDetails: () => Promise<void>,
    getOrderStatusLine: () => Promise<void>,
    getOrderItemReview: () => Promise<void>
}

function DetailStatusLine(props: IOrderStatusLine) {
    const { orderDetail, statusOrderLine, getOrderDetails, getOrderItemReview, getOrderStatusLine } = props
    const [open, setOpen] = useState<boolean>(false)

    const handleOpen = () => {
        setOpen(prev => !prev)
    }

    return (
        <>
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
                        {(statusOrderLine?.data[0]?.orderStatus === "CREATED" || statusOrderLine?.data[0]?.orderStatus === "ACCEPTED") &&
                            <button onClick={handleOpen} className="flex items-center px-2 py-1 bg-btnActive text-white rounded-lg m-2"><Edit /><span>{statusOrderLine?.data[0]?.orderStatus === "ACCEPTED" && "Request"} Cancel Order</span></button>
                        }
                    </p>
                    {statusOrderLine?.data[0]?.orderStatus === "CANCELED" && <span className="italic text-sm lowercase text-red-400">{statusOrderLine?.data[0]?.description}</span>}
                </h1>
                <div className="lg:text-right text-left">
                    <p className="text-sm text-gray-500  mt-2">
                        {orderDetail?.data?.branch?.address} <br></br>
                    </p>
                </div>
            </div>
            <DialogRequestCancelOrder type={statusOrderLine?.data[0]?.orderStatus as string} setOpen={setOpen} getOrderDetails={getOrderDetails} getOrderItemReview={getOrderItemReview} getOrderStatusLine={getOrderStatusLine} orderId={orderDetail?.data?.id as string} open={open} handleOpen={handleOpen} />
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
        </>
    )
}

export default DetailStatusLine