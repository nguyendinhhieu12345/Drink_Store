import { RowDashboard } from "@/components/ColumnDashboard/RowDashboard";
import { ArrowsCounterClockwise, Check, ShoppingCartSimple, Truck } from "@phosphor-icons/react";

function DashboardOverviewOrders() {
    return (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            <RowDashboard
                icon={
                    <ShoppingCartSimple size={32} />
                }
                title="Total Order"
                total={10}
                bgColor="green-100"
                textColor="orange-600"
            />
            <RowDashboard
                icon={
                    <ArrowsCounterClockwise size={32} />
                }
                title="Orders Pending"
                total={20}
                bgColor="green-100"
                textColor="blue-600"
            />
            <RowDashboard
                icon={
                    <Truck size={32} />
                }
                title="Orders Processing"
                total={30}
                bgColor="green-100"
                textColor="teal-600"
            />
            <RowDashboard
                icon={
                    <Check size={20} />
                }
                title="Orders Delivered"
                total={40}
                bgColor="green-100"
                textColor="green-600"
            />
        </div>
    )
}

export default DashboardOverviewOrders