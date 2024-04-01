import { configRouter } from "@/configs/router"
import { useNavigate } from "react-router-dom"

function DisplayFollowGrid() {
    const nav = useNavigate()

    const handleRedirectProductDetail = () => {
        nav(configRouter.productDetail)
    }

    return (
        <div className="grid grid-cols-4 gap-4">
            {Array.from({ length: 15 }).map((_, index) => (
                <div key={index} className="m-1">
                    <img src="https://product.hstatic.net/1000075078/product/1697441914_phin-gato_304446dce9ec4fe0a5527536b93f6eda.png"
                        alt="image product"
                        className="w-60 h-w-60 object-contain rounded-lg shadow-lg"
                    />
                    <div className="flex flex-col space-y-2 justify-start p-2.5">
                        <h5 className="text-base font-medium break-all cursor-pointer" onClick={handleRedirectProductDetail}>
                            Trà Xanh Latte (Nóng)
                        </h5>
                        <p className="text-sm font-light text-gray-600">45.000đ</p>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default DisplayFollowGrid