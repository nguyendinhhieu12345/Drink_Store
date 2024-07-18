import Search from "@/components/SVG/Search";
import { MapTrifold, Storefront } from "@phosphor-icons/react";
import Map from "@/components/Map/Map";
import { useEffect, useState } from "react";
import {
    Button,
    Dialog,
    Card,
    CardBody,
    CardFooter,
} from "@material-tailwind/react";
import StoreDetail from "@/components/PageComponents/Store/StoreDetail";
import { useNavigate } from "react-router-dom";
import { configRouter } from "@/configs/router";
import { BaseResponseApi } from "@/type";
import * as storeApi from "@/api/PageApi/StoreApi"
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";

export interface IBranchList {
    id: string,
    imageUrl: string,
    name: string,
    fullAddress: string,
    longitude: number,
    latitude: number,
    distance: string,
    openTime: string,
    closeTime: string
}

interface IResponseStore extends BaseResponseApi {
    data: {
        branchList: IBranchList[]
    }
}

function Store() {
    const [openMap, setOpenMap] = useState<boolean>(false);
    const [address, setAddress] = useState("");
    const [latitude, setLatitude] = useState<number>(0);
    const [longitude, setLongitude] = useState<number>(0);
    const [error, setError] = useState<string | null>(null);
    const [open, setOpen] = useState<boolean>(false);
    const nav = useNavigate()
    const [stores, setStores] = useState<IResponseStore>()
    const [storeId, setStoreId] = useState<string>("")
    const [currentPosition, setCurrentPosition] = useState<{
        lat: number,
        lng: number
    }>({
        lat: 0,
        lng: 0
    })
    const { t } = useTranslation();

    const handleOpen = () => setOpen((cur) => !cur);
    const handleRedirectProduct = () => {
        setOpen((cur) => !cur)
        nav(configRouter?.searchProduct)
    }

    const handleGetGeocode = async (
        event: React.KeyboardEvent<HTMLInputElement>
    ) => {
        if (event.key === "Enter") {
            if (openMap) {
                const API_KEY = "2tgHvZJswyFkLug62ynzpCrs8RlqMcmzFVtoUjEL";
                const encodedAddress = encodeURIComponent(address);
                const url = `https://rsapi.goong.io/Geocode?address=${encodedAddress}&api_key=${API_KEY}`;

                try {
                    const response = await fetch(url);
                    const data = await response.json();
                    if (data?.results && data?.results?.length > 0) {
                        const location = data.results[0] && data.results[0].geometry && data.results[0].geometry.location;
                        if (location) {
                            const { lat, lng } = location;
                            setLatitude(lat);
                            setLongitude(lng);
                            setError(null);
                        } else {
                            setError("Location not found in response");
                        }
                    } else {
                        setError("Address not found");
                    }
                } catch (error) {
                    console.error("Error geocoding:", error);
                    setError("Error geocoding");
                }
            }
            else {
                getAllStore(currentPosition?.lat, currentPosition?.lng, address)
            }
        }
    };

    const getCurrentPosition = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                // console.log(position.coords)
                // 10.849768058664578,106.77279001374357
                setCurrentPosition({
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                })
                getAllStore(position.coords.latitude, position.coords.longitude, "")
            });
        } else {
            toast.error("Geolocation is not supported by this browser.");
        }
    }

    const getAllStore = async (lat: number, long: number, key: string) => {
        const data = await storeApi.getStores(lat, long, key)
        if (data?.success) {
            setStores(data)
        }
    }

    useEffect(() => {
        getCurrentPosition()
    }, [])

    const handleOpenMap = () => {
        if (openMap) {
            setOpenMap(false);
        } else {
            setOpenMap(true);
        }
    };

    return (
        <div className="h-auto mt-20 mx-2 sm:mx-10 bg-white flex flex-col items-center justify-center">
            <div className="flex items-center justify-center my-5">
                <Storefront
                    className="mr-3 p-2 rounded-full bg-yellow-300 text-white"
                    size={35}
                />
                <h1 className="font-medium">{t("Shopfee System")}</h1>
            </div>
            <div className="flex justify-around items-center">
                <div>
                    <label
                        htmlFor="search"
                        className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white w-96"
                    >
                        {t("Search")}
                    </label>
                    <div className="relative w-full sm:w-[400px]">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3  cursor-pointer z-999999">
                            <Search />
                        </div>
                        <input
                            type="text"
                            className="block w-full h-11 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 "
                            placeholder={t("Enter store name")}
                            onChange={(e) => setAddress(e.target.value)}
                            onKeyDown={(e) => handleGetGeocode(e)}
                        />
                    </div>
                </div>
                <div className="ml-3 my-6">
                    <button
                        className="rounded-lg hover:bg-btnDisable hover:p-1.5 p-1.5"
                        onClick={handleOpenMap}
                    >
                        <MapTrifold size={30} />
                    </button>
                </div>
            </div>
            {openMap && <Map latitude={latitude} longitude={longitude} getAllStore={getAllStore} />}
            {error && (
                <div className="text-center italic text-red-500 text-sm">{error}</div>
            )}
            <div className="my-6 text-left w-full">
                <div className="text-left px-4 font-semibold text-xl">
                    {t("Found")} {stores?.data?.branchList?.length} {t("stores")}
                </div>
                <div className="grid grid-cols-1 gap-1 lg:grid-cols-2 lg:gap-2 w-full justify-start">
                    {stores?.data?.branchList?.map((store, index) => (
                        <button
                            onClick={() => {
                                setOpen(prev => !prev)
                                setStoreId(store?.id)
                            }}
                            key={index}
                            className="w-full flex items-center my-3 sm:mx-3 rounded-lg shadow-xl border border-gray-200 px-5 py-2"
                        >
                            <img
                                src={store?.imageUrl}
                                alt="store"
                                className="w-25 h-25 rounded-lg object-contain"
                            />
                            <div className="flex flex-col items-start justify-center ml-5">
                                <p className="font-semibold">{store?.name}</p>
                                <p className="break-all text-start">{store?.fullAddress}</p>
                                <p className="break-all text-start">{t("Away")}: {store?.distance}</p>
                            </div>
                        </button>
                    ))}
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
                        <StoreDetail storeDetail={storeId} />
                    </CardBody>
                    <CardFooter placeholder="" className="pt-0">
                        <Button placeholder="" variant="gradient" onClick={handleRedirectProduct} fullWidth>
                            {t("ORDER PRODUCT")}
                        </Button>
                    </CardFooter>
                </Card>
            </Dialog>
        </div>
    );
}

export default Store;
