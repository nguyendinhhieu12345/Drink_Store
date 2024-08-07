import { BaseResponseApi, User } from "@/type";
import { useEffect, useState } from "react";
import * as userApi from "@/api/PageApi/userApi"
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { formatVND } from "@/utils/hepler";
import { useNavigate } from "react-router-dom";
import { configRouter } from "@/configs/router";
import { toast } from "react-toastify";
import TablePaging from "@/components/PageComponents/SearchProduct/Paging";
import { useTranslation } from "react-i18next";

export interface IHistoryCoinResponse extends BaseResponseApi {
    data: {
        totalPage: number;
        coinHistoryList: {
            description: string;
            coin: number;
            createdAt: string
        }[]
    }
}

function HistoryCoin() {
    const [historyCoin, setHistoryCoin] = useState<IHistoryCoinResponse>()
    const nav = useNavigate()
    const [pageActive, setPageActive] = useState<number>(1);
    const { t } = useTranslation()

    const useCurrentUser = useSelector<RootState, User>(
        (state) => state.authSlice.currentUser as User
    );

    const handleGetOrder = async () => {
        const data = await userApi?.getHistoryCoinByUserId(useCurrentUser?.data?.userId, pageActive, 10)
        if (data?.success) {
            setHistoryCoin(data)
        }
    }

    useEffect(() => {
        if (!useCurrentUser?.success && !useCurrentUser?.data?.userId || !useCurrentUser) {
            nav(configRouter.login)
            toast.warning("Please login to continue using website services!")
        }
        handleGetOrder()
    }, [pageActive])

    return (
        <div className="bg-white h-auto w-full mt-5 sm:mt-0 sm:w-3/4 border border-gray-50 shadow-base rounded-md p-3">
            <h2 className="text-xl font-semibold mb-5">{t("History Coins")}</h2>
            <div className="w-full my-5 overflow-hidden border border-gray-200 rounded-lg mb-8 rounded-b-lg">
                <div className="w-full overflow-x-auto">
                    <table className="w-full whitespace-nowrap">
                        <thead className="text-xs font-semibold tracking-wide text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-100">
                            <tr className="bg-gray-100">
                                <th scope="col" className="text-left text-xs font-semibold px-6 py-2 text-gray-700 uppercase tracking-wider">{t("DESCRIPTION")}</th>
                                <th scope="col" className="text-center text-xs font-semibold px-6 py-2 text-gray-700 uppercase tracking-wider">{t("TIME RECEIVE")}</th>
                                <th scope="col" className="text-center text-xs font-semibold px-6 py-2 text-gray-700 uppercase tracking-wider">{t("COIN")}</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {historyCoin?.data?.coinHistoryList?.map((coin, index) => (
                                <tr key={index}>
                                    <td className="px-5 py-3 leading-6 whitespace-nowrap"><span className="uppercase text-sm font-medium">{coin?.description}</span></td>
                                    <td className="px-5 py-3 leading-6 text-center whitespace-nowrap"><span className="text-sm">{new Date(coin?.createdAt).toLocaleString().split(", ")[0]}</span></td>
                                    <td className="px-5 py-3 leading-6 text-center whitespace-nowrap"><span className="text-sm font-bold">{formatVND(coin?.coin ? coin?.coin : 0)}</span></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                {historyCoin?.success && historyCoin?.data?.totalPage >= 2 && (
                    <TablePaging
                        data={historyCoin}
                        setPageActive={setPageActive}
                        pageActive={pageActive}
                    />
                )}
            </div>
        </div>
    )
}

export default HistoryCoin