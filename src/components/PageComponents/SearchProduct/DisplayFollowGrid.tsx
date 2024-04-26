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
        <div className="grid grid-cols-4 gap-4">
            {props?.products?.success && props?.products?.data?.productList?.length > 0 && props?.products?.data?.productList?.map((product, index) => (
                <div key={index} className="m-1">
                    <img src={product?.thumbnailUrl}
                        alt="image product"
                        className="w-auto h-auto max-w-64 max-h-64 object-contain rounded-lg shadow-lg"
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