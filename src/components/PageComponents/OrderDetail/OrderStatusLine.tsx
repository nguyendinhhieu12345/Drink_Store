import { Typography } from "@material-tailwind/react";
import assets from "@/assets";
import { OrderStatusData } from "@/pages/CustomerPage/OrderDetail";
import { ReceiptX, User, X } from "@phosphor-icons/react";

interface IOrderStatusLine {
    activeStep: number,
    statusOrderLine: OrderStatusData | undefined,
}

function OrderStatusLine(props: IOrderStatusLine) {
    const { activeStep, statusOrderLine } = props;

    const renderStatus = (status: string) => {
        switch (status) {
            case "CREATED":
                return "CREATED"
            case "ACCEPTED":
                return "ACCEPTED"
            case "CANCELLATION_REQUEST":
                return "REQUEST CANCEL"
            case "CANCELLATION_REQUEST_ACCEPTED":
                return "ACCEPT REQUEST CANCEL"
            case "PENDING_PICK_UP":
                return "PREPARED"
            case "IN_DELIVERY":
                return "SHIPPED"
            case "SUCCEED":
                return "SUCCEED"
            case "CANCELED":
                return "CANCELED"
        }
    }

    const renderIcon = (status: string) => {
        switch (status) {
            case "CREATED":
                return (
                    <User size={20} />
                )
            case "ACCEPTED":
                return (
                    <img src={assets?.images?.processing_icon} alt="" />
                )
            case "CANCELLATION_REQUEST":
                return (
                    <ReceiptX size={20} />
                )
            case "CANCELLATION_REQUEST_ACCEPTED":
                return (
                    <img src={assets?.images?.succeed_icon} alt="" />
                )
            case "PENDING_PICK_UP":
                return (
                    <img src={assets?.images?.home_icon} alt="" />
                )
            case "IN_DELIVERY":
                return (
                    <img src={assets?.images?.delivery_icon} alt="" />
                )
            case "SUCCEED":
                return (
                    <img src={assets?.images?.succeed_icon} alt="" />
                )
            case "CANCELED":
                return (
                    <X size={20} />
                )
        }
    }

    return (
        <div className="mb-10  w-full h-[80px]">
            <ul className="relative flex flex-row items-center justify-center gap-x-2 mt-10 w-full">
                {Array.from({ length: statusOrderLine?.data?.length as number }).map((_, index) => (
                    <li className="shrink basis-0 flex-1 group" key={index}>
                        <div className="min-w-7 min-h-7 w-full inline-flex items-center text-xs align-middle">
                            <span className="size-7 flex justify-center items-center flex-shrink-0 bg-black font-medium text-white rounded-full">
                                {renderIcon(statusOrderLine?.data[statusOrderLine?.data?.length - index - 1]?.orderStatus as string)}
                            </span>
                            <div className="ms-2 w-full h-px flex-1 bg-gray-200 group-last:hidden dark:bg-neutral-700"></div>
                        </div>
                        <div className="mt-3">
                            <span className="block text-sm font-medium text-gray-800 dark:text-white">
                                <Typography
                                    placeholder=""
                                    variant="h6"
                                    className={`text-blue-gray-800`}
                                >
                                    {renderStatus(statusOrderLine?.data[statusOrderLine?.data?.length - index - 1]?.orderStatus as string)}
                                </Typography>
                                <Typography
                                    placeholder=""
                                    color={activeStep === 0 ? "blue-gray" : "gray"}
                                    className="font-normal"
                                >
                                    {new Date(statusOrderLine?.data[statusOrderLine?.data?.length - index - 1]?.createdAt ?? "")?.toLocaleString('en-US', {
                                        timeZone: 'Asia/Ho_Chi_Minh',
                                        hour12: false,
                                    })}
                                </Typography>
                            </span>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default OrderStatusLine