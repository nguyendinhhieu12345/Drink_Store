import { BaseResponseApi, User } from "@/type";
// import { CaretLeft, CaretRight } from "@phosphor-icons/react";
import { useEffect, useState } from "react";
import * as userApi from "@/api/PageApi/userApi"
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { formatVND } from "@/utils/hepler";

interface IOrdersResponse extends BaseResponseApi {
    data: {
        id: string,
        total: number,
        productQuantity: number,
        orderType: string,
        productName: string,
        statusLastEvent: string,
        timeLastEvent: number
    }[]
}

function MyOrderOfUser() {
    const [orders, setOrders] = useState<IOrdersResponse>()
    const useCurrentUser = useSelector<RootState, User>(
        (state) => state.authSlice.currentUser as User
    );

    const handleGetOrder = async (statusOrder: string) => {
        const data = await userApi?.getAllOrderByUserId(useCurrentUser?.data?.userId, 1, statusOrder)
        if (data?.success) {
            setOrders(data)
        }
    }

    useEffect(() => {
        handleGetOrder("WAITING")
    }, [])

    return (
        <div className="bg-white h-auto w-3/4 border border-gray-50 shadow-base rounded-md p-3">
            <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold mb-5">My Orders</h2>
                <select className="rounded-lg"
                    onChange={(e) => handleGetOrder(e.target.value)}
                >
                    <option value="WAITING">Waiting</option>
                    <option value="IN_PROCESS">Processing</option>
                    <option value="SUCCEED">Succeed</option>
                    <option value="CANCELED">Canceled</option>
                </select>
            </div>
            <div className="w-full my-5 overflow-hidden border border-gray-200 rounded-lg mb-8 rounded-b-lg">
                {/* table */}
                <div className="w-full overflow-x-auto">
                    <table className="w-full whitespace-nowrap">
                        <thead className="text-xs font-semibold tracking-wide text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-100">
                            <tr className="bg-gray-100">
                                <th scope="col" className="text-left text-xs font-semibold px-6 py-2 text-gray-700 uppercase tracking-wider">ID</th>
                                <th scope="col" className="text-center text-xs font-semibold px-6 py-2 text-gray-700 uppercase tracking-wider">OrderTime</th>
                                <th scope="col" className="text-center text-xs font-semibold px-6 py-2 text-gray-700 uppercase tracking-wider">Method</th>
                                <th scope="col" className="text-center text-xs font-semibold px-6 py-2 text-gray-700 uppercase tracking-wider">Status</th>
                                <th scope="col" className="text-center text-xs font-semibold px-6 py-2 text-gray-700 uppercase tracking-wider">Total</th>
                                <th scope="col" className="text-right text-xs font-semibold px-6 py-2 text-gray-700 uppercase tracking-wider">Action</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {orders?.data?.map((order, index) => (
                                <tr key={index}>
                                    <td className="px-5 py-3 leading-6 whitespace-nowrap"><span className="uppercase text-sm font-medium">{order?.id}</span></td>
                                    <td className="px-5 py-3 leading-6 text-center whitespace-nowrap"><span className="text-sm">{new Date(order?.timeLastEvent as number).toLocaleString().split(", ")[0]}</span></td>
                                    <td className="px-5 py-3 leading-6 text-center whitespace-nowrap"><span className="text-sm">{order?.orderType}</span></td>
                                    <td className="px-5 py-3 leading-6 text-center whitespace-nowrap font-medium text-sm"><span className="text-green-500">{order?.statusLastEvent}</span></td>
                                    <td className="px-5 py-3 leading-6 text-center whitespace-nowrap"><span className="text-sm font-bold">{formatVND(order?.total ?? 0)}</span></td>
                                    <td className="px-5 py-3 whitespace-nowrap text-right text-sm"><a className="px-3 py-1 bg-emerald-100 text-xs text-emerald-600 hover:bg-emerald-500 hover:text-white transition-all font-semibold rounded-full" href={`/order/${order?.id}`}>Details</a></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                {/* paging */}
                {/* <div className="px-4 py-3 border-t border-gray-200  bg-white text-gray-500 ">
                    <div className="flex flex-col justify-end text-xs sm:flex-row text-gray-600 ">
                        <div className="flex mt-2 sm:mt-auto sm:justify-end">
                            <nav aria-label="Product Page Navigation">
                                <ul className="inline-flex items-center">
                                    <li>
                                        <button
                                            className="inline-flex items-center justify-center leading-5 transition-colors duration-150 font-medium p-2 rounded-md text-gray-600 focus:outline-none border border-transparent hover:bg-gray-100"
                                            type="button"
                                            aria-label="Previous"
                                        >
                                            <CaretLeft size={12} />
                                        </button>
                                    </li>

                                    {Array.from({ length: 5 }).map(
                                        (_, i) => (
                                            <li
                                                key={i}
                                                className={`${i + 1 === 1
                                                    ? "bg-green-500 rounded-md"
                                                    : "hover:bg-gray-100 rounded-md"
                                                    }`}
                                            >
                                                <button
                                                    className={`${i + 1 === 1
                                                        ? "bg-green-500 hover:bg-green-500"
                                                        : ""
                                                        }inline-flex items-center justify-center cursor-pointer leading-5 transition-colors duration-150 font-medium focus:outline-none px-3 py-1 rounded-md text-xs text-gray-600 border border-transparent `}
                                                    type="button"
                                                >
                                                    {i + 1}
                                                </button>
                                            </li>
                                        )
                                    )}
                                    <li>
                                        <button
                                            className="inline-flex items-center justify-center cursor-pointer leading-5 transition-colors duration-150 font-medium p-2 rounded-md text-gray-600 focus:outline-none border border-transparent hover:bg-gray-100"
                                            type="button"
                                            aria-label="Next"
                                        >
                                            <CaretRight size={12} />
                                        </button>
                                    </li>
                                </ul>
                            </nav>
                        </div>
                    </div>
                </div> */}
            </div>
        </div>
    )
}

export default MyOrderOfUser