import { BaseResponseApi, User } from "@/type";
// import { CaretLeft, CaretRight } from "@phosphor-icons/react";
import { useEffect, useState } from "react";
import * as userApi from "@/api/PageApi/userApi"
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { formatVND } from "@/utils/hepler";
import { useLocation, useNavigate } from "react-router-dom";
import { configRouter } from "@/configs/router";
import { toast } from "react-toastify";
import TablePaging from "@/components/PageComponents/SearchProduct/Paging";
import socket from "@/socket/socket";
import { useTranslation } from "react-i18next";

export interface IOrdersResponse extends BaseResponseApi {
    data: {
        totalPage: number
        orderList: {
            id: string,
            total: number,
            productQuantity: number,
            orderType: string,
            productName: string,
            statusLastEvent: string,
            timeLastEvent: number
        }[]
    }
}

function MyOrderOfUser() {
    const [orders, setOrders] = useState<IOrdersResponse>()
    const [pageActive, setPageActive] = useState<number>(1);
    const [statusOrder, setStatusOrder] = useState<string>("WAITING")
    const nav = useNavigate()
    const location = useLocation()
    const { t } = useTranslation()

    const useCurrentUser = useSelector<RootState, User>(
        (state) => state.authSlice.currentUser as User
    );

    const handleGetOrder = async () => {
        const data = await userApi?.getAllOrderByUserId(useCurrentUser?.data?.userId, pageActive, statusOrder)
        if (data?.success) {
            setOrders(data)
        }
    }

    useEffect(() => {
        if (!useCurrentUser?.success && !useCurrentUser?.data?.userId || !useCurrentUser) {
            nav(configRouter.login)
            toast.warning("Please login to continue using website services!")
        }
        else {
            socket.on('connect', () => {
                console.log('Connected to socket server');
                socket.emit('joinUser', useCurrentUser?.data?.userId); // Join the user-specific room
            });

            socket.on('employee_update_order', (data) => {
                console.log('Order update received:', data);
                if (location.pathname === configRouter.myOrder) {
                    handleGetOrder()
                }
                // Handle the order update here
            });
            handleGetOrder()
        }
    }, [pageActive, statusOrder, useCurrentUser?.data?.userId])

    return (
        <div className="bg-white h-auto w-full mt-5 sm:mt-0 sm:w-3/4 border border-gray-50 shadow-base rounded-md p-3">
            <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold mb-5">{t("My Orders")}</h2>
                <select className="rounded-lg"
                    onChange={(e) => {
                        setStatusOrder(e.target.value)

                    }}
                >
                    <option value="WAITING">{t("Waiting")}</option>
                    <option value="IN_PROCESS">{t("Processing")}</option>
                    <option value="SUCCEED">{t("Succeed")}</option>
                    <option value="CANCELED">{t("Canceled")}</option>
                    <option value="NOT_RECEIVED">{t("Not Received")}</option>
                </select>
            </div>
            <div className="w-full my-5 overflow-hidden border border-gray-200 rounded-lg mb-8 rounded-b-lg">
                {/* table */}
                <div className="w-full overflow-x-auto">
                    <table className="w-full whitespace-nowrap">
                        <thead className="text-xs font-semibold tracking-wide text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-100">
                            <tr className="bg-gray-100">
                                <th scope="col" className="text-left text-xs font-semibold px-6 py-2 text-gray-700 uppercase tracking-wider">ID</th>
                                <th scope="col" className="text-center text-xs font-semibold px-6 py-2 text-gray-700 uppercase tracking-wider">{t("ORDERTIME")}</th>
                                <th scope="col" className="text-center text-xs font-semibold px-6 py-2 text-gray-700 uppercase tracking-wider">{t("METHOD")}</th>
                                <th scope="col" className="text-center text-xs font-semibold px-6 py-2 text-gray-700 uppercase tracking-wider">{t("STATUS")}</th>
                                <th scope="col" className="text-center text-xs font-semibold px-6 py-2 text-gray-700 uppercase tracking-wider">{t("TOTAL")}</th>
                                <th scope="col" className="text-right text-xs font-semibold px-6 py-2 text-gray-700 uppercase tracking-wider">{t("ACTION")}</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {orders?.data?.orderList?.map((order, index) => (
                                <tr key={index}>
                                    <td className="px-5 py-3 leading-6 whitespace-nowrap"><span className="uppercase text-sm font-medium">{order?.id}</span></td>
                                    <td className="px-5 py-3 leading-6 text-center whitespace-nowrap"><span className="text-sm">{new Date(order?.timeLastEvent as number).toLocaleString().split(", ")[0]}</span></td>
                                    <td className="px-5 py-3 leading-6 text-center whitespace-nowrap"><span className="text-sm">{order?.orderType}</span></td>
                                    <td className="px-5 py-3 leading-6 text-center whitespace-nowrap font-medium text-sm"><span className="text-green-500">{order?.statusLastEvent}</span></td>
                                    <td className="px-5 py-3 leading-6 text-center whitespace-nowrap"><span className="text-sm font-bold">{formatVND(order?.total ?? 0)}</span></td>
                                    <td className="px-5 py-3 whitespace-nowrap text-right text-sm"><a className="px-3 py-1 bg-emerald-100 text-xs text-emerald-600 hover:bg-emerald-50 transition-all font-semibold rounded-full" href={`/order/${order?.id}`}>{t("Details")}</a></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                {/* paging */}
                {orders?.success && orders?.data?.totalPage >= 2 && (
                    <TablePaging
                        data={orders}
                        setPageActive={setPageActive}
                        pageActive={pageActive}
                    />
                )}
            </div>
        </div>
    )
}

export default MyOrderOfUser