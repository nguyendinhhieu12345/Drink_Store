import { ArrowLeft, Camera } from '@phosphor-icons/react';
import React, { useEffect, useState } from 'react';
import { Radio, Spinner, Typography } from "@material-tailwind/react";
import useLoading from '@/hooks/useLoading';
import { useNavigate, useParams } from 'react-router-dom';
import { createOrderRefund, getOrderRefundDetail } from '@/api/PageApi/refundOrder';
import { configRouter } from '@/configs/router';
import { AxiosError } from 'axios';
import { toast } from 'react-toastify';
import { imageUrlToFile, messageToast } from '@/utils/hepler';
import { BaseResponseApi } from '@/type';
import { useTranslation } from 'react-i18next';

interface IResponRefundOrder extends BaseResponseApi {
    data: {
        reason: string;
        note: string | null,
        status: string,
        mediaList: {
            thumbnailUrl: string;
            mediaUrl: string
        }[],
        createdAt: string
    }
}

const RequireRefundOrder: React.FC = () => {
    const [files, setFiles] = useState<(File | null)[]>([]);
    const [text, setText] = useState<string>('');
    const [refund, setRefund] = useState<IResponRefundOrder>()
    const { isLoading, startLoading, stopLoading } = useLoading()
    const [reason, setReason] = useState<string>('Package has not been received');
    const { id } = useParams()
    const nav = useNavigate()
    const { t } = useTranslation()

    const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        const newText = event.target.value;
        if (newText.length <= 300) {
            setText(newText);
        }
    };

    const handleFileChange = (index: number, event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files.length > 0) {
            const newFiles = [...files];
            newFiles[index] = event.target.files[0];
            setFiles(newFiles);
        }
    };

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
                    value="Package has not been received"
                    label={
                        <Typography
                            placeholder=""
                            color="blue-gray"
                            className="flex font-medium text-blue-gray-800"
                        >
                            Package has not been received
                        </Typography>
                    }
                />
                <Radio
                    crossOrigin="true"
                    name="reason"
                    checked={reason === "Missing products" && true}
                    value="Missing products"
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
                            Missing products
                        </Typography>
                    }
                />
                <Radio
                    crossOrigin="true"
                    name="reason"
                    checked={reason === "Product does not match the description" && true}
                    value="Product does not match the description"
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
                            Product does not match the description
                        </Typography>
                    }
                />
                <Radio
                    crossOrigin="true"
                    name="reason"
                    checked={reason === "The product has been damaged" && true}
                    value="The product has been damaged"
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
                            The product has been damaged
                        </Typography>
                    }
                />
                <Radio
                    crossOrigin="true"
                    name="reason"
                    checked={reason === "Wrong product sent" && true}
                    value="Wrong product sent"
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
                            Wrong product sent
                        </Typography>
                    }
                />
            </div>
        )
    }

    const handleConfirm = async () => {
        try {
            startLoading()
            if (files?.length > 0 && reason.trim() !== "") {
                const dataRefund = new FormData()
                dataRefund.append("reason", reason)
                text && dataRefund.append("note", text)
                files.forEach(file => {
                    if (file !== null) {
                        dataRefund.append("mediaList", file);
                    }
                })
                const data = await createOrderRefund(id as string, dataRefund)
                console.log(data)
                if (data?.success) {
                    stopLoading()
                    nav(configRouter.orderDetail.slice(0, -3) + id)
                }
            }
            else {
                toast?.error(messageToast.fillInput)
                stopLoading()
            }
        }
        catch (e: unknown) {
            stopLoading()
            if (e instanceof AxiosError && e.response) {
                if (e?.response?.data?.error?.subErrorCode === 1015) {
                    toast.error(e?.response?.data?.error?.subErrorMessage);
                    nav(configRouter.orderDetail.slice(0, -3) + id)
                }
                else
                    toast.error(e?.response?.data?.error?.subErrorMessage);
            }
        }
    }

    const handleRedirectOrders = () => {
        nav(configRouter.orderDetail.slice(0, -3) + id)
    }

    const handleImageAdd = async (imageUrl: string) => {
        const file = await imageUrlToFile(imageUrl);
        if (file) {
            setFiles(prev => [...prev, file])
        } else {
            console.log("Failed to convert image URL to file");
        }
    };

    useEffect(() => {
        const handleGetOrderRefundDetail = async () => {
            try {
                const data = await getOrderRefundDetail(id as string)
                console.log(data)
                if (data?.success) {
                    setRefund(data)
                    setText(data?.data?.note ?? "")
                    setReason(data?.data?.reason)
                    data?.data?.mediaList?.forEach((data: {
                        thumbnailUrl: string,
                        mediaUrl: string
                    }) => {
                        handleImageAdd(data?.thumbnailUrl)
                    })
                }
            }
            catch (e: unknown) {
                if (e instanceof AxiosError && e.response) {
                    if (e?.response?.data?.error?.subErrorCode !== 1016) {
                        toast.error(e.response.data?.error?.subErrorMessage);
                        nav(configRouter.orderDetail.slice(0, -3) + id)
                    }
                }
            }
        }
        id && handleGetOrderRefundDetail()
    }, [id])

    const renderFileInputs = () => {
        return (
            <div className="flex my-4">
                {[...Array(files.length + 1)].map((_, index) => (
                    <div key={index} className="relative mr-2">
                        {index < files.length && files[index] ? (
                            <label
                                className={`w-20 h-20 rounded-md flex items-center justify-center bg-gray-200 cursor-pointer`}
                            >
                                {files[index]?.type?.split("/")[0] !== "video" && files[index] ? (
                                    <img
                                        src={URL.createObjectURL(files[index]! as File)}
                                        alt={files[index]?.name}
                                        className="w-20 h-20 object-cover rounded-md"
                                    />
                                ) : (
                                    <video
                                        src={URL.createObjectURL(files[index]! as File)}
                                        className="w-20 h-20 object-cover rounded-md"
                                    />
                                )}
                            </label>
                        ) : (
                            <>{(files.length + 1 <= 6 && !refund) && <label
                                htmlFor={`file-input-${index}`}
                                className={`w-20 h-20 rounded-md flex items-center justify-center bg-gray-200 cursor-pointer`}
                            >
                                <input
                                    type="file"
                                    accept="image/*,video/*"
                                    onChange={(event) => handleFileChange(index, event)}
                                    className="hidden"
                                    id={`file-input-${index}`}
                                />
                                <Camera className="text-gray-500" /><span className="text-gray-500">{files?.filter(prev => prev).length}/6</span>
                            </label>}</>
                        )}
                    </div>
                ))}
            </div>
        );
    };

    return (
        <div className="h-auto mt-20 mx-20">
            <div className="flex items-center">
                <button
                    onClick={handleRedirectOrders}
                    className="mr-3 cursor-pointer p-2 rounded-full hover:bg-gray-300"
                >
                    <ArrowLeft />
                </button>
                <h1 className="my-3 text-lg font-bold text-gray-700"> {t("Invoice")} </h1>
            </div>
            <div >
                <div className="bg-white rounded-lg shadow-base p-4">
                    {refund?.success &&
                        <>
                            <h2 className="text-lg font-bold mb-1">{t("Status")}: {refund?.data?.status}</h2>
                            <div className="my-2">
                                <label className="text-gray-700 mb-2">
                                    {refund?.data?.status === "PENDING" && "Your request is under consideration"}
                                    {refund?.data?.status === "ACCEPTED" && "Your request is accepted, coins or money will refund"}
                                    {refund?.data?.status === "REFUSED" && "Your request is refused"}
                                </label>
                            </div>
                        </>
                    }
                    <h2 className="text-lg font-bold mb-1">{t("What problem do you have with your item?")}</h2>
                    {renderReason()}
                    <div className="mb-4">
                        <label className="text-gray-700 font-bold mb-2">
                            {t("Upload an image or video")}
                        </label>
                        {renderFileInputs()}
                    </div>
                    <div className="mb-4 relative">
                        <label className="text-gray-700 font-bold mb-2">{t("Add comments (optional)")}</label>
                        <textarea value={text} className="w-full border border-gray-300 rounded-md mt-4 p-2" rows={3} maxLength={300} onChange={handleChange} />
                        <p className="text-gray-500 text-sm absolute right-0">{text.length}/300</p>
                    </div>
                    {!(refund?.success && refund?.data?.status) &&
                        <div className="col-span-6 sm:col-span-3 mt-5 text-right">
                            <button onClick={handleConfirm} type="submit" className="md:text-sm leading-5 inline-flex items-center cursor-pointer transition ease-in-out duration-300 font-medium text-center justify-center border-0 border-transparent rounded-md placeholder-white focus-visible:outline-none focus:outline-none bg-red-500 text-white px-5 md:px-6 lg:px-8 py-2 md:py-2 lg:py-2 hover:text-white hover:bg-red-600 h-12 mt-1 text-sm lg:text-sm w-full sm:w-auto">
                                {isLoading ? (
                                    <p className="flex items-center justify-center">
                                        <span className="mr-2">{t("Confirm")}</span>{" "}
                                        <Spinner className="h-4 w-4" />
                                    </p>
                                ) : (
                                    <span>{t("Confirm")}</span>
                                )}
                            </button>
                        </div>
                    }
                </div>
            </div>
        </div>
    );
};

export default RequireRefundOrder;