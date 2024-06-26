import { configRouter } from "@/configs/router"
import { ISearchProduct } from "@/pages/CustomerPage/SearchProduct"
import { formatVND } from "@/utils/hepler"
import { Rating } from "@material-tailwind/react"
import { useNavigate } from "react-router-dom"

interface IDisplayFollowGrid {
    products: ISearchProduct | undefined
}

function DisplayFollowGrid(props: IDisplayFollowGrid) {
    const nav = useNavigate()

    const handleRedirectProductDetail = (productId: string) => {
        nav(configRouter.productDetail.slice(0, -3) + productId)
    }

    return (
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 sm:gap-3 lg:grid-cols-4 lg:gap-4">
            {props?.products?.success && props?.products?.data?.productList?.length > 0 && props?.products?.data?.productList?.map((product, index) => (
                <div key={index} className="bg-white m-2 shadow-base p-3 rounded-lg overflow-hidden" onClick={() => handleRedirectProductDetail(product?.id)}>
                    <img src={product.thumbnailUrl} alt={product.name} className="w-full h-48 object-contain" />
                    <div className="p-4">
                        <button className="text-base mb-2 font-semibold hover:text-brown-700 hover:font-medium">{product.name}</button>
                        <div className="flex items-center justify-between">
                            <div className="flex flex-col">
                                <span className="text-gray-800 font-bold">{formatVND(product.price)}</span>
                                <p className="hidden sm:flex sm:items-center sm:text-base">{product?.ratingSummary?.quantity} reviews| <Rating value={product?.ratingSummary?.star} ratedColor="amber" placeholder="" readonly /></p>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default DisplayFollowGrid