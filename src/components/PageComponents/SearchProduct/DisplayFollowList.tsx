import { configRouter } from "@/configs/router"
import { formatVND } from "@/utils/hepler"
import { Rating } from "@material-tailwind/react"
import { useNavigate } from "react-router-dom"

function DisplayFollowList() {
    const nav = useNavigate()

    const handleRedirectProductDetail = () => {
        nav(configRouter.productDetail)
    }

    return (
        <div className="flex flex-col">
            {Array.from({ length: 15 }).map((_, index) => (
                <div key={index} className="flex my-5">
                    <img src="https://product.hstatic.net/1000075078/product/1697441914_phin-gato_304446dce9ec4fe0a5527536b93f6eda.png"
                        alt="image product"
                        className="w-60 h-w-60 object-contain rounded-lg shadow-lg"
                    />
                    <div className="flex flex-col space-y-2 justify-start p-2.5">
                        <h5 className="text-base font-medium break-all cursor-pointer" onClick={handleRedirectProductDetail}>
                            Trà Xanh Latte (Nóng)
                        </h5>
                        <p className="text-sm text-gray-600">Đá Xay Frosty Phin-Gato là lựa chọn không thể bỏ lỡ cho tín đồ cà phê. Cà phê nguyên chất pha phin truyền thống, thơm đậm đà, đắng mượt mà, quyện cùng kem sữa béo ngậy và đá xay mát lạnh. Nhân đôi vị cà phê nhờ có thêm thạch cà phê đậm đà, giòn dai. Thức uống khơi ngay sự tỉnh táo tức thì. Lưu ý: Khuấy đều phần đá xay trước khi dùng
                        </p>
                        <p className="flex items-center text-base">1,1K Sold| <Rating value={5} ratedColor="amber" placeholder="" readonly /></p>
                    </div>
                    <p className="text-sm text-gray-600">{formatVND(45000)}</p>
                </div>
            ))}
        </div>
    )
}

export default DisplayFollowList