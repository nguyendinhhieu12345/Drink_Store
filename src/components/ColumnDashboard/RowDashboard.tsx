import { ReactNode, SVGProps } from "react";

interface IRowDashboard {
    icon: SVGProps<SVGSVGElement>;
    title: string;
    total: number;
    bgColor: string;
    textColor: string;
}
export const RowDashboard = (props: IRowDashboard) => {
    return (
        <div className="min-w-0 rounded-lg overflow-hidden bg-white flex h-full">
            <div className="p-4 flex items-center border border-gray-200 w-full rounded-lg">
                <div
                    className={`flex items-center justify-center p-3 rounded-full h-12 w-12 text-center mr-4 text-lg text-${props.textColor} bg-${props.bgColor}`}
                >
                    {props.icon as ReactNode}
                </div>
                <div>
                    <h6 className="text-sm mb-1 font-medium text-gray-600 ">
                        <span>{props.title}</span>{" "}
                    </h6>
                    <p className="text-2xl font-bold leading-none text-gray-600 ">
                        {props.total}
                    </p>
                </div>
            </div>
        </div>
    );
};
