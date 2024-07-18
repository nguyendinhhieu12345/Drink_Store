import { IOrderItemReview } from "@/pages/CustomerPage/OrderDetail";
import {
    Button,
    Dialog,
    Card,
    CardBody,
    CardFooter,
    Rating,
    Spinner,
} from "@material-tailwind/react";
import { useTranslation } from "react-i18next";

interface IDialogReviewProduct {
    open: boolean;
    handleOpen: () => void,
    productReview: {
        itemId: string,
        star: number,
        content: string,
    },
    setProductReview: React.Dispatch<React.SetStateAction<{
        itemId: string;
        star: number;
        content: string;
    }>>,
    error: string,
    orderItemReview: IOrderItemReview | undefined,
    isLoading: boolean,
    handleAddreview: () => Promise<void>
}

function DialogReviewProduct(props: IDialogReviewProduct) {
    const { open, handleAddreview, handleOpen, productReview, setProductReview, error, orderItemReview, isLoading } = props;
    const { t } = useTranslation()

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
                    <div className="flex flex-col items-center justify-center">
                        <img src="https://underconstructionpage.com/wp-content/uploads/2018/03/paid-reviews.png" alt="image review" className="w-full max-h-32 rounded-lg object-cover" />
                        <p className="font-semibold text-lg my-2">{t("Leave a review")}</p>
                        <div className="text-left w-full">
                            <p>{t("Rating")}</p>
                            <Rating value={productReview?.star} onChange={(e) => {
                                setProductReview((prev: {
                                    itemId: string,
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
                            <p>{t("Content")}</p>
                            <input onChange={(e) => {
                                setProductReview((prev: {
                                    itemId: string,
                                    star: number,
                                    content: string
                                }) => (
                                    {
                                        ...prev,
                                        content: e.target.value
                                    }
                                ))
                            }}
                                value={productReview?.content}
                                placeholder="Additional review..." className="w-full px-4 py-2 my-2 text-sm text-gray-900 border border-gray-300 rounded-md bg-gray-50 focus:ring-blue-500 focus:border-blue-500 active:ring-blue-500 active:border-blue-500" />
                            {error !== "" && <p className="italic text-sm text-red-500">{error}</p>}
                            <p className="italic text-sm">*{t("Review will be visible to the public")}</p>
                        </div>
                    </div>
                </CardBody>
                <CardFooter placeholder="" className="pt-0">
                    <Button placeholder="" variant="gradient" onClick={handleAddreview} fullWidth>
                        {isLoading ? (
                            <p className="flex items-center justify-center">
                                <span className="mr-2">{t("Send Review")}</span>{" "}
                                <Spinner className="h-4 w-4" />
                            </p>
                        ) : (
                            <span>{(orderItemReview?.data?.filter((product) => product?.id === productReview?.itemId) && orderItemReview?.data?.filter((product) => product?.id === productReview?.itemId)?.length > 0 && orderItemReview?.data?.filter((product) => product?.id === productReview?.itemId)[0]?.review) ? <>{t("CLOSE")}</> : <>{t("Send Review")}</>}</span>
                        )}
                    </Button>
                </CardFooter>
            </Card>
        </Dialog>
    )
}

export default DialogReviewProduct