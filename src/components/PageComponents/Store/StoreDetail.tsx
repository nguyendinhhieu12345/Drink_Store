import { Typography } from "@material-tailwind/react"
import { NavigationArrow, Phone, Share } from "@phosphor-icons/react"
import { useEffect, useState } from "react";
import ShareStore from "./ShareStore";
import * as storeApi from "@/api/PageApi/StoreApi"
import { useTranslation } from "react-i18next";

interface IStoreDetail {
    storeDetail: string
}

export interface IBranchDetail {
    id: string,
    imageUrl: string,
    name: string,
    fullAddress: string,
    longitude: number,
    latitude: number,
    phoneNumber: string,
    openTime: string,
    closeTime: string
}

function StoreDetail(props: IStoreDetail) {
    const [openShare, setOpenShare] = useState<boolean>(false)
    const [storeDetail, setStoreDetail] = useState<IBranchDetail>()
    const { t } = useTranslation();

    const handleRedirectAddress = (address: string) => {
        const mapsUrl = `https://www.google.com/maps?q=${encodeURIComponent(address)}`;
        window.open(mapsUrl);
    };

    const handleRedirectPhone = (phone: string) => {
        window.open(`tel:${phone}`);
    };

    useEffect(() => {
        const getStoreDetail = async () => {
            const data = await storeApi?.getStoreDetail(props?.storeDetail)
            if (data?.success) {
                setStoreDetail(data?.data)
            }
        }
        getStoreDetail()
    }, [props?.storeDetail])

    return (
        <div>
            <div className="border-b">
                <img src={storeDetail?.imageUrl} alt="store image" className="rounded-lg w-full max-h-56 object-cover" />
                <Typography className="text-center my-3" placeholder="" variant="h4" color="blue-gray">
                    {t("Store")} {storeDetail?.name}
                </Typography>
                <Typography
                    placeholder=""
                    className="text-center mb-3 font-normal"
                    variant="paragraph"
                    color="gray"
                >
                    {t("Open")}: {storeDetail?.openTime} - {storeDetail?.closeTime}
                </Typography>
            </div>
            <div>
                <div className="flex items-center w-full">
                    <NavigationArrow size={25} className="bg-gray-300 rounded-lg font-semibold w-7 h-7 p-1" />
                    <p onClick={() => handleRedirectAddress(storeDetail?.fullAddress as string)} className="cursor-pointer border-b w-full ml-2 py-4 text-base break-all">{storeDetail?.fullAddress}</p>
                </div>
                <div className="flex items-center w-full">
                    <Phone size={25} className="bg-gray-300 rounded-lg font-semibold w-7 h-7 p-1" />
                    <p onClick={() => handleRedirectPhone(storeDetail?.phoneNumber as string)} className="cursor-pointer border-b w-full ml-2 py-4 text-base">{storeDetail?.phoneNumber}</p>
                </div>
                <div className="flex items-center w-full">
                    <Share size={25} className="bg-gray-300 rounded-lg font-semibold w-7 h-7 p-1" />
                    <p onClick={() => setOpenShare(prev => !prev)} className="cursor-pointer border-b w-full ml-2 py-4 text-base">{t("Share with your friend")}</p>
                </div>
                {openShare &&
                    <ShareStore url={storeDetail?.fullAddress as string} />}
            </div>
        </div>
    )
}

export default StoreDetail