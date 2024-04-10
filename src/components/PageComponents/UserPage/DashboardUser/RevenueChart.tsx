import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from "recharts";

const data = [
    {
        timePoint: "05/01/2024",
        revenue: 4000,
    },
    {
        timePoint: "06/01/2024",
        revenue: 3000,
    },
    {
        timePoint: "07/01/2024",
        revenue: 2000,
    },
    {
        timePoint: "08/01/2024",
        revenue: 2780,
    },
    {
        timePoint: "09/01/2024",
        revenue: 1890,
    },
    {
        timePoint: "10/01/2024",
        revenue: 2390,
    },
    {
        timePoint: "11/01/2024",
        revenue: 3490,
    },
];

const RevenueChart = () => {

    return (
        <div className="w-full h-auto flex flex-col lg:flex-row justify-center items-center">
            <div className="mx-1 bg-white w-full lg:w-full rounded-lg">
                <div className="w-full h-[350px]">
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart
                            data={data}
                            margin={{
                                top: 10,
                                right: 30,
                                left: 0,
                                bottom: 0,
                            }}
                        >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="timePoint" />
                            <YAxis label={{ value: 'VND', angle: -90, position: 'insideLeft' }} />
                            <Tooltip />
                            <Area
                                type="monotone"
                                dataKey="revenue"
                                stroke="#8884d8"
                                fill="#8884d8"
                            />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
};

export default RevenueChart;