import { ColumnDashboard } from "@/components/ColumnDashboard/ColumnDashboard";
import { RowDashboard } from "@/components/ColumnDashboard/RowDashboard";
import { ArrowRight, Files } from "@phosphor-icons/react";
import { useEffect, useState } from "react";
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
    name: "05/01/2024",
    total: 4000,
  },
  {
    name: "06/01/2024",
    total: 3000,
  },
  {
    name: "07/01/2024",
    total: 2000,
  },
  {
    name: "08/01/2024",
    total: 2780,
  },
  {
    name: "09/01/2024",
    total: 1890,
  },
  {
    name: "10/01/2024",
    total: 2390,
  },
  {
    name: "11/01/2024",
    total: 3490,
  },
];

export default function DashboardAmin() {
  useEffect(() => {
    document.title = "Shopfee | dashboard admin";
  }, []);

  return (
    <div className="sm:container grid lg:px-6 sm:px-4 px-2 mx-auto overflow-auto">
      <h1 className="mb-4 mt-2 text-lg font-bold text-gray-700 ">
        Dashboard Overview
      </h1>
      <DashboardOverviewRevenue />
      <DashboardOverviewOrders />
      <RevenueChart />
    </div>
  );
}

const RevenueChart = () => {
  const [selectedDate, setSelectedDate] = useState<string>(
    new Date()
      .toLocaleString("en-US", {
        weekday: "long",
        timeZone: "Asia/Ho_Chi_Minh",
      })
      .toString()
  );
  return (
    <div className="w-full h-auto flex flex-col lg:flex-row justify-center items-center mt-4">
      <div className="my-4 mx-1 md:p-5 bg-white w-full lg:w-full rounded-lg">
        <div className="flex justify-between items-center">
          <div className="flex items-center justify-start">
            <p className="font-semibold text-[14px] text-[#685F78] uppercase">
              Revenue chart
            </p>
            {/* <select className="bg-gray-50 w-25 border border-gray-300 text-gray-900 text-sm rounded-lg p-2.5 ml-3">
              <option value="Day">Day</option>
              <option value="Month">Month</option>
              <option value="Year">Year</option>
            </select> */}
            <input
              className="bg-gray-50 w-25 border border-gray-300 text-gray-900 text-sm rounded-lg p-2.5 ml-3"
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
            />
            <ArrowRight className="p-2.5 ml-3" size={32} />
            <input
              className="bg-gray-50 w-25 border border-gray-300 text-gray-900 text-sm rounded-lg p-2.5 ml-3"
              type="date"
            />
          </div>
          <button className="flex items-center cursor-pointer group bg-white rounded-lg shadow-md px-2 py-1">
            <Files size={20} />
            <p className="text-[13px] hidden group-hover:block">Reports</p>
          </button>
        </div>
        <div className="w-full h-[350px] mt-5">
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
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Area
                type="monotone"
                dataKey="total"
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

const DashboardOverviewOrders = () => {
  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
      <RowDashboard
        icon={
          <svg
            stroke="currentColor"
            fill="none"
            strokeWidth="2"
            viewBox="0 0 24 24"
            strokeLinecap="round"
            strokeLinejoin="round"
            height="1em"
            width="1em"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="9" cy="21" r="1"></circle>
            <circle cx="20" cy="21" r="1"></circle>
            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
          </svg>
        }
        title="Total Order"
        total={669}
        bgColor="orange-100"
        textColor="orange-600"
      />
      <RowDashboard
        icon={
          <svg
            stroke="currentColor"
            fill="none"
            strokeWidth="2"
            viewBox="0 0 24 24"
            strokeLinecap="round"
            strokeLinejoin="round"
            height="1em"
            width="1em"
            xmlns="http://www.w3.org/2000/svg"
          >
            <polyline points="23 4 23 10 17 10"></polyline>
            <polyline points="1 20 1 14 7 14"></polyline>
            <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"></path>
          </svg>
        }
        title="Orders Pending"
        total={232}
        bgColor="blue-100"
        textColor="blue-600"
      />
      <RowDashboard
        icon={
          <svg
            stroke="currentColor"
            fill="none"
            strokeWidth="2"
            viewBox="0 0 24 24"
            strokeLinecap="round"
            strokeLinejoin="round"
            height="1em"
            width="1em"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect x="1" y="3" width="15" height="13"></rect>
            <polygon points="16 8 20 8 23 11 23 16 16 16 16 8"></polygon>
            <circle cx="5.5" cy="18.5" r="2.5"></circle>
            <circle cx="18.5" cy="18.5" r="2.5"></circle>
          </svg>
        }
        title="Orders Processing"
        total={232}
        bgColor="teal-100"
        textColor="teal-600"
      />
      <RowDashboard
        icon={
          <svg
            stroke="currentColor"
            fill="none"
            strokeWidth="2"
            viewBox="0 0 24 24"
            strokeLinecap="round"
            strokeLinejoin="round"
            height="1em"
            width="1em"
            xmlns="http://www.w3.org/2000/svg"
          >
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
        }
        title="Orders Delivered"
        total={232}
        bgColor="green-100"
        textColor="green-600"
      />
    </div>
  );
};

const DashboardOverviewRevenue = () => {
  return (
    <div className="flex items-center justify-between mb-8 flex-wrap">
      <ColumnDashboard
        icon={
          <svg
            stroke="currentColor"
            fill="currentColor"
            strokeWidth="0"
            version="1.1"
            viewBox="0 0 16 16"
            height="1em"
            width="1em"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M16 5l-8-4-8 4 8 4 8-4zM8 2.328l5.345 2.672-5.345 2.672-5.345-2.672 5.345-2.672zM14.398 7.199l1.602 0.801-8 4-8-4 1.602-0.801 6.398 3.199zM14.398 10.199l1.602 0.801-8 4-8-4 1.602-0.801 6.398 3.199z"></path>
          </svg>
        }
        title="Today Orders"
        price={0.0}
        bgColor="teal-600"
      />
      <ColumnDashboard
        icon={
          <svg
            stroke="currentColor"
            fill="none"
            strokeWidth="2"
            viewBox="0 0 24 24"
            strokeLinecap="round"
            strokeLinejoin="round"
            height="1em"
            width="1em"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="9" cy="21" r="1"></circle>
            <circle cx="20" cy="21" r="1"></circle>
            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
          </svg>
        }
        title="This Month"
        price={917}
        bgColor="blue-500"
      />
      <ColumnDashboard
        icon={
          <svg
            stroke="currentColor"
            fill="currentColor"
            strokeWidth="0"
            version="1.1"
            viewBox="0 0 16 16"
            height="1em"
            width="1em"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M14.5 2h-13c-0.825 0-1.5 0.675-1.5 1.5v9c0 0.825 0.675 1.5 1.5 1.5h13c0.825 0 1.5-0.675 1.5-1.5v-9c0-0.825-0.675-1.5-1.5-1.5zM1.5 3h13c0.271 0 0.5 0.229 0.5 0.5v1.5h-14v-1.5c0-0.271 0.229-0.5 0.5-0.5zM14.5 13h-13c-0.271 0-0.5-0.229-0.5-0.5v-4.5h14v4.5c0 0.271-0.229 0.5-0.5 0.5zM2 10h1v2h-1zM4 10h1v2h-1zM6 10h1v2h-1z"></path>
          </svg>
        }
        title="All-Time Sales"
        price={12006}
        bgColor="cyan-600"
      />
    </div>
  );
};
