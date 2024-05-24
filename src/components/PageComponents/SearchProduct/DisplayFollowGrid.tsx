import { configRouter } from "@/configs/router"
import { ISearchProduct } from "@/pages/CustomerPage/SearchProduct"
import { formatVND } from "@/utils/hepler"
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
                <div key={index} className="m-1">
                    <img src={product?.thumbnailUrl}
                        alt="image product"
                        className="w-[260px] h-[175px] object-contain rounded-lg shadow-lg"
                    />
                    <div className="flex flex-col space-y-2 justify-start p-2.5">
                        <h5 className="text-base font-medium break-all cursor-pointer" onClick={() => handleRedirectProductDetail(product?.id)}>
                            {product?.name}
                        </h5>
                        <p className="text-sm font-light text-gray-600">{formatVND(product?.price ? product?.price : 0)}</p>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default DisplayFollowGrid