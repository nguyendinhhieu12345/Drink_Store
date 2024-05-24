import assets from "@/assets"
import { Menu, MenuHandler, MenuItem, MenuList, Radio, Spinner } from "@material-tailwind/react"
import { useEffect, useState } from "react"
import * as userApi from "@/api/PageApi/userApi"
import { IAddNewAddress, IShowAddressResponse } from "@/pages/CustomerPage/UserPage/DefaultAddress"
import { useSelector } from "react-redux"
import { RootState } from "@/redux/store"
import { BaseResponseApi, User } from "@/type"
import { ICheckout, IPropsCheckout } from "./CheckoutDetail"
import * as checkoutApi from "@/api/PageApi/checkoutApi"
import * as addressApi from "@/api/PageApi/userApi"
import { AxiosError } from "axios"
import {
    Button,
    Dialog,
    DialogHeader,
    DialogBody,
    DialogFooter,
} from "@material-tailwind/react";
import AddNewAddress from "../UserPage/AddressDefault/AddNewAddress"
import useLoading from "@/hooks/useLoading"
import { toast } from "react-toastify"
import { getCurrentDateTime, messageToast } from "@/utils/hepler"
import { Cart } from "@/features/cart/cartSlice"

interface IBranchNearest extends BaseResponseApi {
    data: {
        id: string,
        name: string,
        openTime: string,
        closeTime: string,
        fullAddress: string
    }
}

function AddAddress(props: IPropsCheckout) {
    const [addresss, setAddresss] = useState<IShowAddressResponse>()
    const [error, setError] = useState<string>("")
    const [isAddAddress, setIsAddAddress] = useState<boolean>(false)
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
    const [allBranch, setAllBranch] = useState<IBranchNearest>()

    const useCurrentUser = useSelector<RootState, User>(
        (state) => state.authSlice.currentUser as User
    );

    const cartCurrent = useSelector<RootState, Cart[]>(
        (state) => state?.cartSlice?.cartCurrent as Cart[]
    )

    const handleOpen = () => {
        setOpen(prev => !prev)
        props?.setDataCheckout((prev: ICheckout | undefined) => (
            {
                ...prev!,
                addressId: addresss?.data?.filter((add: {
                    id: string,
                    detail: string,
                    recipientName: string,
                    phoneNumber: string,
                    default: boolean
                }) => add.default == true)[0]?.id ?? ""
            }
        ))
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

    const getAllAddresUser = async () => {
        const data = await userApi.getAllAddresUser(useCurrentUser?.data?.userId)
        if (data?.success) {
            setAddresss(data)
            props?.setDataCheckout((prev: ICheckout | undefined) => (
                {
                    ...prev!,
                    addressId: data?.data?.filter((add: {
                        id: string,
                        detail: string,
                        recipientName: string,
                        phoneNumber: string,
                        default: boolean
                    }) => add.default == true)[0]?.id ?? "",
                    userId: useCurrentUser?.data?.userId,
                    paymentType: "CASHING",
                    shippingFee: 0,
                    note: "",
                    coin: 0
                }
            ))
            const address = await addressApi?.getAddressDetail(data?.data?.filter((add: {
                id: string,
                detail: string,
                recipientName: string,
                phoneNumber: string,
                default: boolean
            }) => add.default == true)[0]?.id)
            if (address?.success) {
                try {
                    startLoading()
                    const shipping = await checkoutApi.getShippingFee(cartCurrent.map(item => {
                        const { productId, itemDetailList } = item;
                        return {
                            productId,
                            itemDetailList: itemDetailList.map(detail => {
                                const { quantity, toppingNameList, size, note } = detail;
                                if (size) {
                                    return {
                                        quantity,
                                        toppingNameList,
                                        size,
                                        note
                                    };
                                }
                                else {
                                    return {
                                        quantity,
                                        note
                                    };
                                }
                            })
                        }
                    }) as Cart[], address?.data?.longitude ?? 0, address?.data?.latitude ?? 0)
                    if (shipping?.success) {
                        setError("")
                        stopLoading()
                        props?.setDataCheckout((prev: ICheckout | undefined) => (
                            {
                                ...prev!,
                                shippingFee: shipping?.data?.branchValid?.shippingFee,
                                total: cartCurrent.reduce((total, item) => {
                                    return total + (item?.itemDetailList ?? []).reduce((subtotal, item) => {
                                        return subtotal + (item?.price ?? 0);
                                    }, 0);
                                }, 0) + (shipping?.data?.branchValid?.shippingFee ?? 0)
                            }
                        ))
                    }
                }
                catch (e: unknown) {
                    if (e instanceof AxiosError && e.response) {
                        stopLoading()
                        // nav(configRouter.home);
                        setError(e?.response?.data?.devResponse?.message)
                        console.log(e?.response?.data?.devResponse?.message)
                        // toast.error("Product not found with id: " + id);
                    }
                }
            }
        }
    }

    const handleConfirm = async () => {
        if (isAddAddress) {
            try {
                if (newAddress?.province === "" || newAddress?.district === "" || newAddress?.ward === "" || newAddress?.detail.trim() === "" || newAddress?.phoneNumber?.trim() === "" || newAddress?.recipientName?.trim() === "") {
                    toast.error(messageToast?.fillInput)
                }
                else {
                    if (newAddress?.latitude !== 0 && newAddress?.longitude !== 0) {
                        startLoading()
                        let addressDetail: string = ""
                        if (newAddress?.detail === newAddress?.district) {
                            addressDetail = newAddress?.detail
                        }
                        else {
                            addressDetail = newAddress?.detail + ", " + newAddress?.ward + ", " + newAddress?.district + ", " + newAddress?.province
                        }
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
                            stopLoading()
                            setIsAddAddress(false)
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
                                        stopLoading()
                                        setIsAddAddress(false)
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
        else {
            startLoading()
            const address = await addressApi?.getAddressDetail(props?.dataCheckout?.addressId as string)
            if (address?.success) {
                try {
                    const shipping = await checkoutApi.getShippingFee(props?.dataCheckout?.itemList as Cart[], address?.data?.longitude ?? 0, address?.data?.latitude ?? 0)
                    if (shipping?.success) {
                        setError("")
                        stopLoading()
                        props?.setDataCheckout((prev: ICheckout | undefined) => (
                            {
                                ...prev!,
                                shippingFee: shipping?.data?.branchValid?.shippingFee,
                                total: ((prev?.total as number) - (prev?.shippingFee as number)) + shipping?.data?.branchValid?.shippingFee
                            }
                        ))
                    }
                }
                catch (e: unknown) {
                    if (e instanceof AxiosError && e.response) {
                        stopLoading()
                        // nav(configRouter.home);
                        setError(e?.response?.data?.devResponse?.message)
                        console.log(e?.response?.data?.devResponse?.message)
                        // toast.error("Product not found with id: " + id);
                    }
                }
            }
            setOpen(prev => !prev)
        }
    }

    const handleAddAddress = (addressId: string) => {
        props?.setDataCheckout((prev: ICheckout | undefined) => (
            {
                ...prev!,
                addressId: addressId
            }
        ))
    }

    const handleAddTakeAway = async () => {
        props?.setDataCheckout((prev: ICheckout | undefined) => (
            {
                ...prev!,
                type: "Take Away",
                recipientName: JSON.parse(localStorage?.getItem("profile") as string)?.firstName + " " + JSON.parse(localStorage?.getItem("profile") as string)?.lastName,
                phoneNumber: JSON.parse(localStorage?.getItem("profile") as string)?.phoneNumber,
                shippingFee: 0,
                total: (prev?.total as number) - (prev?.shippingFee as number),
                receiveTime: getCurrentDateTime()
            }
        ))
    }

    useEffect(() => {
        getAllAddresUser()
    }, [])

    return (
        <div className="border shadow-base rounded-md p-3">
            <div className="flex items-center justify-between">
                <p className="font-semibold text-lg mb-2">Add Address</p>
                <Menu>
                    <MenuHandler>
                        <button className="px-3 py-1.5 hover:bg-gray-50 border rounded-xl">{props?.dataCheckout?.type}</button>
                    </MenuHandler>
                    <MenuList placeholder="">
                        <MenuItem placeholder="" onClick={() => {
                            props?.setDataCheckout((prev: ICheckout | undefined) => (
                                {
                                    ...prev!,
                                    type: "Home Delivery"
                                }
                            ))
                            getAllAddresUser()
                        }}>Home Delivery</MenuItem>
                        <MenuItem placeholder="" onClick={() => handleAddTakeAway()}>Take Away</MenuItem>
                    </MenuList>
                </Menu>
            </div>
            {
                props?.dataCheckout?.type === "Home Delivery" ?
                    <div className="flex items-center my-2">
                        <div className="flex items-center">
                            <img src={assets.images.delivery} alt="delivery" className="w-7 h-7 object-contain mr-2" />
                            <div className="ml-2">
                                <p className="font-semibold text-default">{addresss?.data?.filter((add) => add.id == props?.dataCheckout?.addressId)[0]?.recipientName} | {addresss?.data?.filter((add) => add.id == props?.dataCheckout?.addressId)[0]?.phoneNumber}</p>
                                <p>{addresss?.data?.filter((add) => add.id == props?.dataCheckout?.addressId)[0]?.detail}</p>
                            </div>
                        </div>
                        <button onClick={() => setOpen(prev => !prev)} className="px-4 py-2 bg-btnActive text-white rounded-lg">Change</button>
                    </div>
                    :
                    <div>
                        <div className="flex items-center">
                            <p>Time Receive: </p>
                            <input
                                className="ml-5 block h-10 border px-3 py-1 text-sm rounded-md  focus:bg-white border-gray-600"
                                type="datetime-local"
                                placeholder="Time start"
                                value={props?.dataCheckout?.receiveTime}
                                min={getCurrentDateTime()}
                                onChange={(e) => {
                                    props?.setDataCheckout((prev: ICheckout | undefined) => (
                                        {
                                            ...prev!,
                                            receiveTime: e.target.value
                                        }
                                    ))
                                    if (navigator.geolocation) {
                                        navigator.geolocation.getCurrentPosition(async (position) => {
                                            try {
                                                const data = await checkoutApi.getBranchNearest(position.coords.latitude, position.coords.longitude, new Date(e.target.value).toLocaleTimeString(undefined, { hour12: false }))
                                                if (data?.success) {
                                                    setAllBranch(data)
                                                    props?.setDataCheckout((prev: ICheckout | undefined) => (
                                                        {
                                                            ...prev!,
                                                            branchId: data?.data?.id
                                                        }
                                                    ))
                                                    setError("")
                                                }
                                            }
                                            catch (e: unknown) {
                                                if (e instanceof AxiosError && e.response) {
                                                    setError(e?.response?.data?.devResponse?.message)
                                                }
                                            }
                                        });
                                    } else {
                                        toast.error("Geolocation is not supported by this browser.");
                                    }
                                }
                                }
                            />
                        </div>
                        <div className="flex items-center my-5">
                            <p>Recipient Name: </p>
                            <input
                                className="ml-5 block h-10 border px-3 py-1 text-sm rounded-md  focus:bg-white border-gray-600"
                                type="text"
                                placeholder="Recipient Name"
                                value={props?.dataCheckout?.recipientName}
                                onChange={e => props?.setDataCheckout((prev: ICheckout | undefined) => (
                                    {
                                        ...prev!,
                                        recipientName: e.target.value,
                                    }
                                ))}
                            />
                        </div>
                        <div className="flex items-center">
                            <p>Phone Number: </p>
                            <input
                                className="ml-5 block h-10 border px-3 py-1 text-sm rounded-md  focus:bg-white border-gray-600"
                                type="text"
                                placeholder="Phone Number"
                                value={props?.dataCheckout?.phoneNumber}
                                onChange={e => props?.setDataCheckout((prev: ICheckout | undefined) => (
                                    {
                                        ...prev!,
                                        phoneNumber: e.target.value,
                                    }
                                ))}
                            />
                        </div>
                        <div className="flex items-center my-5">
                            <p>Branch Receive: </p>
                            <p className="ml-2">{allBranch?.data?.fullAddress}</p>
                        </div>
                    </div>
            }
            {error && <p className="text-sm italic text-red-500">{error}</p>}
            <Dialog size="md" placeholder="" open={open} handler={handleOpen}>
                <DialogHeader placeholder="">{isAddAddress ? "Add Address" : "Add Coupon"}</DialogHeader>
                <DialogBody className="p-0" placeholder="">
                    {!isAddAddress ?
                        <div>
                            <div>
                                {addresss?.data?.map((add) => (
                                    <div className="flex w-full" key={add?.id}>
                                        <Radio name="shipping" crossOrigin="true" defaultChecked={add?.id === props?.dataCheckout?.addressId ? true : false} onChange={() => handleAddAddress(add?.id)} />
                                        <div className="ml-2">
                                            <p className="font-semibold text-default">{add?.recipientName} | {add?.phoneNumber}</p>
                                            <p>{add?.detail}</p>
                                        </div>
                                    </div>
                                ))}
                                {addresss?.data?.length === 0 && <p>No address display</p>}
                            </div>
                            <div className="px-2 mt-4">
                                <button onClick={() => setIsAddAddress(prev => !prev)} className="flex items-center px-3 py-2 bg-btnActive text-white rounded-lg">+ Add Address</button>
                            </div>
                        </div>
                        :
                        <AddNewAddress newAddress={newAddress} setNewAddress={setNewAddress} />
                    }
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
                        onClick={handleConfirm}
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
        </div >
    )
}

export default AddAddress