import { Typography } from "@material-tailwind/react"
import { NavigationArrow, Phone, Share } from "@phosphor-icons/react"
import { useState } from "react";
import ShareStore from "./ShareStore";

function StoreDetail() {
    const [openShare, setOpenShare] = useState<boolean>(false)

    const handleRedirectAddress = (address: string) => {
        const mapsUrl = `https://www.google.com/maps?q=${encodeURIComponent(address)}`;
        window.open(mapsUrl);
    };

    const handleRedirectPhone = (phone: string) => {
        window.open(`tel:${phone}`);
    };

    return (
        <div>
            <div className="border-b">
                <img src="https://minio.thecoffeehouse.com/image/admin/42125551_2192693434338004_6795198411906744320_n_191298.jpeg" alt="store image" className="rounded-lg w-full max-h-56 object-cover" />
                <Typography className="text-center my-3" placeholder="" variant="h4" color="blue-gray">
                    Store Vo Van Ngan
                </Typography>
                <Typography
                    placeholder=""
                    className="text-center mb-3 font-normal"
                    variant="paragraph"
                    color="gray"
                >
                    Open: 07:00AM - 07:00PM
                </Typography>
            </div>
            <div>
                <div className="flex items-center w-full">
                    <NavigationArrow size={25} className="bg-gray-300 rounded-lg font-semibold w-7 h-7 p-1" />
                    <p onClick={() => handleRedirectAddress("No.1, Vo Van Ngan, Tp. Thu Duc")} className="cursor-pointer border-b w-full ml-2 py-4 text-base break-all">No.1, Vo Van Ngan, Tp. Thu Duc</p>
                </div>
                <div className="flex items-center w-full">
                    <Phone size={25} className="bg-gray-300 rounded-lg font-semibold w-7 h-7 p-1" />
                    <p onClick={() => handleRedirectPhone("0123456789")} className="cursor-pointer border-b w-full ml-2 py-4 text-base">0123456789</p>
                </div>
                <div className="flex items-center w-full">
                    <Share size={25} className="bg-gray-300 rounded-lg font-semibold w-7 h-7 p-1" />
                    <p onClick={() => setOpenShare(prev => !prev)} className="cursor-pointer border-b w-full ml-2 py-4 text-base">Share with your friend</p>
                </div>
                {openShare &&
                    <ShareStore url="No.1, Vo Van Ngan, Tp. Thu Duc" />}
            </div>
        </div>
    )
}

export default StoreDetail