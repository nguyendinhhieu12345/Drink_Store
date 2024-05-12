import { Edit } from "@/components/SVG/Edit.svg"
import { IOrderDetail, IOrderItemReview, OrderStatusData } from "@/pages/CustomerPage/OrderDetail"
import { formatVND } from "@/utils/hepler"

interface IOrderStatusLine {
    orderDetail: IOrderDetail | undefined,
    statusOrderLine: OrderStatusData | undefined,
    orderItemReview: IOrderItemReview | undefined,
    handleOpenReview: (itemId: string) => void
}

function OrderProductDetail(props: IOrderStatusLine) {
    const { orderDetail, statusOrderLine, orderItemReview, handleOpenReview } = props

    return (
        <div>
            <div className="w-full overflow-hidden border border-gray-200  rounded-lg my-4">
                <div className="w-full overflow-x-auto">
                    <table className="w-full whitespace-nowrap">
                        <thead className="text-xs font-semibold tracking-wide text-left text-gray-500 uppercase border-b border-gray-200  bg-gray-100 ">
                            <tr>
                                <td className="px-4 py-2 text-center">SR.</td>
                                <td className="px-4 py-2 text-center">Product Title</td>
                                <td className="px-4 py-2 text-center">DETAIL</td>
                                {statusOrderLine?.data[0]?.orderStatus === "SUCCEED" && <td className="px-4 py-2 text-center">Review</td>}
                            </tr>
                        </thead>
                        <tbody className="text-gray-800  bg-white  divide-y divide-gray-100 text-serif text-sm my-2">
                            {orderDetail?.data?.itemList?.map((item, index) => (
                                <tr className="my-2" key={index}>
                                    <td className="whitespace-nowrap font-normal text-gray-500 text-center my-2">
                                        {index + 1}
                                    </td>
                                    <td className="whitespace-nowrap font-normal text-gray-500 text-center my-2">
                                        <span className="text-gray-700 font-semibold  text-xs text-center my-2">
                                            {item?.name}
                                        </span>
                                    </td>
                                    <td className="whitespace-nowrap font-bold text-center my-2">
                                        <ul>
                                            {item?.itemDetailList?.map((size, index) => (
                                                <li key={index}>
                                                    {size?.size && <>Size: {size?.size} -</>} Quantity: {size?.quantity} -
                                                    price: {formatVND(size?.price)}{" "}
                                                    <br></br>
                                                    {size?.toppingList?.length > 0 && <>
                                                        Topping list: {
                                                            size?.toppingList?.map((topping, index) => (
                                                                <span key={index}>
                                                                    {topping?.name} -{" "}
                                                                    {formatVND(
                                                                        topping?.price ?? 0
                                                                    )}
                                                                </span>
                                                            ))}</>
                                                    }
                                                </li>
                                            ))}
                                        </ul>
                                    </td>
                                    {
                                        statusOrderLine?.data[0]?.orderStatus === "SUCCEED" &&
                                        <td className="whitespace-nowrap font-normal text-gray-500 text-center my-2">
                                            <button onClick={() => handleOpenReview(orderItemReview?.data?.filter((product) => product?.name === item?.name)[0]?.id ?? "")}><Edit /></button>
                                        </td>
                                    }
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default OrderProductDetail