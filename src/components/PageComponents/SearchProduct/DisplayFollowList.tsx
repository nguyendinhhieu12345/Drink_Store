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

    const handleRedirectProductDetail = () => {
        nav(configRouter.productDetail)
    }

    return (
        <div className="flex flex-col">
            {props?.products?.success && props?.products?.data?.productList.length > 0 && props?.products?.data?.productList?.map((product, index) => (
                <div key={index} className="flex my-5">
                    <img src={product?.thumbnailUrl}
                        alt="image product"
                        className="w-auto h-auto max-w-64 max-h-64 object-contain rounded-lg shadow-lg"
                    />
                    <div className="flex flex-col space-y-2 justify-start p-2.5">
                        <h5 className="text-base font-medium break-all cursor-pointer" onClick={handleRedirectProductDetail}>
                            {product?.name}
                        </h5>
                        <p className="text-sm text-gray-600">{product?.description}</p>
                        <p className="flex items-center text-base">{product?.ratingSummary?.quantity} reviews| <Rating value={product?.ratingSummary?.star} ratedColor="amber" placeholder="" readonly /></p>
                    </div>
                    <p className="text-sm text-gray-600">{formatVND(product?.price ? product?.price : 0)}</p>
                </div>
            ))}
        </div>
    )
}

export default DisplayFollowList