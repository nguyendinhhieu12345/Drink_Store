import { IAddNewAddress } from "@/pages/CustomerPage/UserPage/DefaultAddress"
import AddMapInAddress, { IAddMapInAddress } from "./AddMapInAddress"
import { Switch } from "@material-tailwind/react"

function AddNewAddress(props: IAddMapInAddress) {
    return (
        <div className="overflow-y-auto w-full max-h-[32rem]">
            <div className="px-6 flex-grow overflow-y-hidden w-full max-h-full pb-5">
                {/* Address Name */}
                <div className="grid p-1 grid-cols-8 gap-6 md:gap-2 xl:gap-6 lg:gap-6 mb-2">
                    <label className="block text-gray-800 col-span-2 sm:col-span-2 font-medium text-sm">
                        Consignee Name
                    </label>
                    <div className="col-span-8 sm:col-span-6">
                        <input
                            className="block w-full h-12 border px-3 py-1 text-sm focus:outline-none leading-5 rounded-md bg-gray-100 focus:bg-white focus:border-gray-200 border-gray-200 p-2"
                            type="text"
                            placeholder="Enter name..."
                            value={props?.newAddress?.recipientName}
                            onChange={(e) => props?.setNewAddress((prev: IAddNewAddress) => ({
                                ...prev,
                                recipientName: e.target.value.trim()
                            }))}
                        />
                    </div>
                </div>
                {/* Address Phone */}
                <div className="grid p-1 grid-cols-8 gap-6 md:gap-2 xl:gap-6 lg:gap-6 mb-2">
                    <label className="block text-gray-800 col-span-2 sm:col-span-2 font-medium text-sm">
                        Phone Number
                    </label>
                    <div className="col-span-8 sm:col-span-6">
                        <input
                            className="block w-full h-12 border px-3 py-1 text-sm focus:outline-none leading-5 rounded-md bg-gray-100 focus:bg-white focus:border-gray-200 border-gray-200 p-2"
                            type="text"
                            placeholder="Enter Phone Number..."
                            value={props?.newAddress?.phoneNumber}
                            onChange={(e) => props?.setNewAddress((prev: IAddNewAddress) => ({
                                ...prev,
                                phoneNumber: e.target.value.trim()
                            }))}
                        />
                    </div>
                </div>
                {/* Address Note */}
                <div className="grid p-1 grid-cols-8 gap-6 md:gap-2 xl:gap-6 lg:gap-6 mb-2">
                    <label className="block text-gray-800 col-span-2 sm:col-span-2 font-medium text-sm">
                        Address Note (Optional)
                    </label>
                    <div className="col-span-8 sm:col-span-6">
                        <input
                            className="block w-full h-12 border px-3 py-1 text-sm focus:outline-none leading-5 rounded-md bg-gray-100 focus:bg-white focus:border-gray-200 border-gray-200 p-2"
                            type="text"
                            placeholder="Enter Note..."
                            value={props?.newAddress?.note}
                            onChange={(e) => props?.setNewAddress((prev: IAddNewAddress) => ({
                                ...prev,
                                note: e.target.value.trim()
                            }))}
                        />
                    </div>
                </div>
                <div className="grid p-1 grid-cols-8 gap-6 md:gap-2 xl:gap-6 lg:gap-6 mb-2">
                    <label className="block text-gray-800 col-span-2 sm:col-span-2 font-medium text-sm">
                        Address Default
                    </label>
                    <div className="col-span-8 sm:col-span-6">
                        <Switch color="green" crossOrigin="true" defaultChecked={props?.newAddress?.default} onChange={(e) => {
                            if (e.target.checked) {
                                props?.setNewAddress((prev: IAddNewAddress) => ({
                                    ...prev,
                                    default: true
                                }))
                            }
                            else {
                                props?.setNewAddress((prev: IAddNewAddress) => ({
                                    ...prev,
                                    default: false
                                }))
                            }
                        }} />
                    </div>
                </div>
                {props?.newAddress?.id && <div className="grid p-1 grid-cols-8 gap-6 md:gap-2 xl:gap-6 lg:gap-6 mb-2">
                    <label className="block text-gray-800 col-span-2 sm:col-span-2 font-medium text-sm">
                        Address Detail
                    </label>
                    <div className="col-span-8 sm:col-span-6">
                        <input
                            disabled
                            className="cursor-not-allowed block w-full h-12 border px-3 py-1 text-sm focus:outline-none leading-5 rounded-md bg-gray-100 focus:bg-white focus:border-gray-200 border-gray-200 p-2"
                            type="text"
                            value={props?.newAddress?.detail + (props?.newAddress?.ward ? (", " + props?.newAddress?.ward) : "") + (props?.newAddress?.district ? (", " + props?.newAddress?.district) : "") + (props?.newAddress?.province ? (", " + props?.newAddress?.province) : "")}
                        />
                    </div>
                </div>}
                <AddMapInAddress newAddress={props?.newAddress} setNewAddress={props?.setNewAddress} />
            </div>
        </div>
    )
}

export default AddNewAddress