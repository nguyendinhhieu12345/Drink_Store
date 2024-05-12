import { Edit } from "@/components/SVG/Edit.svg"
import { IOrderDetail } from "@/pages/CustomerPage/OrderDetail"
import { formatVND } from "@/utils/hepler"

interface IOrderPayment {
    orderDetail: IOrderDetail | undefined
}

function OrderPayment(props: IOrderPayment) {
    const orderDetail = props.orderDetail

    return (
        <div className="border rounded-xl border-gray-100 p-8 py-6 bg-gray-50 ">
            <div className="flex lg:flex-row md:flex-row flex-col justify-between">
                <div className="mb-3 md:mb-0 lg:mb-0  flex flex-col sm:flex-wrap">
                    <span className="mb-1 font-bold font-serif text-sm uppercase text-gray-600  block">
                        PAYMENT METHOD
                    </span>
                    <span className="text-sm text-gray-500  font-semibold font-serif block">
                        {orderDetail?.data?.transaction?.paymentType}
                        <span className="text-yellow-300 px-2.5 py-1 border border-yellow-300 rounded-xl">{orderDetail?.data?.transaction?.status}</span>
                        {(orderDetail?.data?.transaction?.status === "UNPAID" && orderDetail?.data?.transaction?.paymentUrl) &&
                            <button className="ml-2" onClick={() => {
                                localStorage.setItem("orderId", orderDetail?.data?.id)
                                window.location.href = (orderDetail?.data?.transaction?.paymentUrl as string)
                            }}><Edit /></button>
                        }
                    </span>
                </div>
                <div className="mb-3 md:mb-0 lg:mb-0  flex flex-col sm:flex-wrap">
                    <span className="mb-1 font-bold font-serif text-sm uppercase text-gray-600  block">
                        SHIPPING COST
                    </span>
                    <span className="text-sm text-gray-500  font-semibold font-serif block">
                        {formatVND(
                            orderDetail?.data?.shippingFee ?? 0
                        )}
                    </span>
                </div>
                <div className="mb-3 md:mb-0 lg:mb-0  flex flex-col sm:flex-wrap">
                    <span className="mb-1 font-bold font-serif text-sm uppercase text-gray-600  block">
                        TOAL ITEM PRICE
                    </span>
                    <span className="text-sm text-gray-500  font-semibold font-serif block">
                        {formatVND(
                            orderDetail?.data?.totalItemPrice ?? 0
                        )}
                    </span>
                </div>
                <div className="flex flex-col sm:flex-wrap">
                    <span className="mb-1 font-bold font-serif text-sm uppercase text-gray-600  block">
                        TOTAL AMOUNT
                    </span>
                    <span className="text-xl font-serif font-bold text-red-500  block">
                        {formatVND(
                            orderDetail?.data?.totalPayment ?? 0
                        )}
                    </span>
                </div>
            </div>
        </div>
    )
}

export default OrderPayment