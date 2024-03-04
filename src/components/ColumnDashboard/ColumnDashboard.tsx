import { formatVND } from "@/utils/const";
import { ReactNode, SVGProps } from "react";

interface IColumnDashboard {
  icon: SVGProps<SVGSVGElement>;
  title: string;
  price: number;
  bgColor: string;
}
export const ColumnDashboard = (props: IColumnDashboard) => {
  return (
    <div className="min-w-0 w-[30%] rounded-lg overflow-hidden bg-white  flex justify-center text-center h-full">
      <div
        className={`border border-gray-200  w-full p-6 rounded-lg text-white  bg-${props.bgColor}`}
      >
        <div
          className={`text-center inline-block text-3xl text-white  bg-${props.bgColor}`}
        >
          {props.icon as ReactNode}
        </div>
        <div>
          <p className="mb-3 text-base font-medium text-gray-50 ">
            {props.title}
          </p>
          <p className="text-2xl font-bold leading-none text-gray-50 ">
            {formatVND(props.price as number)}
          </p>
        </div>
      </div>
    </div>
  );
};
