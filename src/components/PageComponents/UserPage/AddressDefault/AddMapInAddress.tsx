import { ChangeEvent, useEffect, useState } from "react";
import * as userApi from "@/api/PageApi/userApi"
import { IAddNewAddress } from "@/pages/CustomerPage/UserPage/DefaultAddress";
import Map from "@/components/Map/Map";

interface IProvince {
    province_id: string;
    province_name: string;
    province_type: string;
}

interface IDistrict {
    district_id: string;
    district_name: string;
    district_type: string;
    lat: number | null;
    lng: number | null;
    province_id: string;
}

interface IWard {
    district_id: string;
    ward_id: string;
    ward_name: string;
    ward_type: string;
}

export interface IAddMapInAddress {
    newAddress: IAddNewAddress,
    setNewAddress: React.Dispatch<React.SetStateAction<IAddNewAddress>>
}

function AddMapInAddress(props: IAddMapInAddress) {
    const [province, setProvince] = useState<IProvince[]>([]);
    const [district, setDistrict] = useState<IDistrict[]>([]);
    const [ward, setWard] = useState<IWard[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [open, setOpen] = useState<boolean>(false);

    const getAllProvince = async () => {
        const data = await userApi.getAllProvince();
        setProvince(data?.data?.results);
    };

    const getAllDistrict = async (province_id: string) => {
        const data = await userApi.getAllDistrict(province_id);
        setDistrict(data?.data?.results);
    };

    const getAllWard = async (district_id: string) => {
        const data = await userApi.getAllWard(district_id);
        setWard(data?.data?.results);
    };

    const handleChangeProvinces = (event: ChangeEvent<HTMLSelectElement>) => {
        props?.setNewAddress((prevState: IAddNewAddress) => ({
            ...prevState,
            ["province"]: event.target.value.split(",")[1],
            latitude: 0,
            longitude: 0
        }));
        getAllDistrict(event.target.value.split(",")[0]);
    };

    const handleChangeDistrict = (event: ChangeEvent<HTMLSelectElement>) => {
        props?.setNewAddress((prevState: IAddNewAddress) => ({
            ...prevState,
            ["district"]: event.target.value.split(",")[1],
            latitude: 0,
            longitude: 0
        }));
        getAllWard(event.target.value.split(",")[0]);
    };

    const handleChangeWard = (event: ChangeEvent<HTMLSelectElement>) => {
        props?.setNewAddress((prevState: IAddNewAddress) => ({
            ...prevState,
            ["ward"]: event.target.value.split(",")[1],
            latitude: 0,
            longitude: 0
        }));
    };

    useEffect(() => {
        getAllProvince();
    }, []);

    const handleShowMap = async () => {
        setOpen(prev => !prev)
        const API_KEY = "2tgHvZJswyFkLug62ynzpCrs8RlqMcmzFVtoUjEL";
        const encodedAddress = encodeURIComponent(props?.newAddress?.detail + ", " + props?.newAddress?.ward + ", " + props?.newAddress?.district + ", " + props?.newAddress?.province);
        const url = `https://rsapi.goong.io/Geocode?address=${encodedAddress}&api_key=${API_KEY}`;

        try {
            const response = await fetch(url);
            const data = await response.json();
            if (data?.results && data?.results?.length > 0) {
                const location = data.results[0] && data.results[0].geometry && data.results[0].geometry.location;
                if (location) {
                    const { lat, lng } = location;
                    props?.setNewAddress((prevState: IAddNewAddress) => ({
                        ...prevState,
                        latitude: lat,
                        longitude: lng
                    }));
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

    return (
        <div className="bg-white rounded-lg mt-1 flex flex-col w-full h-auto justify-between overflow-y-auto">
            <div className="flex-grow scrollbar-hide w-full max-h-full">
                {/* Input Province */}
                <div className="grid grid-cols-8 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-2">
                    <label className="block text-gray-800 col-span-4 sm:col-span-2 font-medium text-sm">
                        Province
                    </label>
                    <div className="col-span-8 sm:col-span-6">
                        <select
                            className="mt-3 rounded-md w-full border-slate-400 hover:border-slate-900 focus:border-sky-600"
                            onChange={(e) => handleChangeProvinces(e)}
                            defaultValue={"Choose province"}
                        >
                            <option disabled>
                                Choose province
                            </option>
                            {province?.map((dt) => (
                                <option
                                    key={dt?.province_id}
                                    value={[dt.province_id, dt.province_name]}
                                >
                                    {dt?.province_name}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                {/* Input District */}
                <div className="grid grid-cols-8 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-2">
                    <label className="block text-gray-800  col-span-4 sm:col-span-2 font-medium text-sm">
                        District
                    </label>
                    <div className="col-span-8 sm:col-span-6">
                        <select
                            className="mt-3 rounded-md w-full border-slate-400 hover:border-slate-900 focus:border-sky-600"
                            onChange={(e) => handleChangeDistrict(e)}
                            defaultValue={"Choose district"}
                        >
                            <option disabled>
                                Choose district
                            </option>
                            {district?.map((dt, index) => (
                                <option
                                    key={index}
                                    value={[dt?.district_id, dt?.district_name]}
                                >
                                    {dt?.district_name}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                {/* Input Ward */}
                <div className="grid grid-cols-8 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-2">
                    <label className="block text-gray-800  col-span-4 sm:col-span-2 font-medium text-sm">
                        Ward
                    </label>
                    <div className="col-span-8 sm:col-span-6">
                        <select
                            className="mt-3 rounded-md w-full border-slate-400 hover:border-slate-900 focus:border-sky-600"
                            onChange={(e) => handleChangeWard(e)}
                            defaultValue={"Choose ward"}
                        >
                            <option disabled>
                                Choose ward
                            </option>
                            {ward?.map((dt, index) => (
                                <option key={index} value={[dt?.ward_id, dt?.ward_name]}>
                                    {dt?.ward_name}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                {/* Input Village */}
                <div className="grid grid-cols-8 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mt-4">
                    <label className="block text-gray-800  col-span-4 sm:col-span-2 font-medium text-sm">
                        No.
                    </label>
                    <div className="col-span-8 sm:col-span-6">
                        <input
                            className="block w-full h-12 border px-3 py-1 text-sm focus:outline-none leading-5 rounded-md bg-gray-100 focus:bg-white focus:border-gray-200 border-gray-200 p-2"
                            name="Village"
                            placeholder="No."
                            value={props?.newAddress?.detail}
                            onChange={(e) => props?.setNewAddress((prev: IAddNewAddress) => ({
                                ...prev,
                                detail: e.target.value.trim()
                            }))}
                        />
                    </div>
                </div>
            </div>
            <div className="flex flex-col justify-center items-center">
                <button onClick={handleShowMap} className="my-4 w-full rounded-lg flex justify-center text-white px-4 py-2 font-medium items-center gap-3 bg-select active:bg-select focus:bg-select visited:bg-select hover:bg-select">
                    Choose Map
                </button>
                {open && <Map latitude={props?.newAddress?.latitude} longitude={props?.newAddress?.longitude} setNewAddress={props?.setNewAddress} />}
                {error && (
                    <div className="my-4 text-center italic text-red-500 text-sm"></div>
                )}
            </div>
        </div>
    )
}

export default AddMapInAddress