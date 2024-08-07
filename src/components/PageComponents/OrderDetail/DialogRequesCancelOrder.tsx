import { cancellationRequestOrder, requestCancelOrder } from "@/api/PageApi/checkoutApi";
import useLoading from "@/hooks/useLoading";
import socket from "@/socket/socket";
import { toastError } from "@/utils/hepler";
import {
    Button,
    Dialog,
    Card,
    CardBody,
    CardFooter,
    Spinner,
} from "@material-tailwind/react";
import { Radio, Typography } from "@material-tailwind/react";
import { AxiosError } from "axios";
import { useState } from "react";
import { useTranslation } from "react-i18next";

interface IDialogRequestCancelOrder {
    orderId: string,
    open: boolean,
    setOpen: React.Dispatch<React.SetStateAction<boolean>>,
    handleOpen: () => void,
    getOrderDetails: () => Promise<void>,
    getOrderStatusLine: () => Promise<void>,
    getOrderItemReview: () => Promise<void>,
    type: string,
    branchId: string
}

function DialogRequestCancelOrder(props: IDialogRequestCancelOrder) {
    const { type, orderId, branchId, open, handleOpen, setOpen, getOrderDetails, getOrderStatusLine, getOrderItemReview } = props;
    const [reason, setReason] = useState<string>("I want to update address")
    const { isLoading, startLoading, stopLoading } = useLoading()
    const { t } = useTranslation()

    const renderReason = () => {
        return (
            <div className="flex flex-col">
                <Radio
                    crossOrigin="true"
                    name="reason"
                    defaultChecked={true}
                    onChange={e => {
                        if (e.target.checked) {
                            setReason(e.target.value)
                        }
                    }}
                    value="I want to update address"
                    label={
                        <Typography
                            placeholder=""
                            color="blue-gray"
                            className="flex font-medium text-blue-gray-800"
                        >
                            I want to update address
                        </Typography>
                    }
                />
                <Radio
                    crossOrigin="true"
                    name="reason"
                    value="I want to update products"
                    onChange={e => {
                        if (e.target.checked) {
                            setReason(e.target.value)
                        }
                    }}
                    label={
                        <Typography
                            placeholder=""
                            color="blue-gray"
                            className="flex font-medium text-blue-gray-800"
                        >
                            I want to update products
                        </Typography>
                    }
                />
                <Radio
                    crossOrigin="true"
                    name="reason"
                    value="I don't want to buy anymore"
                    onChange={e => {
                        if (e.target.checked) {
                            setReason(e.target.value)
                        }
                    }}
                    label={
                        <Typography
                            placeholder=""
                            color="blue-gray"
                            className="flex font-medium text-blue-gray-800"
                        >
                            I don't want to buy anymore
                        </Typography>
                    }
                />
                <Radio
                    crossOrigin="true"
                    name="reason"
                    value="I couldn't find a reasonable reason"
                    onChange={e => {
                        if (e.target.checked) {
                            setReason(e.target.value)
                        }
                    }}
                    label={
                        <Typography
                            placeholder=""
                            color="blue-gray"
                            className="flex font-medium text-blue-gray-800"
                        >
                            I couldn't find a reasonable reason
                        </Typography>
                    }
                />
            </div>
        )
    }

    const handleConfirmRequestOrder = async (type: string) => {
        try {
            startLoading()
            if (type === "CREATED") {
                const data = await requestCancelOrder(orderId, reason)
                if (data?.success) {
                    getOrderDetails()
                    getOrderStatusLine()
                    getOrderItemReview()
                    setOpen(prev => !prev)
                    stopLoading()
                    socket.emit("user_update_order", {
                        branchId: branchId,
                        orderId: orderId
                    })
                }
            }
            else {
                const data = await cancellationRequestOrder(orderId, reason)
                if (data?.success) {
                    getOrderDetails()
                    getOrderStatusLine()
                    getOrderItemReview()
                    setOpen(prev => !prev)
                    stopLoading()
                    socket.emit("user_update_order", {
                        branchId: branchId,
                        orderId: orderId
                    })
                }
            }
        }
        catch (e: unknown) {
            stopLoading()
            if (e instanceof AxiosError && e.response) {
                toastError(e, "top-right")
            }
        }
    }

    return (
        <Dialog
            size="sm"
            open={open}
            handler={handleOpen}
            className="bg-transparent shadow-none"
            placeholder=""
        >
            <Card placeholder="" className="mx-auto w-full">
                <CardBody placeholder="" className="flex flex-col gap-4">
                    <div className="flex flex-col items-center justify-center font-bold text-lg">
                        {t("Reason Cancel Order")}
                    </div>
                    {renderReason()}
                </CardBody>
                <CardFooter placeholder="" className="pt-0">
                    <Button onClick={() => handleConfirmRequestOrder(type)} placeholder="" variant="gradient" fullWidth>
                        {isLoading ? (
                            <p className="flex items-center justify-center">
                                <span className="mr-2">{t("Confirm")}</span>{" "}
                                <Spinner className="h-4 w-4" />
                            </p>
                        ) : (
                            <span>{t("Confirm")}</span>
                        )}
                    </Button>
                </CardFooter>
            </Card>
        </Dialog>
    )
}

export default DialogRequestCancelOrder