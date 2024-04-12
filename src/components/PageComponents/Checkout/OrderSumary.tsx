import { Edit } from "@/components/SVG/Edit.svg"
import { configRouter } from "@/configs/router"
import { formatVND } from "@/utils/hepler"
import { CaretLeft, Timer } from "@phosphor-icons/react"
import { useNavigate } from "react-router-dom"

function OrderSumary() {
    const nav = useNavigate()

    const handleAddProduct = () => {
        nav(configRouter.searchProduct)
    }

    const handleRedirectProductDetail = () => {
        nav(configRouter.productDetail)
    }

    const handleRedirectThanksPage = () => {
        nav(configRouter.thanks)
    }

    return (
        <div className="w-1/2 ml-10 border shadow-base rounded-lg p-3">
            <p className="font-semibold text-lg mb-2">Order Sumary</p>
            <div>
                {Array.from({ length: 2 }).map((_, index) => (
                    <div key={index} className="flex items-center justify-between my-2">
                        <div className="flex items-center">
                            <Edit onClick={handleAddProduct} className="w-5 h-5 mr-3 cursor-pointer" />
                            <div>
                                <button onClick={handleRedirectProductDetail} className="font-semibold text-base">2 x Coffe Cabuchino</button>
                                <p className="text-sm">Size: Small</p>
                                <p className="text-sm text-default italic">Note: Not sugar</p>
                            </div>
                        </div>
                        <div className="font-semibold text-default">
                            {formatVND(60000)}
                        </div>
                    </div>
                ))}
            </div>
            <button onClick={handleAddProduct} className="text-default flex text-sm pb-2 border-b w-full">
                <CaretLeft size={18} /> <span>Add more product</span>
            </button>
            <div className="my-2 border-b pb-2">
                <p className="font-semibold text-base mb-2">Time Order</p>
                <p className="flex items-center text-default">As soon as posible: <Timer weight="fill" size={20} /> <span>Now - 10 Minutes</span></p>
                <input placeholder="Additional note for shop..." className="w-2/3 px-4 py-2 my-2 text-sm text-gray-900 border border-gray-300 rounded-md bg-gray-50 focus:ring-blue-500 focus:border-blue-500 active:ring-blue-500 active:border-blue-500" />
            </div>
            <div className="my-2">
                <p className="font-semibold text-base mb-2">Payment sumary</p>
                <div className="flex items-center justify-between mb-2 text-default">
                    <p className="text-black">Item price</p>
                    <p>{formatVND(60000)}</p>
                </div>
                <div className="flex items-center justify-between mb-2 text-default">
                    <p className="text-black">Shipping Fee</p>
                    <p>{formatVND(25000)}</p>
                </div>
                <div className="flex items-center justify-between mb-2">
                    <p className="text-black">Applied Coin</p>
                    <p className="text-yellow-300">-{formatVND(300)}</p>
                </div>
                <div className="flex items-center justify-between mb-2">
                    <p className="text-black">Discount</p>
                    <p className="text-yellow-300">-{formatVND(25000)}</p>
                </div>
                <div className="flex items-center justify-between mb-2 text-default">
                    <p className="text-black font-semibold">Total</p>
                    <p className="font-semibold">{formatVND(59700)}</p>
                </div>
            </div>
            <button onClick={handleRedirectThanksPage} className="w-full py-4 px-2 text-center bg-btnActive rounded-lg text-white">
                Order({formatVND(59700)})
            </button>
        </div>
    )
}

export default OrderSumary