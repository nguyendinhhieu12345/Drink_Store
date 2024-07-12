import { PieChart, Pie, ResponsiveContainer, Cell } from 'recharts';
import { useEffect, useState } from "react";
import * as dashboardApi from "@/api/PageApi/userApi"
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { User } from "@/type";
import { formatVND } from '@/utils/hepler';

interface IOrderChart {
    success: boolean,
    message: string,
    data: {
        total: number,
        statistics: {
            key: string;
            value: number
        }[]
    }
}

const OrderChart = () => {
    const [dataGet, setDataGet] = useState<string>("PAYMENT_TYPE")
    const useCurrentUser = useSelector<RootState, User>(
        (state) => state.authSlice.currentUser as User
    );

    const [chartRevenue, setChartRevenue] = useState<IOrderChart>()

    const getOverviewRevenue = async () => {
        const data = await dashboardApi.getOrderStatistic(useCurrentUser?.data?.userId, dataGet)
        if (data?.success) {
            setChartRevenue(data)
        }
    }

    useEffect(() => {
        getOverviewRevenue()
    }, [dataGet])

    return (
        <div className="w-full h-auto flex flex-col lg:flex-row justify-center items-center">
            <div className="mx-1 bg-white w-full lg:w-full rounded-lg">
                <div className="flex items-center w-full justify-between">
                    <p className="font-semibold text-[14px] text-[#685F78] uppercase">
                    </p>
                    <div className="flex items-center justify-center">
                        <p className="font-medium text-base mr-2">
                            Select type:
                        </p>
                        <select className="bg-gray-50 w-auto border border-gray-300 text-gray-900 text-sm rounded-lg p-2"
                            onChange={(e) => {
                                setDataGet(e.target.value)
                            }}>
                            <option value="PAYMENT_TYPE">PAYMENT_TYPE</option>
                            <option value="ORDER_STATUS">ORDER_STATUS</option>
                        </select>
                    </div>
                </div>
                <div className="flex items-center justify-center w-full h-[350px]">
                    <div className="w-[90%] h-full">
                        <ResponsiveContainer width="100%" height={300}>
                            <PieChart>
                                <Pie
                                    data={chartRevenue?.data?.statistics}
                                    dataKey="value"
                                    nameKey="key"
                                    cx="50%"
                                    cy="50%"
                                    outerRadius={100}
                                    fill="#8884d8"
                                    labelLine={false}
                                    label={({
                                        cx,
                                        cy,
                                        midAngle,
                                        innerRadius,
                                        outerRadius,
                                        value,
                                        index,
                                    }) => {
                                        const RADIAN = Math.PI / 180;
                                        const radius = 25 + innerRadius + (outerRadius - innerRadius);
                                        const x = cx + radius * Math.cos(-midAngle * RADIAN);
                                        const y = cy + radius * Math.sin(-midAngle * RADIAN);
                                        return (
                                            <text
                                                x={x}
                                                y={y}
                                                fill="#8884d8"
                                                textAnchor={x > cx ? 'start' : 'end'}
                                                dominantBaseline="central"
                                            >
                                                {chartRevenue?.data?.statistics[index]?.key} ({dataGet === "PAYMENT_TYPE" ? formatVND(value) : value})
                                            </text>
                                        );
                                    }}
                                >
                                    {chartRevenue?.data?.statistics?.map((_, index) => (
                                        <Cell key={`cell-${index}`} fill={`#${index * 123456}`} />
                                    ))}
                                </Pie>
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OrderChart;