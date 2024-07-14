import { Delete } from "@/components/SVG/Delete.svg"
import { Edit } from "@/components/SVG/Edit.svg"
import * as userApi from "@/api/PageApi/userApi"
import { useEffect } from "react"
import { AxiosError } from "axios"
import { toast } from "react-toastify"
import { IShowAddressResponse } from "@/pages/CustomerPage/UserPage/DefaultAddress"
import { toastError } from "@/utils/hepler"



interface IShowAddress {
    getAllAddresUser: () => Promise<void>,
    addresss: IShowAddressResponse | undefined,
    setAddresss: React.Dispatch<React.SetStateAction<IShowAddressResponse | undefined>>,
    setAddressEdit: React.Dispatch<React.SetStateAction<string>>,
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
}

function ShowAddress(props: IShowAddress) {

    useEffect(() => {
        props?.getAllAddresUser()
    }, [])

    const handleDeleteAddress = async (addressId: string) => {
        try {
            const data = await userApi?.deleteAddress(addressId)
            if (data?.success) {
                toast.success(data?.message)
                props?.getAllAddresUser()
            }
        }
        catch (e: unknown) {
            if (e instanceof AxiosError && e.response) {
                toastError(e,"top-right")
            }
        }
    }

    const handleEditProduct = (productId: string) => {
        props?.setOpen(prev => !prev)
        props?.setAddressEdit(productId)
    }

    return (
        <div className="w-full my-5 overflow-hidden border border-gray-200 rounded-lg mb-8 rounded-b-lg">
            {/* table */}
            <div className="w-full overflow-x-auto">
                <table className="w-full whitespace-nowrap">
                    <thead className="text-xs font-semibold tracking-wide text-left text-gray-500 uppercase border-b border-gray-200 ">
                        <tr className="">
                            <th scope="col" className="text-left text-xs font-semibold px-6 py-2 text-gray-700 uppercase tracking-wider">Address</th>
                            <th scope="col" className="text-right text-xs font-semibold px-6 py-2 text-gray-700 uppercase tracking-wider">Action</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {props?.addresss?.data?.map((add, index) => (
                            <tr key={index}>
                                <td className="px-5 py-3 leading-6 whitespace-nowrap">
                                    <div className="flex flex-col items-start justify-between">
                                        <p className="flex flex-row items-center">
                                            <span className="border-r pr-1">
                                                {add?.recipientName}
                                            </span>
                                            <span className="ml-1 opacity-75">
                                                {add?.phoneNumber}
                                            </span>
                                        </p>
                                        <p className="w-[80%] break-all">{add?.detail}</p>
                                        {add?.default && <p className="text-brown-600 px-2 py-1 border border-brown-300 rounded-2xl">Default</p>}
                                    </div>
                                </td>
                                <td className="px-5 py-3 whitespace-nowrap text-right text-sm"><div className="flex justify-end text-right">
                                    <button
                                        onClick={() => handleEditProduct(add?.id)}
                                        className="p-2 cursor-pointer text-gray-400 hover:text-emerald-600 focus:outline-none"
                                    >
                                        <p data-tip="true" data-for="edit" className="text-xl">
                                            <Edit />
                                        </p>
                                    </button>
                                    <button
                                        onClick={() => handleDeleteAddress(add?.id)}
                                        className="p-2 cursor-pointer text-gray-400 hover:text-red-600 focus:outline-none"
                                    >
                                        <p
                                            data-tip="true"
                                            data-for="delete"
                                            className="text-xl"
                                        >
                                            <Delete />
                                        </p>
                                    </button>
                                </div></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default ShowAddress