import ShowAddress from "@/components/PageComponents/UserPage/AddressDefault/ShowAddress"
import { useEffect, useState } from "react"
import {
    Button,
    Dialog,
    DialogHeader,
    DialogBody,
    DialogFooter,
    Spinner,
} from "@material-tailwind/react";
import useLoading from "@/hooks/useLoading";
import AddNewAddress from "@/components/PageComponents/UserPage/AddressDefault/AddNewAddress";
import * as userApi from "@/api/PageApi/userApi"
import { AxiosError } from "axios";
import { toast } from "react-toastify";
import { RootState } from "@/redux/store";
import { useSelector } from "react-redux";
import { BaseResponseApi, User } from "@/type";
import { messageToast } from "@/utils/hepler";
import { configRouter } from "@/configs/router";
import { useNavigate } from "react-router-dom";

export interface IShowAddressResponse extends BaseResponseApi {
    data: {
        id: string,
        detail: string,
        recipientName: string,
        phoneNumber: string,
        default: boolean
    }[]
}

export interface IAddNewAddress {
    longitude: number,
    latitude: number,
    note: string,
    recipientName: string,
    phoneNumber: string,
    province: string;
    district: string;
    ward: string;
    detail: string;
    id?: string;
    default?: boolean
}

function DefaultAddress() {
    const [open, setOpen] = useState<boolean>(false)
    const { isLoading, startLoading, stopLoading } = useLoading()
    const [newAddress, setNewAddress] = useState<IAddNewAddress>({
        province: "",
        district: "",
        ward: "",
        detail: "",
        longitude: 0,
        latitude: 0,
        note: "",
        recipientName: JSON.parse(localStorage?.getItem("profile") as string)?.firstName + " " + JSON.parse(localStorage?.getItem("profile") as string)?.lastName
        ,
        phoneNumber: JSON.parse(localStorage?.getItem("profile") as string) ? JSON.parse(localStorage?.getItem("profile") as string)?.phoneNumber : ""
    })
    const [addressEdit, setAddressEdit] = useState<string>("")
    const [addresss, setAddresss] = useState<IShowAddressResponse>()

    const useCurrentUser = useSelector<RootState, User>(
        (state) => state.authSlice.currentUser as User
    );
    const nav = useNavigate()

    const handleOpen = () => {
        setAddressEdit("")
        setOpen(prev => !prev)
        setNewAddress({
            province: "",
            district: "",
            ward: "",
            detail: "",
            longitude: 0,
            latitude: 0,
            note: "",
            recipientName: JSON.parse(localStorage?.getItem("profile") as string)?.firstName + " " + JSON.parse(localStorage?.getItem("profile") as string)?.lastName
            ,
            phoneNumber: JSON.parse(localStorage?.getItem("profile") as string) ? JSON.parse(localStorage?.getItem("profile") as string)?.phoneNumber : ""
        })
    }

    useEffect(() => {
        if (!useCurrentUser?.success && !useCurrentUser?.data?.userId || !useCurrentUser) {
            nav(configRouter.login)
            toast.warning("Please login to continue using website services!")
        }
        else {
            const getAddressDetail = async () => {
                const data = await userApi.getAddressDetail(addressEdit as string)
                if (data?.success) {
                    setNewAddress(data?.data)
                }
            }
            addressEdit && getAddressDetail()
        }
    }, [addressEdit])

    const handleAddNewAddress = async () => {
        try {
            if (newAddress?.province === "" || newAddress?.district === "" || newAddress?.ward === "" || newAddress?.detail.trim() === "" || newAddress?.phoneNumber?.trim() === "" || newAddress?.recipientName?.trim() === "") {
                toast.error(messageToast?.fillInput)
            }
            else {
                if (newAddress?.latitude !== 0 && newAddress?.longitude !== 0) {
                    startLoading()
                    let addressDetail: string = ""
                    if (newAddress?.id) {
                        addressDetail = newAddress?.detail
                    }
                    else {
                        addressDetail = newAddress?.detail + ", " + newAddress?.ward + ", " + newAddress?.district + ", " + newAddress?.province
                    }
                    if (!addressEdit) {
                        const data = await userApi.addAddressUser(useCurrentUser?.data?.userId, newAddress?.longitude, newAddress?.latitude, newAddress?.note, newAddress?.recipientName, newAddress?.phoneNumber, addressDetail)
                        if (data?.success) {
                            setNewAddress({
                                province: "",
                                district: "",
                                ward: "",
                                detail: "",
                                longitude: 0,
                                latitude: 0,
                                note: "",
                                recipientName: JSON.parse(localStorage?.getItem("profile") as string)?.firstName + " " + JSON.parse(localStorage?.getItem("profile") as string)?.lastName
                                ,
                                phoneNumber: JSON.parse(localStorage?.getItem("profile") as string) ? JSON.parse(localStorage?.getItem("profile") as string)?.phoneNumber : ""
                            })
                            getAllAddresUser()
                            toast.success(data?.message)
                            stopLoading()
                            setOpen(prev => !prev)
                            setAddressEdit("")
                        }
                    }
                    else {
                        console.log(newAddress)
                        const data = await userApi.updateAddressUser(newAddress?.id as string, newAddress?.longitude, newAddress?.latitude, newAddress?.note, newAddress?.recipientName, newAddress?.phoneNumber, addressDetail, newAddress?.default as boolean)
                        if (data?.success) {
                            setNewAddress({
                                province: "",
                                district: "",
                                ward: "",
                                detail: "",
                                longitude: 0,
                                latitude: 0,
                                note: "",
                                recipientName: JSON.parse(localStorage?.getItem("profile") as string)?.firstName + " " + JSON.parse(localStorage?.getItem("profile") as string)?.lastName
                                ,
                                phoneNumber: JSON.parse(localStorage?.getItem("profile") as string) ? JSON.parse(localStorage?.getItem("profile") as string)?.phoneNumber : ""
                            })
                            getAllAddresUser()
                            toast.success(data?.message)
                            stopLoading()
                            setOpen(prev => !prev)
                            setAddressEdit("")
                        }
                    }
                }
                else {
                    const API_KEY = "2tgHvZJswyFkLug62ynzpCrs8RlqMcmzFVtoUjEL";
                    const encodedAddress = encodeURIComponent(newAddress?.detail + ", " + newAddress?.ward + ", " + newAddress?.district + ", " + newAddress?.province);
                    const url = `https://rsapi.goong.io/Geocode?address=${encodedAddress}&api_key=${API_KEY}`;

                    try {
                        const response = await fetch(url);
                        const data = await response.json();
                        if (data?.results && data?.results?.length > 0) {
                            const location = data.results[0] && data.results[0].geometry && data.results[0].geometry.location;
                            if (location) {
                                const { lat, lng } = location;
                                setNewAddress((prevState: IAddNewAddress) => ({
                                    ...prevState,
                                    latitude: lat,
                                    longitude: lng
                                }));
                                startLoading()
                                const addressDetail: string = newAddress?.detail + (newAddress?.ward ? (", " + newAddress?.ward) : "") + (newAddress?.district ? (", " + newAddress?.district) : "") + (newAddress?.province ? (", " + newAddress?.province) : "")
                                if (!addressEdit) {
                                    const data = await userApi.addAddressUser(useCurrentUser?.data?.userId, lng, lat, newAddress?.note, newAddress?.recipientName, newAddress?.phoneNumber, addressDetail)
                                    if (data?.success) {
                                        setNewAddress({
                                            province: "",
                                            district: "",
                                            ward: "",
                                            detail: "",
                                            longitude: 0,
                                            latitude: 0,
                                            note: "",
                                            recipientName: JSON.parse(localStorage?.getItem("profile") as string)?.firstName + " " + JSON.parse(localStorage?.getItem("profile") as string)?.lastName
                                            ,
                                            phoneNumber: JSON.parse(localStorage?.getItem("profile") as string) ? JSON.parse(localStorage?.getItem("profile") as string)?.phoneNumber : ""
                                        })
                                        getAllAddresUser()
                                        toast.success(data?.message)
                                        stopLoading()
                                        setAddressEdit("")
                                        setOpen(prev => !prev)
                                    }
                                }
                                else {
                                    const data = await userApi.updateAddressUser(newAddress?.id as string, lng, lat, newAddress?.note, newAddress?.recipientName, newAddress?.phoneNumber, addressDetail, newAddress?.default as boolean)
                                    if (data?.success) {
                                        setNewAddress({
                                            province: "",
                                            district: "",
                                            ward: "",
                                            detail: "",
                                            longitude: 0,
                                            latitude: 0,
                                            note: "",
                                            recipientName: JSON.parse(localStorage?.getItem("profile") as string)?.firstName + " " + JSON.parse(localStorage?.getItem("profile") as string)?.lastName
                                            ,
                                            phoneNumber: JSON.parse(localStorage?.getItem("profile") as string) ? JSON.parse(localStorage?.getItem("profile") as string)?.phoneNumber : ""
                                        })
                                        getAllAddresUser()
                                        toast.success(data?.message)
                                        stopLoading()
                                        setAddressEdit("")
                                        setOpen(prev => !prev)
                                    }
                                }
                            } else {
                                console.log("Location not found in response");
                            }
                        } else {
                            console.log("Address not found");
                        }
                    } catch (error) {
                        console.error("Error geocoding:", error);
                    }
                }
            }
        }
        catch (e: unknown) {
            if (e instanceof AxiosError && e.response) {
                stopLoading()
                toast.error(e?.response?.data?.message);
            }
        }
    }

    const getAllAddresUser = async () => {
        const data = await userApi.getAllAddresUser(useCurrentUser?.data?.userId)
        if (data?.success) {
            setAddresss(data)
        }
    }

    return (
        <div className="bg-white h-auto w-3/4 border border-gray-50 shadow-base rounded-md p-3">
            <div className="flex items-center justify-between py-1 border-b">
                <h2 className="text-xl font-semibold mb-5">My Address</h2>
                <button onClick={handleOpen} className="flex items-center px-3 py-2 bg-btnActive text-white rounded-lg">+ Add Address</button>
            </div>
            <ShowAddress setAddressEdit={setAddressEdit} setOpen={setOpen} addresss={addresss} setAddresss={setAddresss} getAllAddresUser={getAllAddresUser} />
            <Dialog size="md" placeholder="" open={open} handler={handleOpen}>
                <DialogHeader placeholder="">{addressEdit ? "Edit" : "Add"} Address</DialogHeader>
                <DialogBody className="p-0" placeholder="">
                    <AddNewAddress newAddress={newAddress} setNewAddress={setNewAddress} />
                </DialogBody>
                <DialogFooter placeholder="">
                    <Button
                        placeholder=""
                        variant="text"
                        color="red"
                        onClick={handleOpen}
                        className="mr-1"
                    >
                        <span>Cancel</span>
                    </Button>
                    <Button placeholder="" variant="gradient" color="green"
                        onClick={handleAddNewAddress}
                    >
                        {isLoading ? (
                            <p className="flex items-center justify-center">
                                <span className="mr-2">
                                    Confirm
                                </span>{" "}
                                <Spinner className="h-4 w-4" />
                            </p>
                        ) : (
                            <span>Confirm</span>
                        )}
                    </Button>
                </DialogFooter>
            </Dialog>
        </div>
    )
}

export default DefaultAddress