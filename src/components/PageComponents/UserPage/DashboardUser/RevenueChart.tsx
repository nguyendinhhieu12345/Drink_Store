import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from "recharts";
import { getOneWeekAgo, getToday } from "@/utils/hepler";
import { useEffect, useState } from "react";
import * as dashboardApi from "@/api/PageApi/userApi"
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { User } from "@/type";
import { ArrowRight } from "@phosphor-icons/react";

interface IRevenueChart {
    success: boolean,
    message: string,
    data: {
        totalSpent: number,
        statistics: {
            time: string;
            amount: number
        }[]
    }
}

const RevenueChart = () => {
    const [dataGet, setDataGet] = useState<{
        start_date: string;
        end_date: string;
    }>({
        start_date: getOneWeekAgo(),
        end_date: getToday(),
    })
    const useCurrentUser = useSelector<RootState, User>(
        (state) => state.authSlice.currentUser as User
    );

    const [chartRevenue, setChartRevenue] = useState<IRevenueChart>()

    const getOverviewRevenue = async () => {
        const data = await dashboardApi.getSpentStatistic(useCurrentUser?.data?.userId, dataGet?.start_date, dataGet?.end_date)
        if (data?.success) {
            setChartRevenue(data)
        }
    }

    const formatCurrency = (value: number) => {
        return value.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
    };

    const formatDate = (dateString: string) => {
        const [year, month, day] = dateString.split('-');
        return `${day}-${month}-${year}`;
    };

    useEffect(() => {
        getOverviewRevenue()
    }, [])

    return (
        <div className="w-full h-auto flex flex-col lg:flex-row justify-center items-center">
            <div className="mx-1 bg-white w-full lg:w-full rounded-lg">
                <div className="flex items-center w-full justify-between">
                    <p className="font-semibold text-[14px] text-[#685F78] uppercase">
                    </p>
                    <div className="flex items-center justify-center">
                        <p className="font-medium text-base">
                            Select time
                        </p>
                        <input
                            className="bg-gray-50 w-auto border border-gray-300 text-gray-900 text-sm rounded-lg p-2 ml-2"
                            type="date"
                            value={dataGet?.start_date}
                            onChange={(e) => {
                                setDataGet((prev: {
                                    start_date: string;
                                    end_date: string;
                                }) => ({
                                    ...prev,
                                    start_date: e.target.value
                                }))
                            }}
                        />
                        <ArrowRight className="px-2 mx-1" size={32} />
                        <input
                            className="bg-gray-50 w-auto border border-gray-300 text-gray-900 text-sm rounded-lg p-2"
                            type="date"
                            value={dataGet?.end_date}
                            onChange={(e) => {
                                setDataGet((prev: {
                                    start_date: string;
                                    end_date: string;
                                }) => ({
                                    ...prev,
                                    end_date: e.target.value
                                }))
                            }}
                        />
                        <button onClick={getOverviewRevenue} className="p-2 text-base mx-2 bg-blue-500 text-white rounded-lg">Appy</button>
                    </div>
                </div>
                <div className="flex items-center justify-center w-full h-[350px]">
                    <div className="w-[90%] h-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart
                                data={chartRevenue?.data?.statistics}
                                margin={{
                                    top: 5,
                                    right: 30,
                                    left: 30,
                                    bottom: 5,
                                }}
                            >
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="time" tickFormatter={formatDate} />
                                <YAxis tickFormatter={formatCurrency} />
                                <Tooltip formatter={(value: number) => formatCurrency(value)} labelFormatter={(label: string) => formatDate(label)} />
                                <Area
                                    type="monotone"
                                    dataKey="amount"
                                    stroke="#8884d8"
                                    fill="#8884d8"
                                />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RevenueChart;