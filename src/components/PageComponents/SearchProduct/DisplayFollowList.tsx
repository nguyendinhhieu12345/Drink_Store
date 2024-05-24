import { configRouter } from "@/configs/router"
import { ISearchProduct } from "@/pages/CustomerPage/SearchProduct"
import { formatVND } from "@/utils/hepler"
import { Rating } from "@material-tailwind/react"
import { useNavigate } from "react-router-dom"

interface IDisplayFollowList {
    products: ISearchProduct | undefined
}

function DisplayFollowList(props: IDisplayFollowList) {
    const nav = useNavigate()

    const handleRedirectProductDetail = (productId: string) => {
        nav(configRouter.productDetail.slice(0, -3) + productId)
    }

    return (
        <div className="flex flex-col w-full">
            {props?.products?.success && props?.products?.data?.productList.length > 0 && props?.products?.data?.productList?.map((product, index) => (
                <div key={index} className="flex my-5">
                    <div className="flex items-start w-[80%] md:w-[95%]">
                        <img src={product?.thumbnailUrl}
                            alt="image product"
                            className="w-auto h-auto max-w-28 max-h-28 sm:max-w-52 sm:max-h-52 object-contain rounded-lg shadow-lg"
                        />
                        <div className="flex flex-col space-y-2 justify-start px-5 break-all">
                            <h5 className="text-lg font-bold break-all cursor-pointer" onClick={() => handleRedirectProductDetail(product?.id)}>
                                {product?.name}
                            </h5>
                            <p className="text-sm text-gray-600">{product?.description}</p>
                            <p className="hidden sm:flex sm:items-center sm:text-base">{product?.ratingSummary?.quantity} reviews| <Rating value={product?.ratingSummary?.star} ratedColor="amber" placeholder="" readonly /></p>
                        </div>
                    </div>
                    <p className="text-sm font-semibold text-gray-800 w-[20%] md:w-[5%]">{formatVND(product?.price ? product?.price : 0)}</p>
                </div>
            ))}
        </div>
    )
}

export default DisplayFollowList